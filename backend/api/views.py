from django.shortcuts import render
from rest_framework import viewsets
from .models import Servicio, Cliente, Reserva, Servicio_Reserva, Personal
from .serializers import ServicioSerializer, ClienteSerializer, ReservaSerializer, ServicioReservaSerializer, PersonalSerializer

class ServicioViewSet(viewsets.ModelViewSet):
    queryset = Servicio.objects.all()
    serializer_class = ServicioSerializer

class ClienteViewSet(viewsets.ModelViewSet):
    queryset = Cliente.objects.all()
    serializer_class = ClienteSerializer

class ReservaViewSet(viewsets.ModelViewSet):
    queryset = Reserva.objects.all()
    serializer_class = ReservaSerializer

class ServicioReservaViewSet(viewsets.ModelViewSet):
    queryset = Servicio_Reserva.objects.all()
    serializer_class = ServicioReservaSerializer

class PersonalViewSet(viewsets.ModelViewSet):
    queryset = Personal.objects.all()
    serializer_class = PersonalSerializer
