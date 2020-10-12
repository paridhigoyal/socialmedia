from rest_framework import permissions


class IsInstanceUser(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj == request.user or obj.user == request.user
    
    
class IsPostOwner(permissions.BasePermission):

    def has_object_permission(self, request, view, post):
        if request.method in permissions.SAFE_METHODS:
            return True
        return post.post_by == request.user
