from django.db import models

class Servicio(models.Model):
    idservicio = models.AutoField(primary_key=True)
    titulo = models.CharField(max_length=50)
    descripcion = models.CharField(max_length=500)
    precio = models.DecimalField(max_digits=16, decimal_places=2)
    ubicacion = models.CharField(max_length=50)
    tipo_servicio = models.CharField(max_length=10)
    menu = models.CharField(max_length=500)
    capacidad = models.IntegerField()
    infraestructura = models.CharField(max_length=500)
    img = models.CharField(max_length=500)
    especialidad = models.CharField(max_length=50)

class Cliente(models.Model):
    idcliente = models.AutoField(primary_key=True)
    rut = models.CharField(max_length=16)
    nombre = models.CharField(max_length=30)
    apellido = models.CharField(max_length=30)
    correo = models.CharField(max_length=60)

class Reserva(models.Model):
    idreserva = models.AutoField(primary_key=True)
    pago_total = models.DecimalField(max_digits=30, decimal_places=2)
    fecha = models.DateField()
    estado_pago = models.CharField(max_length=20)
    metodo_de_pago = models.CharField(max_length=20)
    idcliente = models.ForeignKey(Cliente, on_delete=models.CASCADE, db_column='idcliente')
    cantidad_personas = models.IntegerField()
    idservicio = models.IntegerField()

class Personal(models.Model):
    idadmin = models.AutoField(primary_key=True)
    usuario = models.CharField(max_length=30)
    correo = models.CharField(max_length=60)
    permisos = models.CharField(max_length=50)
    contraseña = models.CharField(max_length=80)

