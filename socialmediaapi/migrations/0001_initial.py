# Generated by Django 2.2.16 on 2020-10-15 12:27

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django_currentuser.db.models.fields
import django_currentuser.middleware


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Post',
            fields=[
                ('id', models.AutoField(auto_created=True,
                                        primary_key=True, serialize=False, verbose_name='ID')),
                ('caption', models.CharField(max_length=200, verbose_name='caption')),
                ('image', models.ImageField(null=True, upload_to='post-images')),
                ('posted_at', models.DateTimeField(auto_now_add=True)),
                ('post_by', django_currentuser.db.models.fields.CurrentUserField(default=django_currentuser.middleware.get_current_authenticated_user,
                                                                                 null=True, on_delete=django.db.models.deletion.CASCADE, related_name='post_by', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Profile',
            fields=[
                ('id', models.AutoField(auto_created=True,
                                        primary_key=True, serialize=False, verbose_name='ID')),
                ('gender', models.CharField(choices=[
                 ('F', 'Female'), ('M', 'Male')], max_length=1)),
                ('date_of_birth', models.DateField()),
                ('contact_no', models.CharField(max_length=10)),
                ('bio', models.CharField(blank=True, max_length=100, null=True)),
                ('location', models.CharField(blank=True, max_length=100, null=True)),
                ('profile_picture', models.ImageField(
                    blank=True, null=True, upload_to='profile-pictures')),
                ('user', models.OneToOneField(
                    on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='PostRate',
            fields=[
                ('id', models.AutoField(auto_created=True,
                                        primary_key=True, serialize=False, verbose_name='ID')),
                ('liked', models.BooleanField(null=True)),
                ('rated_by', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE,
                                               related_name='likes', to=settings.AUTH_USER_MODEL)),
                ('rated_post', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE,
                                                 related_name='likes', to='socialmediaapi.Post')),
            ],
        ),
        migrations.CreateModel(
            name='Follower',
            fields=[
                ('id', models.AutoField(auto_created=True,
                                        primary_key=True, serialize=False, verbose_name='ID')),
                ('is_followed_by', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE,
                                                     related_name='is_followed_by', to=settings.AUTH_USER_MODEL)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE,
                                           related_name='user', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.AutoField(auto_created=True,
                                        primary_key=True, serialize=False, verbose_name='ID')),
                ('content', models.TextField()),
                ('commented_at', models.DateTimeField(auto_now_add=True)),
                ('commented_post', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE,
                                                     related_name='comments', to='socialmediaapi.Post')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE,
                                           related_name='comments', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
