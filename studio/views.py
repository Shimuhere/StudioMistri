from rest_framework import viewsets, status, views
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.contrib.auth import authenticate, login, logout
from django.db.models import Sum, F, DecimalField
from django.db.models.functions import Coalesce
from decimal import Decimal
from django.utils import timezone

from .models import Filament, Order, StudioSetting
from .serializers import FilamentSerializer, OrderSerializer, StudioSettingSerializer


class FilamentViewSet(viewsets.ModelViewSet):
    """
    CRUD API for Filament Spools & Quick Stock Stepper
    """
    queryset = Filament.objects.all()
    serializer_class = FilamentSerializer
    permission_classes = [AllowAny]

    @action(detail=True, methods=['post'])
    def adjust_stock(self, request, pk=None):
        """
        Quick stock adjustment endpoint (e.g. +50g, -50g, +500g)
        Payload: {"delta_grams": 50}
        """
        filament = self.get_object()
        delta = request.data.get('delta_grams', 0)
        try:
            delta_int = int(delta)
            filament.current_stock = max(0, filament.current_stock + delta_int)
            filament.save(update_fields=['current_stock', 'updated_at'])
            return Response({
                'status': 'success',
                'current_stock': filament.current_stock,
                'message': f"Updated stock for {filament.color_name}: {filament.current_stock}g"
            })
        except (ValueError, TypeError):
            return Response({'error': 'Invalid delta_grams value'}, status=status.HTTP_400_BAD_REQUEST)


class OrderViewSet(viewsets.ModelViewSet):
    """
    CRUD API for 3D Print Orders, Real-time 3 Tk/g Financial Split & Invoices
    """
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        # Deduct filament stock automatically upon order creation if filament provided
        response = super().create(request, *args, **kwargs)
        if response.status_code == status.HTTP_201_CREATED:
            order_id = response.data.get('id')
            try:
                order_obj = Order.objects.get(id=order_id)
                if order_obj.filament and order_obj.weight:
                    order_obj.filament.deduct_stock(order_obj.weight)
            except Order.DoesNotExist:
                pass
        return response

    @action(detail=True, methods=['post'])
    def update_status(self, request, pk=None):
        """
        Fast status toggle action
        Payload: {"status": "Paid"}
        """
        order = self.get_object()
        new_status = request.data.get('status')
        if new_status in dict(Order.STATUS_CHOICES):
            order.status = new_status
            order.save(update_fields=['status', 'updated_at'])
            return Response({'status': 'success', 'order_status': order.status})
        return Response({'error': 'Invalid status choice'}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['get'])
    def invoice(self, request, pk=None):
        """
        Returns full structured invoice details ready for Swiss / Neobrutalism PDF rendering
        """
        order = self.get_object()
        settings = StudioSetting.get_settings()
        
        invoice_data = {
            'invoice_number': order.invoice_number,
            'date': order.created_at.strftime('%d %b %Y'),
            'status': order.status,
            'studio': {
                'name': settings.studio_name,
                'tagline': settings.studio_tagline,
                'phone': settings.studio_phone,
                'email': settings.studio_email,
                'bkash': settings.studio_bkash,
                'address': settings.studio_address,
            },
            'customer': {
                'name': order.customer_name,
                'phone': order.customer_phone,
                'email': order.customer_email or 'N/A',
            },
            'fabrication': {
                'project_name': order.model_name,
                'dimensions': order.model_size or 'Standard 3D Volume',
                'material': f"{order.filament_type_snapshot or 'PLA+'} ({order.filament_name_snapshot or 'Studio Default'})",
                'weight_grams': float(order.weight),
                'rate_per_gram': float(order.price_per_gram),
                'base_subtotal': float(order.weight * order.price_per_gram),
                'extra_fee': float(order.extra_fee),
                'total_payable': float(order.total_price),
            },
            'split_accounting': {
                'company_share_3tk_per_gram': float(order.company_share),
                'salary_share': float(order.salary_share),
                'raw_material_cost': float(order.material_cost),
                'net_profit': float(order.net_profit),
            }
        }
        return Response(invoice_data)


