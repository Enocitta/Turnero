    let turnoActualAnterior = 0; // Variable para almacenar el turno actual anterior
        //let accessToken = localStorage.getItem('accessToken'); // Obtener el token almacenado
        let accessToken = null;
        let firstLoad = null; // variable para primera carga

        function obtenerToken() {
            // Realizar petición para obtener el token
            fetch('/api/token/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: 'turnetoHome',
                    password: 'Simplepasword12345'
                })
            })
            .then(response => response.json())
            .then(data => {
                accessToken = data.access; // Guardar el token
                localStorage.setItem('accessToken', accessToken); // Almacenar el token
                //cargarTurnos(); // Cargar los turnos después de obtener el token
            })
            .catch(error => console.error('Error al obtener el token:', error));
        }

      function cargarTurnos() {

                obtenerToken(); // Obtener el token si no existe



            fetch('/api/turnos/', {
                headers: {
                    'Authorization': `Bearer ${accessToken}` // Incluir el token en el encabezado
                }
            })
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    const turnoActual = data[data.length - 1];

                // Comparar el turno actual con el turno actual anterior
                        if (turnoActualAnterior !== null && turnoActual.numero !== turnoActualAnterior) {
                            // Reproducir sonido solo si el turno ha cambiado
                            if(firstLoad !== null){
                                const sonidoTurno = document.getElementById('sonido-turno');
                                sonidoTurno.play();
                            }

                            // Mostrar turno actual
                            document.getElementById('turno-actual').innerHTML = `
                              <h1>Turno Actual: ${turnoActual.numero}</h1>
                                <h2>Lugar: ${turnoActual.lugar}</h2>
                            `;
                             // Mostrar turnos pasados
                            const turnosPasados = data.slice(Math.max(data.length - 11, 0), data.length - 1);
                            // Ordenar turnosPasados por número en orden descendente
                            turnosPasados.sort((a, b) => b.numero - a.numero);
                            const listaTurnosPasados = document.getElementById('lista-turnos-pasados');
                                listaTurnosPasados.innerHTML = ''; // Limpiar la lista
                                turnosPasados.forEach(turno => {
                                    const li = document.createElement('li');
                                    li.textContent = `${turno.numero} - ${turno.lugar}`;
                                    listaTurnosPasados.appendChild(li);
                                });
                            firstLoad = 100;
                        }

                        turnoActualAnterior = turnoActual.numero; // Actualizar el turno actual anterior








            } else {
                document.getElementById('turno-actual').innerHTML = '<h1>No hay turnos disponibles</h1>';
                document.getElementById('lista-turnos-pasados').innerHTML = '';
            }
        })
        .catch(error => console.error('Error al cargar turnos:', error));
}

// Cargar turnos al cargar la página y cada 5 segundos
cargarTurnos();
setInterval(cargarTurnos, 5000);
