from django.conf.urls import re_path, url
from django.urls import include, path
from rest_auth.views import PasswordResetConfirmView, PasswordResetView
from rest_framework import routers

from . import views
from .views import (CommentRateUpdateViewSet, CommentUpdateViewSet,
                    FavouriteViewSet, PostRateUpdateViewSet, PostViewSet,
                    ProfileViewSet)

router = routers.DefaultRouter()
router.register(r'profile', ProfileViewSet, basename='profile')
router.register(r'post', PostViewSet, basename='posts')
router.register(r'commentupdate', CommentUpdateViewSet,
                basename='commentsUpdate')
router.register(r'postrateupdate', PostRateUpdateViewSet,
                basename='likesupdate')
router.register(r'commentrateupdate', CommentRateUpdateViewSet,
                basename='commentlikesupdate')
router.register(r'favourite', FavouriteViewSet,
                basename='favouritepost')

urlpatterns = [
    path('', include(router.urls)),
    url(r'^password/reset//$', PasswordResetView.as_view(),
        name='rest_password_reset'),
    re_path(r'^password/reset/confirm/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$',
            PasswordResetConfirmView.as_view(),
            name='password_reset_confirm'),
    url(r'^rest-auth/', include('rest_auth.urls')),
    path('rest-auth/registration/', include('rest_auth.registration.urls')),
    path('comment/', views.CommentViewSet.as_view(), name='comment'),
    path('postrate/', views.PostRateViewSet.as_view(), name='postrate'),
    path('commentrate/', views.CommentRateViewSet.as_view(),
         name='commentrate'),
    path('following/<int:pk>/', views.Following.as_view(), name='following'),
    path('followers/<int:pk>/', views.Followers.as_view(), name='followers'),
    path('follow/<int:pk>/', views.follow, name='follow'),

]
