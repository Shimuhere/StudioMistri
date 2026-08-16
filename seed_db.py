import os
import django
from decimal import Decimal

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'studiomistri_backend.settings')
django.setup()

from django.contrib.auth.models import User
from studio.models import Filament, Order, StudioSetting

# 1. Create or Update Superuser (Admin Login)
admin_username = 'admin'
admin_password = 'adminpassword123'
admin_email = 'admin@studiomistri.com'

user, created = User.objects.get_or_create(username=admin_username, defaults={'email': admin_email})
user.set_password(admin_password)
user.is_staff = True
user.is_superuser = True
user.save()

print(f"[*] Admin Superuser Ready: Username='{admin_username}', Password='{admin_password}', Email='{admin_email}'")

# 2. Initialize Studio Settings
settings_obj = StudioSetting.get_settings()
print(f"[*] Studio Settings Initialized: Company Rate=৳{settings_obj.company_rate_per_gram}/g")

# 3. Seed Initial Filaments if empty
if Filament.objects.count() == 0:
    filaments_data = [
        {
            'brand': 'Bambu Lab',
            'type': 'PLA+',
            'color_name': 'Signal Orange',
            'color_hex': '#ff5500',
            'spool_price': Decimal('2400.00'),
            'full_weight': 1000,
            'current_stock': 820,
            'location': 'AMS Slot 1 (A-01)',
            'nozzle_temp': '210°C - 230°C'
        },
        {
            'brand': 'eSun',
            'type': 'PLA+',
            'color_name': 'Matte Black',
            'color_hex': '#1e2022',
            'spool_price': Decimal('2200.00'),
            'full_weight': 1000,
            'current_stock': 1450,
            'location': 'Rack A-02',
            'nozzle_temp': '205°C - 225°C'
        },
        {
            'brand': 'Polymaker',
            'type': 'PETG',
            'color_name': 'Teal Blue',
            'color_hex': '#00d2ff',
            'spool_price': Decimal('2600.00'),
            'full_weight': 1000,
            'current_stock': 650,
            'location': 'Drybox 1',
            'nozzle_temp': '230°C - 250°C'
        },
        {
            'brand': 'Bambu Lab',
            'type': 'PLA-CF',
            'color_name': 'Carbon Slate',
            'color_hex': '#334155',
            'spool_price': Decimal('3800.00'),
            'full_weight': 1000,
            'current_stock': 480,
            'location': 'Drybox 2 (Reinforced)',
            'nozzle_temp': '220°C - 240°C'
        },
        {
            'brand': 'Sunlu',
            'type': 'TPU 95A',
            'color_name': 'Neon Yellow',
            'color_hex': '#eab308',
            'spool_price': Decimal('2900.00'),
            'full_weight': 1000,
            'current_stock': 180,
            'location': 'Rack B-03',
            'nozzle_temp': '215°C - 235°C'
        },
        {
            'brand': 'eSun',
            'type': 'ABS',
            'color_name': 'Pure White',
            'color_hex': '#f8fafc',
            'spool_price': Decimal('2300.00'),
            'full_weight': 1000,
            'current_stock': 950,
            'location': 'Enclosure Rack 01',
            'nozzle_temp': '240°C - 260°C'
        },
        {
            'brand': 'Polymaker',
            'type': 'Silk PLA',
            'color_name': 'Imperial Gold',
            'color_hex': '#d97706',
            'spool_price': Decimal('2800.00'),
            'full_weight': 1000,
            'current_stock': 220,
            'location': 'Rack A-05',
            'nozzle_temp': '210°C - 225°C'
        }
    ]

    for f_data in filaments_data:
        Filament.objects.create(**f_data)
    print(f"[*] Seeded {len(filaments_data)} initial filament spools.")

# 4. Seed Initial Orders if empty
if Order.objects.count() == 0:
    fil1 = Filament.objects.filter(color_name='Signal Orange').first()
    fil2 = Filament.objects.filter(color_name='Carbon Slate').first()
    fil3 = Filament.objects.filter(color_name='Teal Blue').first()
    fil4 = Filament.objects.filter(color_name='Neon Yellow').first()
    fil5 = Filament.objects.filter(color_name='Matte Black').first()

    orders_data = [
        {
            'invoice_number': 'SM-2026-0042',
            'customer_name': 'Architect Tanvir Ahmed',
            'customer_phone': '+880 1711-234567',
            'customer_email': 'tanvir.arch@gmail.com',
            'model_name': 'Parametric Pavilion Facade 1:50',
            'model_size': '160 x 110 x 140 mm',
            'filament': fil1,
            'weight': Decimal('220.00'),
            'price_per_gram': Decimal('7.00'),
            'extra_fee': Decimal('150.00'),
            'status': 'Paid'
        },
        {
            'invoice_number': 'SM-2026-0043',
            'customer_name': 'Mechatronics Lab (BUET)',
            'customer_phone': '+880 1819-876543',
            'customer_email': 'robotics@buet.ac.bd',
            'model_name': 'Robotic Gripper Linkage Arms V3',
            'model_size': '180 x 95 x 65 mm',
            'filament': fil2,
            'weight': Decimal('185.00'),
            'price_per_gram': Decimal('15.00'),
            'extra_fee': Decimal('200.00'),
            'status': 'Paid'
        },
        {
            'invoice_number': 'SM-2026-0044',
            'customer_name': 'Nafis Designs',
            'customer_phone': '+880 1912-334455',
            'customer_email': 'nafis@designs.io',
            'model_name': 'Custom Ergonomic Mouse Shell',
            'model_size': '125 x 70 x 42 mm',
            'filament': fil3,
            'weight': Decimal('95.00'),
            'price_per_gram': Decimal('8.50'),
            'extra_fee': Decimal('0.00'),
            'status': 'Delivered'
        },
        {
            'invoice_number': 'SM-2026-0045',
            'customer_name': 'Dr. Kabir Shafi',
            'customer_phone': '+880 1715-998877',
            'customer_email': 'dr.kabir@healthbd.org',
            'model_name': 'Orthopedic Foot Insole Prototype',
            'model_size': '240 x 85 x 25 mm',
            'filament': fil4,
            'weight': Decimal('140.00'),
            'price_per_gram': Decimal('12.00'),
            'extra_fee': Decimal('100.00'),
            'status': 'Printing'
        },
        {
            'invoice_number': 'SM-2026-0046',
            'customer_name': 'Studio Vertigo Architecture',
            'customer_phone': '+880 1678-112233',
            'customer_email': 'info@vertigo.com.bd',
            'model_name': 'Geometric Lamp Shade V2',
            'model_size': '190 x 190 x 210 mm',
            'filament': fil5,
            'weight': Decimal('310.00'),
            'price_per_gram': Decimal('7.00'),
            'extra_fee': Decimal('0.00'),
            'status': 'Slicing'
        }
    ]

    for o_data in orders_data:
        Order.objects.create(**o_data)
    print(f"[*] Seeded {len(orders_data)} initial 3D print orders.")

print("[✓] StudioMistri Database Initialization Complete!")
