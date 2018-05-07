from rest_framework import serializers

from .models import Book, Order

class BookSerializer (serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ['name', 'price', 'quantity', 'image']
    
class OrderSerializer (serializers.ModelSerializer):
    class Meta:
        model = Order
        field = ['order_id', 'list_books', 'is_submit', 'total_money']
    
    # Hmmmm
    # def update(self, instance, validated_data):
    #     is_submit = validated_data.pop('is_submit')

    #     for (key, value) in validated_data.items():
    #         setattr(instance, key, value)

    #     if (is_submit == True):
    #         total_money = 0
    #         list_books = validated_data.pop('list_books')
    #         for book in list_books:
    #             total_money += book.price
            
    #         instance.total_money = total_money
        
    #     instance.save()
    # ---End Hmmmm