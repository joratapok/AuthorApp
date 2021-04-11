from django.contrib.auth.models import User
from django.db import models


class Genre(models.Model):
    name = models.CharField('Имя', max_length=100)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Жанры'
        verbose_name_plural = 'Жанры'


class Book(models.Model):
    name = models.CharField('Название книги', max_length=255)
    price = models.DecimalField('Цена', max_digits=7, decimal_places=2)
    author_name = models.CharField('Автор', max_length=255, default='Дарья Урусова')
    poster = models.ImageField('Обложка', upload_to='book/')
    genre = models.ManyToManyField(Genre, verbose_name='жанры')
    readers = models.ManyToManyField(User, through='UserBookRelation')

    def __str__(self):
        return f'ID: {self.id} Name: {self.name}'


class UserBookRelation(models.Model):
    RATE_CHOICES = (
        (1, 'Awful'),
        (2, 'Bad'),
        (3, 'Good'),
        (4, 'Amazing'),
        (5, 'Incredible')
    )

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    rate = models.PositiveSmallIntegerField(choices=RATE_CHOICES, null=True)

    def __str__(self):
        return f'Book: {self.book.name} rate: {self.rate}'