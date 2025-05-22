from django.shortcuts import render

# Create your views here.
import feedparser
from django.http import JsonResponse
from django.views.decorators.http import require_GET
import logging

logger = logging.getLogger(__name__)

@require_GET
def get_rss_feed(request):
    """
    Vista para obtener y parsear un feed RSS y devolverlo como JSON.
    La URL del feed se pasa como parámetro de consulta: /get-rss/?url=<RSS_URL>
    """
    rss_url = request.GET.get('url')

    if not rss_url:
        return JsonResponse({'error': 'URL del RSS es requerida.'}, status=400)

    try:
        # Usar feedparser para obtener y parsear el feed RSS
        feed = feedparser.parse(rss_url)

        if feed.bozo:
            # feed.bozo es True si hay errores en el feed (XML mal formado, etc.)
            logger.warning(f"Error parsing RSS feed from {rss_url}: {feed.bozo_exception}")
            # Considerar si quieres devolver un error al cliente o solo un feed vacío
            # Si quieres devolver un error específico:
            # return JsonResponse({'error': 'Error al parsear el feed RSS.', 'details': str(feed.bozo_exception)}, status=500)
            # Para este ejemplo, seguiremos procesando aunque sea bozo, puede que algunos ítems se parseen bien.

        # Extraer información relevante
        feed_data = {
            'title': feed.feed.get('title', 'Sin Título de Feed'),
            'link': feed.feed.get('link', '#'),
            'description': feed.feed.get('description', 'Sin descripción de feed'),
            'entries': []
        }

        # Iterar sobre las entradas (noticias) del feed
        for entry in feed.entries:
            feed_data['entries'].append({
                'title': entry.get('title', 'Sin título'),
                'link': entry.get('link', '#'),
                'summary': entry.get('summary', entry.get('description', 'Sin resumen/descripción')),
                'published': entry.get('published', 'Fecha desconocida'),
                # Puedes añadir más campos si los necesitas, como 'author', 'tags', etc.
            })

        return JsonResponse(feed_data)

    except Exception as e:
        logger.error(f"Error al procesar el feed RSS {rss_url}: {e}")
        return JsonResponse({'error': 'Error interno del servidor al obtener o procesar el feed.', 'details': str(e)}, status=500)
