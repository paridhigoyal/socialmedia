# serializers.py
import datetime

from rest_framework import serializers

from .models import (Comment, CommentRate, Favourite, Follower, Post, PostRate,
                     Profile)


class ProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='get_username', read_only=True)
    user_id = serializers.IntegerField(source='get_user_id', read_only=True)
    first_name = serializers.CharField(source='get_first_name', read_only=True)
    last_name = serializers.CharField(source='get_last_name', read_only=True)
    followers_count = serializers.IntegerField(
        source='get_followers_count', read_only=True)
    following_count = serializers.IntegerField(
        source='get_following_count', read_only=True)
    profile_belongs_to_authenticated_user = serializers.BooleanField(
        source='get_profile_belongs_to_authenticated_user', read_only=True)
    follow_status = serializers.CharField(source='get_follow_status',
                                          read_only=True)

    class Meta:
        model = Profile
        fields = ('id', 'user_id', 'username', 'followers_count',
                  'following_count',
                  'profile_belongs_to_authenticated_user',
                  'first_name', 'last_name', 'bio', 'location',
                  'gender', 'date_of_birth',
                  'contact_no', 'profile_picture', 'follow_status')
        read_only_fields = ('id', 'user_id', 'username', 'followers_count',
                            'following_count',
                            'profile_belongs_to_authenticated_user',)
        write_only_fields = ('first_name', 'last_name', 'bio', 'location',
                             'gender', 'date_of_birth', )

    def validate(self, data):
        today = datetime.date.today()
        contact_no = data['contact_no']
        if data['date_of_birth'] > today:
            raise serializers.ValidationError("Birth Date can't be in future")
        if len(contact_no) != 13:
            raise serializers.ValidationError(
                'Length of phone number must be 13 digits')
        return data


class FollowerSerializer(serializers.ModelSerializer):
    user = serializers.DictField(
        child=serializers.CharField(),
        source='get_user_info', read_only=True)
    is_followed_by = serializers.DictField(
        child=serializers.CharField(),
        source='get_is_followed_by_info', read_only=True)

    class Meta:
        model = Follower
        fields = ('id', 'user', 'is_followed_by')
        read_only_fields = ('id', 'user', 'is_followed_by')


class PostRateSerializer(serializers.ModelSerializer):

    class Meta:
        model = PostRate
        fields = '__all__'
        read_only_fields = ('id', 'rated_by')

    def validate(self, data):
        rated_by_id = self.context['request'].user.id
        rated_post = data['rated_post']

        like = PostRate.objects.filter(
            rated_by=rated_by_id, rated_post=rated_post.id)
        if like.exists():
            raise serializers.ValidationError(
                "this like with this user and post already exists")
        return data


class FavouriteSerializer(serializers.ModelSerializer):

    class Meta:
        model = Favourite
        fields = '__all__'
        read_only_fields = ('id', 'favourite_by')

    def validate(self, data):
        favourite_by_id = self.context['request'].user.id
        favourite_post = data['favourite_post']

        favourite = Favourite.objects.filter(
            favourite_by=favourite_by_id, favourite_post=favourite_post.id)
        if favourite.exists():
            raise serializers.ValidationError(
                "this favourite with this user and post already exists")
        return data


class CommentRateSerializer(serializers.ModelSerializer):

    class Meta:
        model = CommentRate
        fields = '__all__'
        read_only_fields = ('id', 'rated_by')

    def validate(self, data):
        rated_by_id = self.context['request'].user.id
        rated_comment = data['rated_comment']

        like = CommentRate.objects.filter(
            rated_by=rated_by_id, rated_comment=rated_comment.id)
        if like.exists():
            raise serializers.ValidationError(
                "this like with this user and post already exists")
        return data


class CommentSerializer(serializers.ModelSerializer):
    comment_by = serializers.DictField(
        child=serializers.CharField(), source='get_user', read_only=True)
    commented_at = serializers.CharField(source='get_date', read_only=True)
    like = CommentRateSerializer(many=True, read_only=True)
    likes_count = serializers.SerializerMethodField(read_only=True)
    dislikes_count = serializers.SerializerMethodField(read_only=True)

    def get_likes_count(self, obj):
        return obj.like.filter(liked=True).count()

    def get_dislikes_count(self, obj):
        return obj.like.filter(liked=False).count()

    class Meta:
        model = Comment
        fields = ['id', 'content', 'user', 'comment_by',
                  'commented_post', 'commented_at',
                  'likes_count', 'dislikes_count', 'like']
        read_only_fields = ('id', ' commented_at', 'user')


class PostSerializer(serializers.ModelSerializer):
    post_belongs_to_authenticated_user = serializers.BooleanField(
        source='get_post_belongs_to_authenticated_user', read_only=True)
    posted_at = serializers.CharField(source='get_date', read_only=True)
    post_by = serializers.DictField(
        child=serializers.CharField(), source='get_user', read_only=True)
    comments_count = serializers.SerializerMethodField(read_only=True)
    likes_count = serializers.SerializerMethodField(read_only=True)
    dislikes_count = serializers.SerializerMethodField(read_only=True)
    caption = serializers.CharField()
    likes = PostRateSerializer(many=True, read_only=True)
    comments = CommentSerializer(many=True, read_only=True)
    favourites = FavouriteSerializer(many=True, read_only=True)

    def get_comments_count(self, obj):
        return obj.comments.count()

    def get_likes_count(self, obj):
        return obj.likes.filter(liked=True).count()

    def get_dislikes_count(self, obj):
        return obj.likes.filter(liked=False).count()

    class Meta:
        model = Post
        fields = ['id', 'post_belongs_to_authenticated_user', 'post_by',
                  'caption', 'image',
                  'likes_count', 'dislikes_count',
                  'comments_count', 'posted_at', 'comments',
                  'likes', 'favourites']
        write_only_fields = ['caption', 'image', ]
        read_only_fields = ('id', 'posted_at',)


class PostRateUpdateSerializer(serializers.ModelSerializer):
    class Meta():
        model = PostRate
        fields = '__all__'
        read_only_fields = ['id', 'rated_by', 'rated_post']


class CommentUpdateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Comment
        fields = ['id', 'content', 'user', 'commented_post', 'commented_at']
        read_only_fields = ('id', ' commented_at', 'user', 'commented_post')


class CommentRateUpdateSerializer(serializers.ModelSerializer):
    class Meta():
        model = CommentRate
        fields = '__all__'
        read_only_fields = ['id', 'rated_by', 'rated_comment']
