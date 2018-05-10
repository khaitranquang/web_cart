from rest_framework import serializers

from .models import Book, Order

class BookSerializer (serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ['id','name', 'price', 'quantity', 'image']
    
class OrderSerializer (serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['id', 'order_id', 'list_books', 'is_submit', 'total_money']
