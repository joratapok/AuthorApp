from django.contrib import admin
from django.contrib.admin import ModelAdmin

from store.models import Book, Genre, UserBookRelation, Comments, Profile, Chapters
from django import forms
from django.contrib import admin
from ckeditor.widgets import CKEditorWidget




class ChaptersAdminForm(forms.ModelForm):
    chapter = forms.CharField(widget=CKEditorWidget())
    class Meta:
        model = Chapters
        fields = '__all__'



@admin.register(Book)
class BookAdmin(ModelAdmin):
    pass


@admin.register(Genre)
class GenreAdmin(ModelAdmin):
    pass


@admin.register(UserBookRelation)
class UserBookRelationAdmin(ModelAdmin):
    pass


@admin.register(Comments)
class CommentsAdmin(ModelAdmin):
    pass

@admin.register(Profile)
class ProfileAdmin(ModelAdmin):
    pass


@admin.register(Chapters)
class ChaptersAdmin(ModelAdmin):
    form = ChaptersAdminForm