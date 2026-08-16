from django.db import models
from decimal import Decimal
from django.utils import timezone


class Filament(models.Model):
    """
    Filament Spool Inventory Model
    Tracks available 3D printing filaments, weights, colors, brands & costs
    """
    brand = models.CharField(max_length=100, default='Bambu Lab')
    type = models.CharField(max_length=50, default='PLA+', help_text="e.g. PLA+, PETG, ABS, TPU 95A, PLA-CF, Resin")
    color_name = models.CharField(max_length=100)
    color_hex = models.CharField(max_length=10, default='#ff5500')
    spool_price = models.DecimalField(max_digits=10, decimal_places=2, default=Decimal('2400.00'), help_text="Total spool purchase price in BDT (৳)")
    full_weight = models.IntegerField(default=1000, help_text="Full spool weight in grams")
    current_stock = models.IntegerField(default=1000, help_text="Remaining grams in stock")
    location = models.CharField(max_length=100, blank=True, null=True, help_text="e.g. AMS Slot 1, Rack A-01")
    nozzle_temp = models.CharField(max_length=50, default='210°C - 230°C', blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Filament Spool'
        verbose_name_plural = 'Filament Spools'

    def __str__(self):
        return f"{self.color_name} ({self.brand} {self.type}) - {self.current_stock}g left"

    @property
    def cost_per_gram(self):
        """Calculates material purchase cost per gram in BDT"""
        if self.full_weight and self.full_weight > 0:
            return round(self.spool_price / Decimal(self.full_weight), 2)
        return Decimal('2.40')

    @property
    def stock_percentage(self):
        """Percentage of remaining stock"""
        if self.full_weight and self.full_weight > 0:
            return min(100, max(0, round((self.current_stock / self.full_weight) * 100)))
        return 0

    @property
    def stock_status(self):
        """Stock health status"""
        if self.current_stock <= 0:
            return 'out_of_stock'
        elif self.current_stock <= 250:
            return 'low_stock'
        return 'in_stock'

    def deduct_stock(self, grams):
        """Deducts grams from this spool's inventory"""
        grams_int = int(Decimal(str(grams)))
        self.current_stock = max(0, self.current_stock - grams_int)
        self.save(update_fields=['current_stock', 'updated_at'])


class Order(models.Model):
    """
    3D Print Order & Tax Invoice Model
    Enforces StudioMistri's rule:
    - 3 Tk per gram allocated to Company Account
    - Remainder allocated to Salary Account
    """
    STATUS_CHOICES = [
        ('Quotation', 'Quotation / Draft'),
        ('Slicing', 'Slicing & Gcode'),
        ('Printing', 'Printing in Progress 🖨️'),
        ('Post-Processing', 'Post-Processing'),
        ('Delivered', 'Delivered'),
        ('Paid', 'Paid & Closed ✅'),
    ]

    invoice_number = models.CharField(max_length=50, unique=True, blank=True)
    customer_name = models.CharField(max_length=200)
    customer_phone = models.CharField(max_length=50)
    customer_email = models.EmailField(blank=True, null=True)

    # 3D Model Parameters
    model_name = models.CharField(max_length=255)
    model_size = models.CharField(max_length=100, blank=True, default='120 x 85 x 150 mm')
    
    # Filament Relationship & Snapshot
    filament = models.ForeignKey(Filament, on_delete=models.SET_NULL, null=True, blank=True, related_name='orders')
    filament_name_snapshot = models.CharField(max_length=100, blank=True)
    filament_type_snapshot = models.CharField(max_length=50, blank=True)
    filament_color_hex_snapshot = models.CharField(max_length=10, blank=True, default='#ff5500')
    filament_brand_snapshot = models.CharField(max_length=100, blank=True)

    # Weight and Pricing
    weight = models.DecimalField(max_digits=10, decimal_places=2, help_text="Model net weight in grams")
    price_per_gram = models.DecimalField(max_digits=10, decimal_places=2, default=Decimal('7.00'), help_text="Selling rate per gram in BDT")
    extra_fee = models.DecimalField(max_digits=10, decimal_places=2, default=Decimal('0.00'), help_text="Post-processing, sanding, inserts, etc.")

    # Financial Breakdowns (Auto-calculated on save)
    total_price = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True, help_text="Total order amount payable in BDT")
    company_share = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True, help_text="3 Tk/g Company Fund allocation")
    salary_share = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True, help_text="Remainder to Maker Salary Account")
    material_cost = models.DecimalField(max_digits=10, decimal_places=2, default=Decimal('0.00'), help_text="Raw material spool cost in BDT")

    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default='Printing')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name = '3D Print Order'
        verbose_name_plural = '3D Print Orders'

    def __str__(self):
        return f"[{self.invoice_number}] {self.customer_name} - {self.model_name} ({self.weight}g)"

    @property
    def net_profit(self):
        """Total revenue minus raw filament material cost"""
        return (self.total_price or Decimal('0.00')) - (self.material_cost or Decimal('0.00'))

    def save(self, *args, **kwargs):
        # Auto-generate invoice number if missing
        if not self.invoice_number:
            year = timezone.now().year
            last_order = Order.objects.filter(invoice_number__startswith=f"SM-{year}-").order_by('-id').first()
            if last_order and last_order.invoice_number:
                try:
                    last_num = int(last_order.invoice_number.split('-')[-1])
                    new_num = last_num + 1
                except ValueError:
                    new_num = Order.objects.count() + 1
            else:
                new_num = Order.objects.count() + 1
            self.invoice_number = f"SM-{year}-{new_num:04d}"

        # Snapshot filament details
        if self.filament:
            self.filament_name_snapshot = self.filament.color_name
            self.filament_type_snapshot = self.filament.type
            self.filament_color_hex_snapshot = self.filament.color_hex
            self.filament_brand_snapshot = self.filament.brand
            
            # Compute material cost from filament spool purchase price
            if not self.material_cost or self.material_cost == Decimal('0.00'):
                self.material_cost = round(self.weight * self.filament.cost_per_gram, 2)

        # Retrieve company rate setting (Default: 3.00 Tk/g)
        try:
            settings_obj = StudioSetting.get_settings()
            co_rate = settings_obj.company_rate_per_gram
        except Exception:
            co_rate = Decimal('3.00')

        # Compute Financial Split
        base_price = self.weight * self.price_per_gram
        self.total_price = round(base_price + self.extra_fee, 2)
        self.company_share = round(self.weight * co_rate, 2)
        self.salary_share = max(Decimal('0.00'), round(self.total_price - self.company_share, 2))

        super().save(*args, **kwargs)


