![PyPI - Python Version](https://img.shields.io/pypi/pyversions/Django)
![PyPI - Wheel](https://img.shields.io/pypi/wheel/djangorestframework?label=djangorestframework)
![GitHub Pipenv locked dependency version](https://img.shields.io/github/pipenv/locked/dependency-version/Enocitta/Turnero/django)


# **Turnero**

Sistema de gestión de turnos para comercios.

## **Descripción**

Turnero es una aplicación web desarrollada con Django que permite a los comercios gestionar turnos de atención al cliente. Facilita a los clientes la solicitud de turnos online y a los comercios la organización de la atención, reduciendo tiempos de espera y mejorando la experiencia del cliente.

## **Funcionalidades**

* **Solicitud de turnos online:** Los clientes pueden ver la disponibilidad de turnos y reservar uno a través de la plataforma.  
* **Gestión de turnos para comercios:** Los comercios pueden administrar los turnos reservados, ver el estado de cada turno y organizar la atención.  
* **Interfaz de administración:** El administrador del sitio puede gestionar usuarios, comercios, servicios y otras configuraciones del sistema.  
* **Notificaciones:** (Opcional, dependiendo de la implementación) Se pueden enviar notificaciones a los clientes para recordarles sus turnos o informarles de cambios.

## **Tecnologías utilizadas**

* **Frontend:** HTML, CSS, JavaScript  
* **Backend:** Python, Django  
* **Base de datos:** PostgreSQL  
* **Servidor web:** Gunicorn  
* **Otros:** Dependencias listadas en el archivo requirements.txt

## **Instalación**

1. **Clonar el repositorio:** 
   ```
   $ git clone https://github.com/Enocitta/Turnero.git  
   $ cd Turnero
   ```
## **Metodo general**

1. **Crear un entorno virtual (recomendado):**  
   ```
   $ python3 \-m venv venv  
   $ source venv/bin/activate  \# En Linux/macOS  
   $ venv\\Scripts\\activate.bat \# En Windows
   ```
2. **Instalar las dependencias:**  
  ```
  $ pip install \-r requirements.txt
  ```
# **Metodo Automatico**

1. **ejecutar el scrip de instalacion de entorno virtual**
    antes de proceder asegurese de tener instalado python3.12-venv
    de no ser asi use el siguiente comando
    ```
    $ sudo apt install python3.12-venv
    ```
    en terminal de linux o de pycharm ejecute localmente
    ```
    $  ./instaler_env.sh
    ``` 
    se procedera a la instalacion de el entorno virtual y de los paquetes
    de dependencia que estan en requirements.txt

# **luego de la intalacion de venv**

3. **verifique que se haya creado la carpeta venv**
   verifique que en su directorio de proyecto se encuentra la carpeta .venv
   y que tiene la version correcta de pyhon.

4. **Configurar la base de datos:**  
   * Crea una base de datos PostgreSQL (por defecto se puede usar la SQLite del proyecto).  
   * Configura los parámetros de la base de datos en el archivo settings.py de Django.  
5. **Ejecutar las migraciones de Django:**  
    ```
    $ python manage.py migrate
    ```
6. **Crear un superusuario de Django:**  
    ```
    $ python manage.py createsuperuser
    ```
7. **Ejecutar el servidor de desarrollo:**
    ```
   $ python manage.py runserver
    ```
   
8. **Acceder a la aplicación:**  
   * Abre un navegador web y visita http://localhost:8000/.  
   * Accede a la interfaz de administración en http://localhost:8000/admin/.

## **Configuración**

La aplicación se configura a través del archivo settings.py de Django. Los parámetros más importantes incluyen:

* DEBUG: Activa o desactiva el modo de depuración.  
* ALLOWED\_HOSTS: Lista de dominios permitidos para acceder a la aplicación.  
* DATABASES: Configuración de la base de datos.  
* STATIC\_URL y STATIC\_ROOT: Configuración de los archivos estáticos.  
* MEDIA\_URL y MEDIA\_ROOT: Configuración de los archivos multimedia.

## **Despliegue**

La aplicación puede desplegarse en un servidor web como Apache o Nginx, utilizando WSGI con Gunicorn. También puede desplegarse en plataformas en la nube como Heroku o AWS.

## **Contribución**

Las contribuciones son bienvenidas. Si deseas contribuir al proyecto, sigue estos pasos:

1. Haz un fork del repositorio.  
2. Crea una rama para tu contribución.  
3. Realiza tus cambios.  
4. Crea un pull request.

## **Licencia**

Este proyecto está licenciado bajo la licencia [LICENSE](LICENCE.md).
