from django.contrib import admin
from django.utils.html import format_html
from .models import Filament, Order, StudioSetting

# Customize Django Admin Header & Titles
admin.site.site_header = "StudioMistri // 3D Studio OS Admin"
admin.site.site_title = "StudioMistri Admin Portal"
admin.site.index_title = "Fabrication Farm & Studio Management"


@admin.register(Filament)
class FilamentAdmin(admin.ModelAdmin):
    list_display = [
        'color_swatch_display', 'color_name', 'type', 'brand',
        'spool_price_bdt', 'cost_per_gram_bdt', 'stock_display',
        'stock_status_badge', 'location', 'nozzle_temp', 'updated_at'
    ]
    list_filter = ['type', 'brand', 'created_at']
    search_fields = ['color_name', 'brand', 'type', 'location']
    readonly_fields = ['created_at', 'updated_at', 'cost_per_gram_display', 'stock_percentage_display']

    fieldsets = (
        ('Filament Details', {
            'fields': ('brand', 'type', 'color_name', 'color_hex', 'nozzle_temp')
        }),
        ('Inventory & Stock', {
            'fields': ('current_stock', 'full_weight', 'location', 'stock_percentage_display')
        }),
        ('Pricing & Accounting', {
            'fields': ('spool_price', 'cost_per_gram_display')
        }),
        ('Metadata', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )

    def color_swatch_display(self, obj):
        return format_html(
            '<div style="width: 22px; height: 22px; background-color: {}; border: 2px solid #000; box-shadow: 1px 1px 0px #000; border-radius: 3px;"></div>',
            obj.color_hex
        )
    color_swatch_display.short_description = 'Swatch'

    def spool_price_bdt(self, obj):
        return f"৳ {obj.spool_price:,.2f}"
    spool_price_bdt.short_description = 'Spool Price'

    def cost_per_gram_bdt(self, obj):
        return f"৳ {obj.cost_per_gram:.2f}/g"
    cost_per_gram_bdt.short_description = 'Cost/g'

    def cost_per_gram_display(self, obj):
        return f"৳ {obj.cost_per_gram:.2f} per gram"
    cost_per_gram_display.short_description = 'Calculated Cost / Gram'

    def stock_display(self, obj):
        return f"{obj.current_stock:,}g / {obj.full_weight:,}g ({obj.stock_percentage}%)"
    stock_display.short_description = 'Stock Remaining'

    def stock_percentage_display(self, obj):
        return f"{obj.stock_percentage}%"
    stock_percentage_display.short_description = 'Stock Level %'

    def stock_status_badge(self, obj):
        status = obj.stock_status
        if status == 'in_stock':
            return format_html('<span style="background: #86efac; color: #000; padding: 2px 8px; border: 1.5px solid #000; border-radius: 3px; font-weight: bold; font-size: 11px;">IN STOCK</span>')
        elif status == 'low_stock':
            return format_html('<span style="background: #fde047; color: #000; padding: 2px 8px; border: 1.5px solid #000; border-radius: 3px; font-weight: bold; font-size: 11px;">LOW STOCK</span>')
        return format_html('<span style="background: #fca5a5; color: #000; padding: 2px 8px; border: 1.5px solid #000; border-radius: 3px; font-weight: bold; font-size: 11px;">EMPTY</span>')
    stock_status_badge.short_description = 'Status'


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = [
        'invoice_number', 'customer_name', 'model_name',
        'material_snapshot_display', 'weight_display', 'total_price_bdt',
        'company_share_badge', 'salary_share_bdt', 'status_badge', 'created_at'
    ]
    list_filter = ['status', 'filament_type_snapshot', 'created_at']
    search_fields = ['invoice_number', 'customer_name', 'customer_phone', 'model_name', 'customer_email']
    readonly_fields = ['invoice_number', 'total_price', 'company_share', 'salary_share', 'material_cost', 'created_at', 'updated_at']
    actions = ['mark_as_paid', 'mark_as_printing', 'mark_as_delivered']

    fieldsets = (
        ('Order Identification', {
            'fields': ('invoice_number', 'status', 'created_at')
        }),
        ('Customer Info', {
            'fields': ('customer_name', 'customer_phone', 'customer_email')
        }),
        ('3D Model & Filament Specs', {
            'fields': ('model_name', 'model_size', 'filament', 'weight', 'price_per_gram', 'extra_fee')
        }),
        ('Financial Allocation (3 Tk/g Company Rule)', {
            'fields': ('total_price', 'company_share', 'salary_share', 'material_cost')
        }),
    )

    def material_snapshot_display(self, obj):
        color = obj.filament_color_hex_snapshot or '#ff5500'
        return format_html(
            '<div style="display: flex; align-items: center; gap: 6px;">'
            '<div style="width: 14px; height: 14px; background-color: {}; border: 1.5px solid #000; border-radius: 2px;"></div>'
            '<span>{} ({})</span>'
            '</div>',
            color,
            obj.filament_name_snapshot or 'Default',
            obj.filament_type_snapshot or 'PLA+'
        )
    material_snapshot_display.short_description = 'Filament'

    def weight_display(self, obj):
        return f"{obj.weight}g"
    weight_display.short_description = 'Weight'

    def total_price_bdt(self, obj):
        return f"৳ {obj.total_price:,.2f}"
    total_price_bdt.short_description = 'Total Price'

    def company_share_badge(self, obj):
        return format_html(
            '<span style="background: #7dd3fc; color: #000; padding: 2px 6px; border: 1.5px solid #000; border-radius: 3px; font-weight: bold; font-size: 11px;">৳ {:,.2f}</span>',
            obj.company_share
        )
    company_share_badge.short_description = 'Company (3৳/g)'

    def salary_share_bdt(self, obj):
        return f"৳ {obj.salary_share:,.2f}"
    salary_share_bdt.short_description = 'Salary Share'

    def status_badge(self, obj):
        colors = {
            'Paid': '#86efac',
            'Delivered': '#7dd3fc',
            'Printing': '#ff7733',
            'Slicing': '#fde047',
            'Quotation': '#e2e8f0',
            'Post-Processing': '#f472b6'
        }
        bg = colors.get(obj.status, '#e2e8f0')
        return format_html(
            '<span style="background: {}; color: #000; padding: 2px 8px; border: 1.5px solid #000; border-radius: 3px; font-weight: bold; font-size: 11px;">{}</span>',
            bg,
            obj.status.upper()
        )
    status_badge.short_description = 'Status'

    @admin.action(description='Mark selected orders as Paid & Closed ✅')
    def mark_as_paid(self, request, queryset):
        queryset.update(status='Paid')

    @admin.action(description='Mark selected orders as Printing 🖨️')
    def mark_as_printing(self, request, queryset):
        queryset.update(status='Printing')

    @admin.action(description='Mark selected orders as Delivered 📦')
    def mark_as_delivered(self, request, queryset):
        queryset.update(status='Delivered')


@admin.register(StudioSetting)
class StudioSettingAdmin(admin.ModelAdmin):
    list_display = ['studio_name', 'company_rate_per_gram', 'studio_phone', 'studio_email', 'updated_at']