class StudioSetting(models.Model):
    """
    Studio Configuration & Accounting Rules Singleton
    """
    company_rate_per_gram = models.DecimalField(max_digits=5, decimal_places=2, default=Decimal('3.00'), help_text="Amount kept for Company Account per gram in BDT")
    studio_name = models.CharField(max_length=150, default='StudioMistri')
    studio_tagline = models.CharField(max_length=200, default='THINK • DESIGN • MAKE')
    studio_phone = models.CharField(max_length=50, default='+880 1700-000000')
    studio_email = models.EmailField(default='contact@studiomistri.com')
    studio_bkash = models.CharField(max_length=100, default='01700-000000 (bKash/Nagad)')
    studio_address = models.CharField(max_length=255, default='StudioMistri Fabrication Hub, Dhaka, Bangladesh')
    
    price_presets = models.JSONField(default=dict, blank=True, help_text="Default rate per gram by material type")
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Studio Setting'
        verbose_name_plural = 'Studio Settings'

    def __str__(self):
        return f"{self.studio_name} Settings (Company Rate: ৳{self.company_rate_per_gram}/g)"

    @classmethod
    def get_settings(cls):
        obj, created = cls.objects.get_or_create(id=1)
        if created or not obj.price_presets:
            obj.price_presets = {
                'PLA+': 7.00,
                'PLA': 7.00,
                'PETG': 8.50,
                'ABS': 9.00,
                'ASA': 9.50,
                'TPU 95A': 12.00,
                'PLA-CF': 15.00,
                'Silk PLA': 8.50,
                'Resin': 14.00
            }
            obj.save(update_fields=['price_presets'])
        return obj
