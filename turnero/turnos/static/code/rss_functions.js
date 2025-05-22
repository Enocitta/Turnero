 /*document.getElementById('loadFeedButton').addEventListener('click', fetchAndDisplayRSS);*/
 const urs_rssreader ='https://www.clarin.com/rss/lo-ultimo/';
        async function fetchAndDisplayRSS() {
           /* const rssUrlInput = document.getElementById('rssUrlInput');*/
            const rssUrlInput = urs_rssreader;
            const rssFeedContainer = document.getElementById('rss-feed-container');
           // const targetRssUrl = rssUrlInput.value.trim();
           const targetRssUrl = rssUrlInput;

            if (!targetRssUrl) {
                rssFeedContainer.innerHTML = '<p class="error-message">Por favor, introduce una URL de RSS.</p>';
                return;
            }

            rssFeedContainer.innerHTML = '<p class="loading-message">Cargando noticias...</p>';

            // La URL de tu endpoint proxy de Django
            // Asegúrate de que la URL sea correcta para tu configuración de Django
            //const proxyEndpoint = `/noticias/get-rss/?url=${encodeURIComponent(targetRssUrl)}`;
            // Si estás desarrollando localmente y el frontend y backend están en diferentes puertos,
            // o si necesitas una URL absoluta para producción:
             const proxyEndpoint = `http://127.0.0.1:8000/noticias/get-rss/?url=${encodeURIComponent(targetRssUrl)}`;


            try {
                const response = await fetch(proxyEndpoint);
                if (!response.ok) {
                    const errorData = await response.json().catch(() => ({})); // Intenta parsear el error si es JSON
                    throw new Error(`Error HTTP: ${response.status} ${response.statusText}. ${errorData.error || ''}`);
                }
                const data = await response.json();

                if (data.error) {
                    throw new Error(data.error);
                }

                if (data.entries && data.entries.length > 0) {
                    rssFeedContainer.innerHTML = ''; // Limpiar el mensaje de carga
                    const feedTitle = data.title || 'Noticias';
                    const feedLink = data.link || '#';

                    const feedHeader = document.createElement('h2');
                    feedHeader.innerHTML = `<a href="${feedLink}" target="_blank" rel="noopener noreferrer">${feedTitle}</a>`;
                    rssFeedContainer.appendChild(feedHeader);

                    data.entries.forEach(item => {
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
                } else {
                    rssFeedContainer.innerHTML = '<p class="loading-message">No se encontraron artículos en el feed.</p>';
                }

            } catch (error) {
                console.error('Hubo un problema al cargar el feed RSS:', error);
                rssFeedContainer.innerHTML = `<p class="error-message">Error al cargar las noticias: ${error.message}. Por favor, intente de nuevo.</p>`;
            }
        }

        // Cargar un feed predeterminado al cargar la página
        document.addEventListener('DOMContentLoaded', () => {
            fetchAndDisplayRSS();
        });
