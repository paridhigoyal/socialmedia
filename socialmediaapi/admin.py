from django.contrib import admin
from .models import Comment, Follower, Post, PostRate, Profile, TimeStampMixin

admin.site.register(TimeStampMixin)
admin.site.register(Post)
admin.site.register(Profile)
admin.site.register(Follower)
admin.site.register(PostRate)
admin.site.register(Comment)
