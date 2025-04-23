# Create your views here.
from rest_framework import generics
from django.shortcuts import render
from .models import Turno
from .serializers import TurnoSerializer
from .permissions import EsAdministradorOTienePermisoDeCrear

class TurnoListCreate(generics.ListCreateAPIView):
    queryset = Turno.objects.all()
    serializer_class = TurnoSerializer
    permission_classes = [EsAdministradorOTienePermisoDeCrear]

def turnero(request):
    turnos_pasados = Turno.objects.order_by('-fecha_hora')[:10]

    if Turno.objects.exists():
        turno_actual = Turno.objects.latest('fecha_hora')
    else:
        turno_actual = None  # O puedes asignar un valor por defecto

    return render(request, 'turnos/turnero_modificado.html', {
        'turno_actual': turno_actual,
        'turnos_pasados': turnos_pasados,
    })

