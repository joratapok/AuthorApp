from rest_framework import serializers
from store.models import Book, UserBookRelation, Comments


class AllBooksSerializer(serializers.ModelSerializer):
    rated_books = serializers.DecimalField(max_digits=3, decimal_places=2, read_only=True)
    
    class Meta:
        model = Book
        fields = ('id', 'name', 'poster', 'rated_books',) 


class BookSerializer(serializers.ModelSerializer):
    rated_books = serializers.DecimalField(max_digits=3, decimal_places=2, read_only=True)
    current_rate = serializers.SerializerMethodField()

    class Meta:
        model = Book
        fields = ('id', 'name', 'poster', 'rated_books', 'current_rate')  # '__all__'

    def get_current_rate(self, instance):
        user = None
        request = self.context.get("request")
        if request and hasattr(request, "user"):
            user = request.user
            current_rate = UserBookRelation.objects.filter(book=instance, user=user.id).values_list('rate', flat=True)
            return current_rate
        else:
            return None


class UserBookRelationSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserBookRelation
        fields = ('book', 'rate')


class CommentsSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')

    class Meta:
        model = Comments
        fields = ('text', 'owner', 'book')
