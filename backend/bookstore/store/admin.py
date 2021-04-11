from django.contrib import admin
from django.contrib.admin import ModelAdmin

from store.models import Book, Genre, UserBookRelation


@admin.register(Book)
class BookAdmin(ModelAdmin):
    pass


@admin.register(Genre)
class GenreAdmin(ModelAdmin):
    pass


@admin.register(UserBookRelation)
class UserBookRelationAdmin(ModelAdmin):
    pass