# Generated by Django 2.2.16 on 2020-12-05 11:49

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('socialmediaapi', '0003_auto_20201110_1348'),
    ]

    operations = [
        migrations.CreateModel(
            name='CommentRate',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('liked', models.BooleanField(null=True)),
                ('rated_by', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='like', to=settings.AUTH_USER_MODEL)),
                ('rated_comment', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='like', to='socialmediaapi.Comment')),
            ],
        ),
    ]
