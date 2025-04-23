from django.db import models

# Create your models here.
from django.db import models

class Turno(models.Model):
    numero = models.IntegerField(unique=True)
    lugar = models.CharField(max_length=100)
    fecha_hora = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Turno {self.numero} - {self.lugar}"