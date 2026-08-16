from rest_framework import serializers
from .models import Filament, Order, StudioSetting


class FilamentSerializer(serializers.ModelSerializer):
    cost_per_gram = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)
    stock_percentage = serializers.IntegerField(read_only=True)
    stock_status = serializers.CharField(read_only=True)

    class Meta:
        model = Filament
        fields = [
            'id', 'brand', 'type', 'color_name', 'color_hex',
            'spool_price', 'full_weight', 'current_stock',
            'location', 'nozzle_temp', 'cost_per_gram',
            'stock_percentage', 'stock_status', 'created_at', 'updated_at'
        ]


class OrderSerializer(serializers.ModelSerializer):
    net_profit = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)
    filament_details = FilamentSerializer(source='filament', read_only=True)

    class Meta:
        model = Order
        fields = [
            'id', 'invoice_number', 'customer_name', 'customer_phone', 'customer_email',
            'model_name', 'model_size', 'filament', 'filament_details',
            'filament_name_snapshot', 'filament_type_snapshot', 'filament_color_hex_snapshot', 'filament_brand_snapshot',
            'weight', 'price_per_gram', 'extra_fee',
            'total_price', 'company_share', 'salary_share', 'material_cost', 'net_profit',
            'status', 'created_at', 'updated_at'
        ]
        read_only_fields = ['invoice_number', 'total_price', 'company_share', 'salary_share', 'material_cost', 'net_profit']


class StudioSettingSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudioSetting
        fields = [
            'id', 'company_rate_per_gram', 'studio_name', 'studio_tagline',
            'studio_phone', 'studio_email', 'studio_bkash', 'studio_address',
            'price_presets', 'updated_at'
        ]
