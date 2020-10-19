from django.conf.urls import url
from django.urls import include, path
from rest_framework import routers

from . import views
from .views import (CommentUpdateViewSet, PostRateUpdateViewSet, PostViewSet,
                    ProfileViewSet)

router = routers.DefaultRouter()
router.register(r'profile', ProfileViewSet, basename='profile')
router.register(r'post', PostViewSet, basename='posts')
router.register(r'commentupdate', CommentUpdateViewSet,
                basename='commentsUpdate')
router.register(r'postrateupdate', PostRateUpdateViewSet,
                basename='likesupdate')

urlpatterns = [
    path('', include(router.urls)),
    url(r'^rest-auth/', include('rest_auth.urls')),
    path('rest-auth/registration/', include('rest_auth.registration.urls')),
    path('comment/', views.CommentViewSet.as_view(), name='comment'),
    path('postrate/', views.PostRateViewSet.as_view(), name='postrate'),
    path('following/<int:pk>/', views.Following.as_view(), name='following'),
    path('followers/<int:pk>/', views.Followers.as_view(), name='followers'),
    path('follow/<int:pk>/', views.follow, name='follow'),

]
