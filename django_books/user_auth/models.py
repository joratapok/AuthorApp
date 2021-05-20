from django.contrib.auth.models import User
from django.db import models


def file_size(value):
    limit = 2 * 1024 * 1024
    if value.size > limit:
        raise ValidationError('Размер файла не должен превышать 2 mb')


class Profile(models.Model):
    master = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
    photo = models.ImageField('Аватар', upload_to='profile', blank=True, validators=[file_size])

    def __str__(self):
        return f'Profile for user {self.master.username}'

    class Meta:
        verbose_name = 'Аватар'
