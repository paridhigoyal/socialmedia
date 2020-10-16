from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from django.http import JsonResponse
from django.shortcuts import get_object_or_404, redirect
from requests.models import Response
from rest_framework import generics, mixins, permissions, status, viewsets
from rest_framework.decorators import action, permission_classes
from rest_framework.filters import OrderingFilter, SearchFilter
from rest_framework.permissions import IsAuthenticated
from .models import Comment, Follower, Post, PostRate, Profile
from .paginators import PagePagination
from .permissions import IsInstanceUser, IsPostOwner, IsPostRateOwner
from .serializers import (CommentSerializer, CommentUpdateSerializer,
                          FollowerSerializer, PostRateSerializer,
                          PostRateUpdateSerializer, PostSerializer,
                          ProfileSerializer)


class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    lookup_fields = ['user', ]
    filter_backends = (SearchFilter,)
    pagination_class = PagePagination
    search_fields = ['user__username', ]
    permission_classes_by_action = {
        'partial_update': [IsInstanceUser],
        'destroy': [IsInstanceUser],
        'update': [IsInstanceUser],
        'get_user_profile': [IsInstanceUser]
    }

    def get_permissions(self):
        try:
            return [
                permission() for permission in self.permission_classes_by_action[
                    self.action]]
        except KeyError:
            return (permissions.IsAuthenticated(),)

    def perform_create(self, serializer):
        return serializer.save(user=self.request.user)

    @action(detail=True,  methods=['GET'],
            url_path="user_profile", url_name="user_profile")
    def get_user_profile(self, request, pk=None):
        try:
            user = get_object_or_404(User, pk=pk)
            profile = Profile.objects.filter(
                user=user)
            page = self.paginate_queryset(profile)
            if page is not None:
                serializer = self.get_serializer(page, many=True)
                return self.get_paginated_response(serializer.data)
            serializer = self.get_serializer(profile, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception:
            return Response({'error': "Bad request"})


class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    filter_backends = (SearchFilter, OrderingFilter)
    search_fields = ['post_by__username', ]
    pagination_class = PagePagination
    ordering = ['-posted_at']
    permission_classes_by_action = {
        'partial_update': [IsPostOwner],
        'destroy': [IsPostOwner],
        'update': [IsPostOwner],
    }

    def get_permissions(self):
        try:
            return [
                permission() for permission in self.permission_classes_by_action[
                    self.action]]
        except KeyError:
            return (permissions.IsAuthenticated(),)

    @action(detail=True,  methods=['GET'],
            url_path="user_posts", url_name="user_posts")
    def get_user_posts(self, request, pk=None):
        try:
            user = get_object_or_404(User, pk=pk)
            post = Post.objects.filter(
                post_by=user)
            page = self.paginate_queryset(post)
            if page is not None:
                serializer = self.get_serializer(page, many=True)
                return self.get_paginated_response(serializer.data)
            serializer = self.get_serializer(post, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception:
            return Response({'error': "Bad request"})


class PostRateViewSet(viewsets.ModelViewSet):
    queryset = PostRate.objects.all()
    serializer_class = PostRateSerializer
    pagination_class = PagePagination
    permission_classes_by_action = {
        'partial_update': [IsPostRateOwner],
        'destroy': [IsPostRateOwner],
        'update': [IsPostRateOwner],
    }

    def get_permissions(self):
        try:
            return [
                permission() for permission in self.permission_classes_by_action[
                    self.action]]
        except KeyError:
            return (permissions.IsAuthenticated(),)

    def perform_create(self, serializer):
        return serializer.save(rated_by=self.request.user)

    def update(self, request, pk=None):
        like = get_object_or_404(PostRate, id=pk)
        self.check_object_permissions(request, like)
        serializer = PostRateUpdateSerializer(like, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    def destroy(self, request, pk=None):
        like = get_object_or_404(PostRate, id=pk)
        rated_post = like.rated_post
        self.check_object_permissions(request, like)
        like.delete()
        return Response(rated_post.data)

    @action(detail=True,  methods=['GET'],
            url_path="post_likes", url_name="post_likes")
    def get_likes(self, request, pk=None):
        try:
            post = get_object_or_404(Post, pk=pk)
            postrate = PostRate.objects.filter(
                rated_post=post)
            page = self.paginate_queryset(postrate)
            if page is not None:
                serializer = self.get_serializer(page, many=True)
                return self.get_paginated_response(serializer.data)
            serializer = self.get_serializer(postrate, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception:
            return Response({'error': "Bad request"})


class CommentViewSet(generics.ListCreateAPIView):
    serializer_class = CommentSerializer
    queryset = Comment.objects.all()
    filter_backends = (SearchFilter, OrderingFilter)
    search_fields = ['user__username', ]
    ordering = ['-commented_at']
    pagination_class = PagePagination

    def perform_create(self, serializer):
        return serializer.save(user=self.request.user)


class CommentUpdateViewSet(mixins.RetrieveModelMixin,
                           mixins.ListModelMixin,
                           mixins.UpdateModelMixin,
                           mixins.DestroyModelMixin,
                           viewsets.GenericViewSet):
    serializer_class = CommentUpdateSerializer
    queryset = Comment.objects.all()
    filter_backends = (SearchFilter, OrderingFilter)
    search_fields = ['user__username', ]
    ordering = ['-commented_at']
    pagination_class = PagePagination
    permission_classes_by_action = {
        'partial_update': [IsInstanceUser],
        'destroy': [IsInstanceUser],
        'update': [IsInstanceUser],
    }

    def get_permissions(self):
        try:
            return [
                permission() for permission in self.permission_classes_by_action[
                    self.action]]
        except KeyError:
            return (permissions.IsAuthenticated(),)

    @action(detail=True,  methods=['GET'],
            url_path="post_comments", url_name="post_comments")
    def get_comments(self, request, pk=None):
        try:
            post = get_object_or_404(Post, pk=pk)
            comments = Comment.objects.filter(
                commented_post=post).order_by('-commented_at')
            page = self.paginate_queryset(comments)
            if page is not None:
                serializer = self.get_serializer(page, many=True)
                return self.get_paginated_response(serializer.data)
            serializer = self.get_serializer(comments, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception:
            return Response({'error': "Bad request"})


@permission_classes([IsAuthenticated])
def follow(request, pk):
    user = get_object_or_404(User, pk=pk)
    if user != request.user:
        already_followed = Follower.objects.filter(
            user=user, is_followed_by=request.user).first()
        if not already_followed:
            new_follower = Follower(user=user, is_followed_by=request.user)
            new_follower.save()
            follower_count = Follower.objects.filter(user=user).count()
            return JsonResponse(
                {'status': 'Following', 'count': follower_count})
        else:
            already_followed.delete()
            follower_count = Follower.objects.filter(user=user).count()
            return JsonResponse(
                {'status': 'Not following', 'count': follower_count})
        return redirect('/')
    raise ValidationError("One Cannot follow themselves")


class Following(generics.ListCreateAPIView):
    serializer_class = FollowerSerializer
    pagination_class = PagePagination
    filter_backends = (SearchFilter,)
    search_fields = ['user__username', ]
    permission_classes = [IsAuthenticated, ]

    def get_queryset(self):
        user = get_object_or_404(User, pk=self.kwargs["pk"])
        return Follower.objects.filter(user=user).exclude(is_followed_by=user)


class Followers(generics.ListCreateAPIView):
    queryset = Follower.objects.all()
    serializer_class = FollowerSerializer
    filter_backends = (SearchFilter,)
    search_fields = ['user__username', ]
    pagination_class = PagePagination
    permission_classes = [IsAuthenticated, ]

    def get_queryset(self):
        user = get_object_or_404(User, pk=self.kwargs["pk"])
        return Follower.objects.filter(is_followed_by=user)
