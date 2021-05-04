from rest_framework import serializers
from bookstore import settings
from store.models import Book, UserBookRelation, Comments, Profile, Chapters, Genre
from django.contrib.auth.models import User
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password
from drf_recaptcha.fields import ReCaptchaV2Field


class AllBooksSerializer(serializers.ModelSerializer):
    rated_books = serializers.DecimalField(max_digits=3, decimal_places=2, read_only=True)
    genre = serializers.SlugRelatedField(slug_field='name', read_only=True, many=True)

    class Meta:
        model = Book
        fields = ('id', 'name', 'mini_poster', 'rated_books', 'book_file', 'genre')


class BookSerializer(serializers.ModelSerializer):
    rated_books = serializers.DecimalField(max_digits=2, decimal_places=1, read_only=True)
    current_rate = serializers.SerializerMethodField()
    count_rate = serializers.SerializerMethodField()
    

    class Meta:
        model = Book
        fields = ('id', 'name', 'poster', 'rated_books', 'current_rate', 'count_rate', 'book_file', 'genre', 'description')

    def get_count_rate(self, instance):
        return UserBookRelation.objects.filter(book=instance).count()

    def get_current_rate(self, instance):
        user = None
        request = self.context.get("request")
        if request and hasattr(request, "user"):
            user = request.user
            current_rate = UserBookRelation.objects.filter(book=instance, user=user.id).values_list('rate', flat=True)
            if len(current_rate) > 0:
                return current_rate[0]
        else:
            return 0


class ChaptersSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Chapters
        fields = '__all__'


class UserBookRelationSerializer(serializers.ModelSerializer):
    avg_rate = serializers.SerializerMethodField()

    class Meta:
        model = UserBookRelation
        fields = ('book', 'rate', 'avg_rate')

    def get_avg_rate(self, instance):
        list_rate = UserBookRelation.objects.filter(book=instance.book.id).values_list('rate', flat=True)
        avg_rate = round(sum(list_rate) / len(list_rate), 1)
        return {'avg_rate': avg_rate, 'count_rate': len(list_rate)}


class CommentsSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    avatar = serializers.SerializerMethodField()    

    class Meta:
        model = Comments
        fields = ('id', 'text', 'owner', 'book', 'avatar')

    def get_avatar(self, instance):
        request = self.context.get("request")
        host = request.META["HTTP_HOST"]
        list_avatar = Profile.objects.filter(master=instance.owner.id).values_list('photo', flat=True)
        if len(list_avatar) > 0 and list_avatar[0] != '':
                return request.scheme + "://" + host + '%s%s' % (settings.MEDIA_URL, list_avatar[0])
        return ''
        

class ProfileSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Profile
        fields = '__all__'



class RegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
            required=True,
            validators=[UniqueValidator(queryset=User.objects.all())]
            )

    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)
    recaptcha = ReCaptchaV2Field()

    class Meta:
        model = User
        fields = ('username', 'password', 'password2', 'email', 'recaptcha')
        extra_kwargs = {
            'username': {'required': True},
        }

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})

        return attrs

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
        )
        user.set_password(validated_data['password'])
        user.save()

        return user