class SalesReportsView(views.APIView):
    """
    Sales, Financials & Analytics Reports API
    Computes total revenue, raw material expenses, net profit, and 3 Tk/g Company Fund allocation
    """
    permission_classes = [AllowAny]

    def get(self, request):
        orders = Order.objects.all()

        total_revenue = orders.aggregate(val=Coalesce(Sum('total_price'), Decimal('0.00'), output_field=DecimalField()))['val']
        total_material_cost = orders.aggregate(val=Coalesce(Sum('material_cost'), Decimal('0.00'), output_field=DecimalField()))['val']
        total_company_pool = orders.aggregate(val=Coalesce(Sum('company_share'), Decimal('0.00'), output_field=DecimalField()))['val']
        total_salary_pool = orders.aggregate(val=Coalesce(Sum('salary_share'), Decimal('0.00'), output_field=DecimalField()))['val']
        total_grams = orders.aggregate(val=Coalesce(Sum('weight'), Decimal('0.00'), output_field=DecimalField()))['val']

        total_net_profit = total_revenue - total_material_cost
        margin_percent = round((total_net_profit / total_revenue * 100), 1) if total_revenue > 0 else 0.0

        completed_orders = orders.filter(status__in=['Paid', 'Delivered']).count()
        total_orders_count = orders.count()

        # Material consumption breakdown
        materials = orders.values('filament_type_snapshot').annotate(
            total_weight=Coalesce(Sum('weight'), Decimal('0.00'), output_field=DecimalField()),
            total_revenue=Coalesce(Sum('total_price'), Decimal('0.00'), output_field=DecimalField())
        ).order_by('-total_weight')

        return Response({
            'total_revenue': float(total_revenue),
            'total_material_cost': float(total_material_cost),
            'total_net_profit': float(total_net_profit),
            'margin_percentage': margin_percent,
            'total_company_pool_3tk_g': float(total_company_pool),
            'total_salary_pool': float(total_salary_pool),
            'total_grams_printed': float(total_grams),
            'total_orders_count': total_orders_count,
            'completed_orders_count': completed_orders,
            'materials_breakdown': list(materials),
        })


class StudioSettingView(views.APIView):
    """
    Studio Global Configuration API
    """
    permission_classes = [AllowAny]

    def get(self, request):
        settings = StudioSetting.get_settings()
        serializer = StudioSettingSerializer(settings)
        return Response(serializer.data)

    def post(self, request):
        settings = StudioSetting.get_settings()
        serializer = StudioSettingSerializer(settings, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AuthLoginView(views.APIView):
    """
    Admin Login & Authentication API
    Authenticates Django staff / admin users and initializes session
    """
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        if not username or not password:
            return Response({'error': 'Username and password are required.'}, status=status.HTTP_400_BAD_REQUEST)

        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return Response({
                'status': 'success',
                'message': f"Welcome back, {user.username}!",
                'user': {
                    'id': user.id,
                    'username': user.username,
                    'email': user.email,
                    'is_staff': user.is_staff,
                    'is_superuser': user.is_superuser
                }
            })
        return Response({'error': 'Invalid admin credentials.'}, status=status.HTTP_401_UNAUTHORIZED)


class AuthUserView(views.APIView):
    """
    Returns current authenticated admin profile
    """
    permission_classes = [AllowAny]

    def get(self, request):
        if request.user.is_authenticated:
            return Response({
                'is_authenticated': True,
                'user': {
                    'id': request.user.id,
                    'username': request.user.username,
                    'email': request.user.email,
                    'is_staff': request.user.is_staff,
                    'is_superuser': request.user.is_superuser
                }
            })
        return Response({'is_authenticated': False, 'user': None})


class AuthLogoutView(views.APIView):
    """
    Logs out the admin session
    """
    permission_classes = [AllowAny]

    def post(self, request):
        logout(request)
        return Response({'status': 'success', 'message': 'Logged out successfully.'})
