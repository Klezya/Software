from django.db import models

class Servicio(models.Model):
    idservicio = models.AutoField(primary_key=True)
    titulo = models.CharField(max_length=50)
    descripcion = models.CharField(max_length=500)
    precio = models.DecimalField(max_digits=8, decimal_places=2)
    ubicacion = models.CharField(max_length=50)
    tipo_servicio = models.CharField(max_length=10)
    menu = models.CharField(max_length=500)
    capacidad = models.IntegerField()
    infraestructura = models.CharField(max_length=500)
    img = models.CharField(max_length=500)
    especialidad = models.CharField(max_length=50)

class Cliente(models.Model):
    idcliente = models.AutoField(primary_key=True)
    rut = models.IntegerField()
    nombre = models.CharField(max_length=30)
    correo = models.CharField(max_length=60)

class Reserva(models.Model):
    idreserva = models.AutoField(primary_key=True)
    pago_total = models.DecimalField(max_digits=8, decimal_places=2)
    fecha = models.DateField()
    estado_pago = models.CharField(max_length=20)
    metodo_de_pago = models.CharField(max_length=20)
    idcliente = models.ForeignKey(Cliente, on_delete=models.CASCADE, db_column='idcliente')
    cantidad_personas = models.IntegerField()
    N_reserva = models.IntegerField()

class Servicio_Reserva(models.Model):
    id = models.AutoField(primary_key=True)
    fecha_reservada = models.DateField()
    idservicio = models.ForeignKey(Servicio, on_delete=models.CASCADE, db_column='idservicio')
    idreserva = models.ForeignKey(Reserva, on_delete=models.CASCADE, db_column='idreserva')

    class Meta:
        unique_together = (('idservicio', 'idreserva'),)

class Personal(models.Model):
    idadmin = models.AutoField(primary_key=True)
    usuario = models.CharField(max_length=30)
    correo = models.CharField(max_length=60)
    permisos = models.CharField(max_length=50)
    contraseña = models.CharField(max_length=80)

