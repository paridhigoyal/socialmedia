from django.contrib.auth.models import User
from django.db import models
from django_currentuser.db.models import CurrentUserField
from django_currentuser.middleware import get_current_authenticated_user


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    GENDER_CHOICES = (
        ('F', 'Female',),
        ('M', 'Male',),
    )
    gender = models.CharField(max_length=1,
                              choices=GENDER_CHOICES,)
    date_of_birth = models.DateField()
    contact_no = models.CharField(max_length=10)
    bio = models.CharField(max_length=100, null=True, blank=True)
    location = models.CharField(max_length=100, null=True, blank=True)
    profile_picture = models.ImageField(upload_to="profile-pictures",
                                        null=True, blank=True)

    def get_user_id(self):
        return self.user.pk

    def get_username(self):
        return self.user.username

    def get_first_name(self):
        return self.user.first_name

    def get_last_name(self):
        return self.user.last_name

    def get_follow_status(self):
        follow_status = Follower.objects.filter(user=self.user,
                                                is_followed_by=get_current_authenticated_user())
        return "Following" if follow_status else "Follow"

    def get_followers_count(self):
        return Follower.objects.filter(
            user=self.user).exclude(is_followed_by=self.user).count()

    def get_following_count(self):
        return Follower.objects.filter(is_followed_by=self.user).count()

    def get_profile_belongs_to_authenticated_user(self):
        return self.user == get_current_authenticated_user()

    def __str__(self):
        return str(self.user)


class Post(models.Model):
    caption = models.CharField(max_length=200, verbose_name='caption')
    post_by = CurrentUserField(related_name='post_by')
    image = models.ImageField(upload_to='post-images', null=True)
    posted_at = models.DateTimeField(auto_now_add=True)

    def get_post_belongs_to_authenticated_user(self):
        return self.post_by.pk == get_current_authenticated_user().pk

    def get_user(self):
        user_dict = vars(self.post_by)
        return {"id": user_dict["id"], "username": user_dict["username"]}

    def __str__(self):
        return str(self.id)


class Follower(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='user')
    is_followed_by = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='is_followed_by')

    def get_user_info(self):
        user_dict = vars(self.user)
        return {"id": user_dict["id"], "username": user_dict["username"]}

    def get_is_followed_by_info(self):
        user_dict = vars(self.is_followed_by)
        return {"id": user_dict["id"], "username": user_dict["username"]}

    def get_following(self, user):
        return Follower.objects.filter(is_followed_by=user)

    def get_followers(self, user):
        return Follower.objects.filter(user=user).exclude(is_followed_by=user)

    def get_following_count(self, user):
        return Follower.objects.filter(is_followed_by=user).count()

    def get_followers_count(self, user):
        return Follower.objects.filter(user=user).count()

    def __str__(self):
        return str(self.id)


class Comment(models.Model):
    content = models.TextField()
    commented_post = models.ForeignKey(
        Post, on_delete=models.CASCADE, related_name='comments')
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='comments')
    commented_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.id)


class PostRate(models.Model):
    liked = models.BooleanField(null=True)
    rated_post = models.ForeignKey(
        Post, on_delete=models.CASCADE, related_name='likes')
    rated_by = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='likes')

    def __str__(self):
        return str(self.rated_post)
