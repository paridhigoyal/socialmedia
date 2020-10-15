from django.conf.urls import url
from django.urls import include, path
from rest_framework import routers

from . import views
from .views import CommentViewSet, PostRateViewSet, PostViewSet, ProfileViewSet

# user_post_list = PostViewSet.as_view({
#     'get': 'list',
#     'post': 'create'
# })
router = routers.DefaultRouter()
router.register(r'profile', ProfileViewSet, basename='profile')
router.register(r'post', PostViewSet, basename='posts')
router.register(r'comment', CommentViewSet, basename='comments')
router.register(r'postrate', PostRateViewSet, basename='likes')

urlpatterns = [
    path('', include(router.urls)),
    url(r'^rest-auth/', include('rest_auth.urls')),
    path('rest-auth/registration/', include('rest_auth.registration.urls')),
    path('following/<int:pk>/', views.Following.as_view(), name='following'),
    path('followers/<int:pk>/', views.Followers.as_view(), name='followers'),
    path('follow/<int:pk>/', views.follow, name='follow'),

]
