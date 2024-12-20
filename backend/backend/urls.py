"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from api.views import ServicioViewSet, ClienteViewSet, ReservaViewSet, PersonalViewSet, buscar_cliente_por_rut, reservas_por_cliente

router = DefaultRouter()
router.register(r'servicios', ServicioViewSet)
router.register(r'clientes', ClienteViewSet)
router.register(r'reservas', ReservaViewSet)
router.register(r'personal', PersonalViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/clientes/buscar/<str:rut>/', buscar_cliente_por_rut, name='buscar_cliente_por_rut'),
    path('api/reservas/cliente/<int:idcliente>/', reservas_por_cliente, name='reservas_por_cliente'),
]
