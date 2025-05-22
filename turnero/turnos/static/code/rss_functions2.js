const rssFeedContainer = document.getElementById('rss-feed-container');
        let newsItems = []; // Almacenará todas las noticias
        let currentItemIndex = 0; // Índice de la noticia actual
        let rotationInterval; // Para guardar la referencia del intervalo



        // Función para mostrar un ítem de noticia específico
        function displayNewsItem(item) {
            rssFeedContainer.innerHTML = ''; // Limpiar el contenido anterior

            const itemDiv = document.createElement('div');
            itemDiv.classList.add('rss-item');

            // Añadir la clase 'active' después de un breve retraso para la animación
            setTimeout(() => {
                itemDiv.classList.add('active');
            }, 50);

            const title = item.title;
            const link = item.link;
            const description = item.summary;
            const published = item.published;
            const author = item.author;

            itemDiv.innerHTML = `
                <h3>${title}</h3>
                <p>${description}</p>
                `;
            rssFeedContainer.appendChild(itemDiv);
        }

        // Función para rotar al siguiente ítem
        function showNextItem() {
            if (newsItems.length === 0) {
                rssFeedContainer.innerHTML = '<p class="error-message">No hay noticias para mostrar.</p>';
                clearInterval(rotationInterval); // Detener el intervalo si no hay ítems
                return;
            }

            // Eliminar la clase 'active' del ítem actual (si existe) para la animación de fade out
            const currentActiveItem = rssFeedContainer.querySelector('.rss-item.active');
            if (currentActiveItem) {
                currentActiveItem.classList.remove('active');
                // Esperar a que la animación de fade out termine antes de mostrar el siguiente
                setTimeout(() => {
                    displayNewsItem(newsItems[currentItemIndex]);
                    currentItemIndex = (currentItemIndex + 1) % newsItems.length; // Mover al siguiente, o volver al inicio
                }, 1000); // Coincide con la duración de la transición CSS
            } else {
                // Si no hay un ítem activo (primera carga), simplemente mostrarlo
                displayNewsItem(newsItems[currentItemIndex]);
                currentItemIndex = (currentItemIndex + 1) % newsItems.length;
            }
        }

        async function fetchRSSFeed() {

            clearInterval(rotationInterval); // Limpiar cualquier intervalo anterior

            const externalRssUrl = 'https://www.clarin.com/rss/lo-ultimo/'; // Tu RSS feed
            const djangoApiEndpoint = `http://127.0.0.1:8000/noticias/get-rss/?url=${encodeURIComponent(externalRssUrl)}`;

             if (!djangoApiEndpoint) {
                rssFeedContainer.innerHTML = '<p class="error-message">Por favor, introduce una URL de RSS.</p>';
                return;
            }

             rssFeedContainer.innerHTML = '<p class="loading-message">Cargando noticias...</p>';


            try {
                const response = await fetch(djangoApiEndpoint);

                if (!response.ok) {
                    const errorData = await response.json().catch(() =>  ({}));
                    throw new Error(`Error HTTP: ${response.status} ${response.statusText}. ${errorData.error || ''}`);
                 }

                rssFeedContainer.innerHTML = '<p class="loading-message">noticias tomadas...</p>';
                const data = await response.json();
                if (data.error) {
                    throw new Error(data.error);
                    rssFeedContainer.innerHTML = '<p class="loading-message">Error de datos...</p>';
                }

               // newsItems = data.items; // Guardar las noticias
                newsItems= data.entries;
                currentItemIndex = 0; // Reiniciar el índice
                /*
                if (newsItems && newsItems.length > 0) {
                    showNextItem(); // Muestra el primer ítem
                    // Iniciar la rotación cada 10 segundos
                    rotationInterval = setInterval(showNextItem, 1000); // 10000ms = 10 segundos
                } else {
                    rssFeedContainer.innerHTML = '<p class="error-message">No se encontraron noticias en el feed.</p>';
                }
                */
                if (newsItems && newsItems.length > 0) {
                    showNextItem();
                    rotationInterval = setInterval(showNextItem, 10000); // 10000ms = 10 segundos
                /*
                 newsItems.forEach(item => {
                        const itemDiv = document.createElement('div');
                        itemDiv.classList.add('rss-item');

                        const title = item.title;
                        const link = item.link;
                        const summary = item.summary;
                        const published = item.published;

                        itemDiv.innerHTML = `
                            <h2><a href="${link}" target="_blank" rel="noopener noreferrer">${title}</a></h2>
                            <p>${summary}</p>
                            <p class="published-date">Publicado: ${new Date(published).toLocaleDateString()} ${new Date(published).toLocaleTimeString()}</p>
                        `;
                        rssFeedContainer.appendChild(itemDiv);
                    });
                    */
                } else {
                    rssFeedContainer.innerHTML = '<p class="error-message">No se encontraron noticias en el feed.</p>';
                }

            } catch (error) {
                console.error('Hubo un problema al cargar el feed RSS:', error);
                rssFeedContainer.innerHTML = `<p class="error-message">Error al cargar las noticias: ${error.message}. Por favor, intente de nuevo más tarde.</p>`;
            }
        }

        // Opcional: Cargar el feed automáticamente al cargar la página
 document.addEventListener('DOMContentLoaded', () => {
            fetchRSSFeed();

        });
