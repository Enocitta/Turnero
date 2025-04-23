from rest_framework import serializers
from .models import Turno

class TurnoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Turno
        fields = ['numero', 'lugar', 'fecha_hora']