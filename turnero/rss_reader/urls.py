
from django.urls import path
from . import views

urlpatterns = [
    path('get-rss/', views.get_rss_feed, name='get_rss_feed'), # URL para el endpoint JSON

]