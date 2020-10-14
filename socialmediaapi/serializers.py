# serializers.py
from django.contrib.auth.models import User
from rest_auth.registration.serializers import RegisterSerializer
from rest_framework import serializers

from .models import Comment, Follower, Post, PostRate, Profile


class RegisterUserSerializer(RegisterSerializer):

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name',
                  'last_name')
        # extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = super(RegisterUserSerializer, self).create(validated_data)
        user.set_first_name(validated_data['first_name'])
        user.save()
        return user


class ProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='get_username', read_only=True)
    first_name = serializers.CharField(source='get_first_name', read_only=True)
    last_name = serializers.CharField(source='get_last_name', read_only=True)
    followers_count = serializers.IntegerField(source='get_followers_count')
    following_count = serializers.IntegerField(source='get_following_count')
    profile_belongs_to_authenticated_user = serializers.BooleanField(
        source='get_profile_belongs_to_authenticated_user')

    class Meta:
        model = Profile
        fields = ('username', 'followers_count', 'following_count',
                  'profile_belongs_to_authenticated_user',
                  'first_name', 'last_name', 'bio', 'location',
                  'gender', 'date_of_birth',
                  'contact_no',  'profile_picture')
        read_only_fields = ('username', 'followers_count',
                            'following_count',
                            'profile_belongs_to_authenticated_user',)


class FollowerSerializer(serializers.ModelSerializer):
    user = serializers.DictField(
        child=serializers.CharField(),
        source='get_user_info', read_only=True)
    is_followed_by = serializers.DictField(
        child=serializers.CharField(),
        source='get_is_followed_by_info', read_only=True)

    class Meta: 
        model = Follower
        fields = ('user', 'is_followed_by')
        read_only_fields = ('user', 'is_followed_by')


class PostSerializer(serializers.ModelSerializer):
    post_belongs_to_authenticated_user = serializers.BooleanField(
        source='get_post_belongs_to_authenticated_user', read_only=True)
    post_by = serializers.DictField(
        child=serializers.CharField(), source='get_user', read_only=True)
    likes_count = serializers.IntegerField(
        source='get_likes_count', read_only=True)
    dislikes_count = serializers.IntegerField(
        source='get_dislikes_count', read_only=True)
    comments_count = serializers.IntegerField(
        source='get_comments_count', read_only=True)

    class Meta:
        model = Post
        fields = ['id', 'post_belongs_to_authenticated_user', 'post_by',
                  'caption', 'image', 
                  'likes_count', 'dislikes_count', 
                  'comments_count', 'posted_at']
        write_only_fields = ['caption', 'image', ]
        read_only_fields = ('id', 'posted_at',)


class PostRateSerializer(serializers.ModelSerializer):

    class Meta:
        model = PostRate
        fields = ['liked', 'rated_post', 'rated_by', ]
        read_only_fields = ('id',)


class CommentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Comment
        fields = ['content', 'user', 'commented_post', 'commented_at']
        read_only_fields = ('id', ' commented_at',)
