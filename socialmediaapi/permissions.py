from rest_framework import permissions


class IsInstanceUser(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj == request.user or obj.user == request.user


class IsPostOwner(permissions.BasePermission):

    def has_object_permission(self, request, view, post):
        if request.method in permissions.SAFE_METHODS:
            return True
        return post.post_by == request.user


class IsPostRateOwner(permissions.BasePermission):

    def has_object_permission(self, request, view, ratepost):
        if request.method in permissions.SAFE_METHODS:
            return True
        return ratepost.rated_by == request.user


class IsCommentRateOwner(permissions.BasePermission):

    def has_object_permission(self, request, view, ratecomment):
        if request.method in permissions.SAFE_METHODS:
            return True
        return ratecomment.rated_by == request.user


class IsFavouriteOwner(permissions.BasePermission):

    def has_object_permission(self, request, view, favourite):
        if request.method in permissions.SAFE_METHODS:
            return True
        return favourite.favourite_by == request.user
