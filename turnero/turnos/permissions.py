from rest_framework import permissions

class EsAdministradorOTienePermisoDeCrear(permissions.BasePermission):
    """
    Permiso personalizado para permitir solo a administradores o usuarios con permiso de creación.
    """

    def has_permission(self, request, view):
        # Permite el acceso a los administradores
        if request.user and request.user.is_staff:
            return True

        # Permite el acceso a usuarios con el permiso 'turnos.add_turno'
        return request.user and request.user.has_perm('turnos.add_turno')