from django.contrib.auth.models import User
from requests.models import Response
from rest_framework import mixins, permissions, status, viewsets
from rest_framework.decorators import action
from rest_framework.filters import SearchFilter
from rest_framework.permissions import IsAuthenticated
from .models import Profile, Post
from .permissions import IsInstanceUser, IsPostOwner
from .serializers import ProfileSerializer, PostSerializer


class ProfileViewSet(mixins.ListModelMixin,  mixins.RetrieveModelMixin,
                     mixins.UpdateModelMixin, mixins.DestroyModelMixin,
                     viewsets.GenericViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated, ]
    lookup_fields = ['username', ]
    filter_backends = (SearchFilter,)
    search_fields = ['email', 'username', ]
    permission_classes_by_action = {
        'partial_update': [IsInstanceUser],
        'destroy': [IsInstanceUser],
        'update': [IsInstanceUser],
        'get_user_profile': [IsInstanceUser]
    }

    def get_permissions(self):
        try:
            return [permission() for permission in self.permission_classes_by_action[self.action]]
        except KeyError:
            return (permissions.IsAuthenticated(),)
    # import pdb; pdb.set_trace()

    @action(detail=False, methods=['GET'], url_path="profile/", url_name="profile")
    def get_user_profile(self, request, pk=None):
        # import pdb; pdb.set_trace()
        try:
            queryset = self.get_queryset().get(id=request.user.id)
            serializer = ProfileSerializer(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except(User.DoesNotExist):
            return Response({"error": 'The user does not exist'}, status=status.HTTP_204_NO_CONTENT)


class PostViewSet(viewsets.ModelViewSet):
    
    serializer_class = PostSerializer
    queryset = Post.objects.all()
    permission_classes_by_action = {
        'partial_update': [IsPostOwner],
        'destroy': [IsPostOwner],
        'update': [IsPostOwner],
    }
    # @action(detail=False, methods=['GET'], name='Get comments')
    # def list_comments(self, request, *args, **kwargs):
    #     queryset = Post.objects.filter(in_reply_to_post = self.kwargs["pk"])
    #     serializer = self.get_serializer(queryset)
    #     return Response(serializer.data)

    # def get_queryset(self):
    #     if self.action == 'list':
    #         return Post.objects.filter(in_reply_to_post = None).order_by('-posted_at')
    #     return Post.objects.order_by('-posted_at')

