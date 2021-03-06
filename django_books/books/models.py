from django.contrib.auth.models import User
from django.db import models
from django.core.exceptions import ValidationError


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
    mini_poster = models.ImageField('Миниатюра-обложки', upload_to='book_mini/')
    genre = models.ManyToManyField(Genre, verbose_name='жанры')
    readers = models.ManyToManyField(User, through='UserBookRelation')
    book_file = models.FileField(upload_to='book_file', blank=True)
    description = models.CharField('Описание', max_length=2000, default='Описание')

    def __str__(self):
        return f'ID: {self.id} -- Книга: {self.name}'

    class Meta:
        verbose_name = 'Книга'
        verbose_name_plural = 'Книги'


class Chapters(models.Model):
    chapter = models.TextField('Глава', blank=True)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)

    def __str__(self):
        
        
        return f'Книга: {self.book.name} -- Глава: {self.chapter[:35]}...'

    class Meta:
        verbose_name = 'Глава'
        verbose_name_plural = 'Главы'


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
        return f'Книга: {self.book.name} -- Пользователь: {self.user.username} -- рейтинг: {self.rate}'

    class Meta:
        verbose_name = 'Рейтинг'
        verbose_name_plural = 'Рейтинги'


class Comments(models.Model):
    text = models.TextField('Комментарий', max_length=2048)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    book = models.ForeignKey(Book, on_delete=models.CASCADE, related_name='comments')

    def __str__(self):
        return f'Книга: {self.book.name} -- юзер: {self.owner.username}'

    class Meta:
        verbose_name = 'Комментарий'
        verbose_name_plural = 'Комментарии'


