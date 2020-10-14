from django.conf.urls import url
from django.urls import include, path
from rest_framework import routers
from .views import ProfileViewSet, PostViewSet, CommentViewSet
from . import views

router = routers.DefaultRouter()
router.register(r'profile', ProfileViewSet, basename='profile')
router.register(r'post', PostViewSet)
router.register(r'comment', CommentViewSet)

urlpatterns = [
    path('', include(router.urls)),
    url(r'^rest-auth/', include('rest_auth.urls')),
    path('rest-auth/registration/', include('rest_auth.registration.urls')),
    path('following/<int:pk>/', views.Following.as_view(), name='following'),
    path('followers/<int:pk>/', views.Followers.as_view(), name='followers'),
    path('follow/<int:pk>/', views.follow, name='follow'),
     path('postrate/', views.PostRateViewSet.as_view(), name='rate'),
    path('postrating/<int:pk>/', views.PostRateViewSet.as_view(), name='rating'),
]
