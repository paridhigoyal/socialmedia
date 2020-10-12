from django.contrib.auth.models import User
from requests.models import Response
from rest_framework import mixins, permissions, status, viewsets
from rest_framework.decorators import action
from rest_framework.filters import SearchFilter
from rest_framework.permissions import IsAuthenticated
from .models import Profile
from .permissions import IsInstanceUser
from .serializers import ProfileSerializer


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
