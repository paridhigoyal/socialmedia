from django.contrib.auth.models import User
from requests.models import Response
from rest_framework import mixins, generics, permissions, status, viewsets
from rest_framework.decorators import action
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.permissions import IsAuthenticated
from .models import Profile, Post, Follower, PostRate, Comment
from .permissions import IsInstanceUser, IsPostOwner
from .serializers import ProfileSerializer, PostSerializer, FollowerSerializer,PostRateSerializer, CommentSerializer
from django.shortcuts import get_object_or_404, redirect
from django.core.exceptions import ValidationError
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes




class ProfileViewSet(mixins.ListModelMixin,  mixins.RetrieveModelMixin,
                     mixins.UpdateModelMixin, mixins.DestroyModelMixin,
                     viewsets.GenericViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated, ]
    lookup_fields = ['user', ]
    filter_backends = (SearchFilter,)
    search_fields = ['user__username',]
    permission_classes_by_action = {
        'partial_update': [IsInstanceUser],
        'destroy': [IsInstanceUser],
        'update': [IsInstanceUser],
        # 'get_user_profile': [IsInstanceUser]
    }

    def get_permissions(self):
        try:
            return [permission() for permission in self.permission_classes_by_action[self.action]]
        except KeyError:
            return (permissions.IsAuthenticated(),)
    # import pdb; pdb.set_trace()

    # @action(detail=False, methods=['GET'], url_path="profile", url_name="profile")
    # def get_user_profile(self, request, pk=None):
        
    #     try:
    #         import pdb; pdb.set_trace()
    #         queryset = self.get_queryset().get(id=request.user.id)
    #         serializer = ProfileSerializer(queryset, many=True)
    #         return Response(serializer.data, status=status.HTTP_200_OK)
    #     except(User.DoesNotExist):
    #         return Response({"error": 'The user does not exist'}, status=status.HTTP_204_NO_CONTENT)
        
    @action(detail=True, methods=['GET'], url_path="posts", url_name="user_posts")
    def get_user_posts(self, request, pk=None):
        post=Post.objects.all()
        try:
            import pdb; pdb.set_trace();
            user = self.get_queryset().get(pk=pk)  
            queryset = Post.objects.filter(post.post_by).order_by('-posted_at')
            serializer = PostSerializer(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except:
            return Response({'error': "Bad request"}, status=status.HTTP_200_OK)



class PostViewSet(viewsets.ModelViewSet):
    
    serializer_class = PostSerializer
    queryset = Post.objects.all()
    # lookup_fields = ['user', ]
    filter_backends = (SearchFilter,)
    search_fields = ['post_by__username',]
    permission_classes_by_action = {
        'partial_update': [IsPostOwner],
        'destroy': [IsPostOwner],
        'update': [IsPostOwner],
        # 'get_user_profile': [IsInstanceUser]
    }
    
    def get_permissions(self):
        try:
            return [permission() for permission in self.permission_classes_by_action[self.action]]
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
    #         return Post.objects.filter(in_reply_to_post = None).order_by('-posted_at')
    #     return Post.objects.order_by('-posted_at')
    
    
class PostRateViewSet(generics.GenericAPIView): # use mixins instead
    queryset = PostRate.objects.all()
    serializer_class = PostRateSerializer

    def get(self, request, pk):
        post = get_object_or_404(Post, pk = pk)
        data = {
            'likes_count': PostRate.objects.filter(liked = True, rated_post = post).count(), 
            'dislikes_count': PostRate.objects.filter(liked = False, rated_post = post).count()
        }
        return JsonResponse(data)

    def post(self, request, *args, **kwargs):
        post = get_object_or_404(Post, pk = id)
        post_rating = PostRate.objects.filter(rated_by = request.user, rated_post = post).first()
        user_liked_post = request.data["liked"]

        if post_rating:
            if user_liked_post:
                if post_rating.liked:
                    post_rating.liked = None
                else:
                    post_rating.liked = True                    
            elif not user_liked_post:
                if post_rating.liked == False:
                    post_rating.liked = None
                else:
                    post_rating.liked = False                    
        else:
            post_rating = PostRate(liked = user_liked_post, rated_by = request.user, rated_post = post)

        post_rating.save()

        data = {
            'total_likes': PostRate.objects.filter(liked = True, rated_post = post).count(), 
            'total_dislikes': PostRate.objects.filter(liked = False, rated_post = post).count()
        }
        return JsonResponse(data)


@permission_classes([IsAuthenticated])
def follow(request, pk):
    # user_id = request.user.pk
    user = get_object_or_404(User, pk= pk)
    if user != request.user:
        already_followed = Follower.objects.filter(user=user, is_followed_by=request.user).first()
        if not already_followed:
            new_follower = Follower(user=user, is_followed_by=request.user)
            new_follower.save()
            follower_count = Follower.objects.filter(user=user).count()
            return JsonResponse({'status':'Following', 'count':follower_count})
        else:
            already_followed.delete()
            follower_count = Follower.objects.filter(user=user).count()
            return JsonResponse({'status':'Not following', 'count':follower_count})
        return redirect('/')
    raise ValidationError("One Cannot follow themselves")


class Following(generics.ListCreateAPIView):
    serializer_class = FollowerSerializer
    permission_classes = [IsAuthenticated, ]

    # def get_following(self, request, pk=None):
    #     import pdb; pdb.set_trace()
    #     user = User.objects.get( pk =  request.user.pk)
    #     return Follower.objects.filter(is_followed_by = user)
    def get_queryset(self):
        user = get_object_or_404(User, pk = self.kwargs["pk"])
        return Follower.objects.filter(user = user).exclude(is_followed_by = user)

class CommentViewSet(viewsets.ModelViewSet):
    serializer_class = CommentSerializer
    queryset = Comment.objects.all()
    # lookup_fields = ['user', ]
    permission_classes_by_action = {
        'partial_update': [IsInstanceUser],
        'destroy': [IsInstanceUser],
        'update': [IsInstanceUser],
        # 'get_user_profile': [IsInstanceUser]
    }
    
    def get_permissions(self):
        try:
            return [permission() for permission in self.permission_classes_by_action[self.action]]
        except KeyError:
            return (permissions.IsAuthenticated(),)

class Followers(generics.ListCreateAPIView):
    queryset = Follower.objects.all()
    serializer_class = FollowerSerializer
    permission_classes = [ IsAuthenticated, ]
    
    def get_queryset(self):
        user = get_object_or_404(User, pk = self.kwargs["pk"])
        return Follower.objects.filter(is_followed_by = user)
    
    # def follower(self, request, pk=None):
        # import pdb; pdb.set_trace()
        # user = User.objects.get(pk= request.user.pk)
        # return Follower.objects.filter(user = user).exclude(is_followed_by = user)