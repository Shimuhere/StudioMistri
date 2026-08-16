from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    FilamentViewSet,
    OrderViewSet,
    SalesReportsView,
    StudioSettingView,
    AuthLoginView,
    AuthUserView,
    AuthLogoutView
)

router = DefaultRouter()
router.register(r'filaments', FilamentViewSet, basename='filament')
router.register(r'orders', OrderViewSet, basename='order')

urlpatterns = [
    # REST Framework Router (CRUD for Filaments & Orders)
    path('', include(router.urls)),
    
    # Financial Analytics & Reports
    path('sales/reports/', SalesReportsView.as_view(), name='sales-reports'),
    
    # Studio Configuration
    path('settings/', StudioSettingView.as_view(), name='studio-settings'),
    
    # Authentication & Admin Session
    path('auth/login/', AuthLoginView.as_view(), name='auth-login'),
    path('auth/user/', AuthUserView.as_view(), name='auth-user'),
    path('auth/logout/', AuthLogoutView.as_view(), name='auth-logout'),
]
