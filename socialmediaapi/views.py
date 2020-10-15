from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from django.http import JsonResponse
from django.shortcuts import get_object_or_404, redirect
from requests.models import Response
from rest_framework import generics, permissions, viewsets
from rest_framework.decorators import action, permission_classes
from rest_framework.filters import OrderingFilter, SearchFilter
from rest_framework.permissions import IsAuthenticated

from .models import Comment, Follower, Post, PostRate, Profile
from .paginators import (CommentPagination, FollowerPagination,
                         FollowingPagination, PostPagination, 
                         PostRatePagination, ProfilePagination)
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
    pagination_class = ProfilePagination
    search_fields = ['user__username', ]
    permission_classes_by_action = {
        'partial_update': [IsInstanceUser],
        'destroy': [IsInstanceUser],
        'update': [IsInstanceUser],
        # 'get_user_profile': [IsInstanceUser]
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

    # @action(detail=True, methods=['GET'], 
    # url_path="userposts", url_name="user_posts")
    # def get_user_posts(self , request ,pk = None):
    #     try:
    #         post_by = get_object_or_404(User , pk = pk)
    #         owner_posts = Post.objects.filter(post_by = post_by.id)
    #         serializer = PostSerializer(owner_posts , many = True)
    #         return Response(serializer.data)
    #     except(User.DoesNotExist):
    #         return Response(
        # {"error": 'The user does not exist'},
        #  status=status.HTTP_204_NO_CONTENT)
    # import pdb; pdb.set_trace()

    # @action(detail=False, methods=['GET'], 
    # url_path="profile", url_name="profile")
    # def get_user_profile(self, request, pk=None):

    #     try:
    #         import pdb; pdb.set_trace()
    #         queryset = self.get_queryset().get(id=request.user.id)
    #         serializer = ProfileSerializer(queryset, many=True)
    #         return Response(serializer.data, status=status.HTTP_200_OK)
    #     except(User.DoesNotExist):
    #         return Response(
        # {"error": 'The user does not exist'}, 
        # status=status.HTTP_204_NO_CONTENT)


class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    filter_backends = (SearchFilter, OrderingFilter)
    search_fields = ['post_by__username', ]
    pagination_class = PostPagination
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

    # permission_classes = [permissions.IsAuthenticated, IsPostOwner]
    # @action(detail=False, methods=['GET'], name='Get comments')
    # def list_comments(self, request, *args, **kwargs):
    #     queryset = Post.objects.filter(in_reply_to_post = self.kwargs["pk"])
    #     serializer = self.get_serializer(queryset)
    #     return Response(serializer.data)

    # def get_queryset(self):
    #     if self.action == 'list':
    #         return Post.objects.filter(
        # in_reply_to_post = None).order_by('-posted_at')
    #     return Post.objects.order_by('-posted_at')


class PostRateViewSet(viewsets.ModelViewSet):
    queryset = PostRate.objects.all()
    serializer_class = PostRateSerializer
    pagination_class = PostRatePagination
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
        # post = PostRate.rated_post
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


class CommentViewSet(viewsets.ModelViewSet):
    serializer_class = CommentSerializer
    queryset = Comment.objects.all()
    filter_backends = (SearchFilter, OrderingFilter)
    search_fields = ['user__username', ]
    ordering = ['-commented_at']
    pagination_class = CommentPagination
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

    def perform_create(self, serializer):
        return serializer.save(user=self.request.user)

    def update(self, request, pk=None):
        comment = get_object_or_404(Comment, id=pk)
        self.check_object_permissions(request, comment)
        serializer = CommentUpdateSerializer(comment, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    @action(detail=True)
    def get_comments(self, request, pk=None):
        post = get_object_or_404(Post, pk=pk)
        comments = Comment.objects.filter(
            commented_post=post).order_by('-commented_at')
        return Response(CommentSerializer(comments, many=True).data)


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
    pagination_class = FollowingPagination
    permission_classes = [IsAuthenticated, ]

    def get_queryset(self):
        user = get_object_or_404(User, pk=self.kwargs["pk"])
        return Follower.objects.filter(user=user).exclude(is_followed_by=user)


class Followers(generics.ListCreateAPIView):
    queryset = Follower.objects.all()
    serializer_class = FollowerSerializer
    pagination_class = FollowerPagination
    permission_classes = [IsAuthenticated, ]

    def get_queryset(self):
        user = get_object_or_404(User, pk=self.kwargs["pk"])
        return Follower.objects.filter(is_followed_by=user)
