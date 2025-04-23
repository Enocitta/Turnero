from django.urls import path
from . import views

urlpatterns = [
    path('', views.turnero, name='turnero'),
    path('turnos/', views.TurnoListCreate.as_view()),
]