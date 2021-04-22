from rest_framework import serializers
from store.models import Book, UserBookRelation, Comments


class AllBooksSerializer(serializers.ModelSerializer):
    rated_books = serializers.DecimalField(max_digits=3, decimal_places=2, read_only=True)
    genre = serializers.CharField()

    class Meta:
        model = Book
        fields = ('id', 'name', 'poster', 'rated_books', 'book_file', 'genre')


class BookSerializer(serializers.ModelSerializer):
    rated_books = serializers.DecimalField(max_digits=2, decimal_places=1, read_only=True)
    current_rate = serializers.SerializerMethodField()
    count_rate = serializers.SerializerMethodField()

    class Meta:
        model = Book
        fields = ('id', 'name', 'poster', 'rated_books', 'current_rate', 'count_rate', 'book_file', 'genre')

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

    class Meta:
        model = Comments
        fields = ('id', 'text', 'owner', 'book')
