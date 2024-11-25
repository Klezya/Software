from django.shortcuts import render, get_object_or_404
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Servicio, Cliente, Reserva, Personal
from .serializers import ServicioSerializer, ClienteSerializer, ReservaSerializer, PersonalSerializer

class ServicioViewSet(viewsets.ModelViewSet):
    queryset = Servicio.objects.all()
    serializer_class = ServicioSerializer

class ClienteViewSet(viewsets.ModelViewSet):
    queryset = Cliente.objects.all()
    serializer_class = ClienteSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        cliente = serializer.save()  # Guardar el objeto y asignarlo a una variable
        headers = self.get_success_headers(serializer.data)
        return Response({'id': cliente.idcliente}, status=status.HTTP_201_CREATED, headers=headers)

class ReservaViewSet(viewsets.ModelViewSet):
    queryset = Reserva.objects.all()
    serializer_class = ReservaSerializer

class PersonalViewSet(viewsets.ModelViewSet):
    queryset = Personal.objects.all()
    serializer_class = PersonalSerializer

@api_view(['GET'])
def buscar_cliente_por_rut(request, rut):
    cliente = get_object_or_404(Cliente, rut=rut)
    serializer = ClienteSerializer(cliente)
    return Response(serializer.data, status=status.HTTP_200_OK)
