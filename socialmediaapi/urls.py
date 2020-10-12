from django.conf.urls import url
from django.urls import include, path
from rest_framework import routers
from .views import ProfileViewSet, PostViewSet

router = routers.DefaultRouter()
router.register(r'profile', ProfileViewSet, basename='profile')
router.register(r'post', PostViewSet)

urlpatterns = [
    path('', include(router.urls)),
    url(r'^rest-auth/', include('rest_auth.urls')),
    path('rest-auth/registration/', include('rest_auth.registration.urls')),
]
