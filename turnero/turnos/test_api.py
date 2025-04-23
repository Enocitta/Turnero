import requests
import os
from dotenv import load_dotenv
from pathlib import Path

# Obtener la ruta del directorio donde se encuentra el script
BASE_DIR = Path(__file__).resolve().parent

# Cargar variables de entorno desde turnos/test_api.env
load_dotenv(os.path.join(BASE_DIR, "test_api.env"))
# Cargar variables de entorno desde .env (si existe)


API_URL = os.getenv("API_URL") or "http://127.0.0.1:8000/api/"
#USERNAME = os.getenv("USERNAME") or "test"
USERNAME = "test"
PASSWORD = os.getenv("PASSWORD")

def obtener_token():
    """Obtiene un token de acceso de la API."""
    token_url = f"{API_URL}token/"
    data = {"username": USERNAME, "password": PASSWORD}
    response = requests.post(token_url, data=data)

    if response.status_code == 200:
        return response.json()["access"]
    else:
        print(f"Error al obtener el token: {response.status_code}")
        return None

def realizar_peticion_api(token, endpoint, method="GET", data=None):
    """Realiza una petición a la API con el token de acceso."""
    headers = {"Authorization": f"Bearer {token}"}
    url = f"{API_URL}{endpoint}"

    try:
        if method == "GET":
            response = requests.get(url, headers=headers)
        elif method == "POST":
            response = requests.post(url, headers=headers, json=data)
        elif method == "PUT":
            response = requests.put(url, headers=headers, json=data)
        elif method == "DELETE":
            response = requests.delete(url, headers=headers)
        else:
            print("Método HTTP no soportado.")
            return None

        response.raise_for_status()  # Lanza una excepción para códigos de error HTTP
        return response.json()

    except requests.exceptions.RequestException as e:
        print(f"Error en la petición a la API: {e}")
        return None

def main():
    token = obtener_token()

    if token:
        # Ejemplo: Obtener la lista de turnos
        turnos = realizar_peticion_api(token, "turnos/")
        if turnos:
            print("Lista de turnos:", turnos)

        # Ejemplo: Crear un nuevo turno
        nuevo_turno = {"numero": 34, "lugar": "Consultorio 43"}
        turno_creado = realizar_peticion_api(token, "turnos/", method="POST", data=nuevo_turno)
        if turno_creado:
            print("Turno creado:", turno_creado)

if __name__ == "__main__":
    main()