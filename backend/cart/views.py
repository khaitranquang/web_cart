from rest_framework.views import APIView
from rest_framework import generics
from rest_framework import status
from rest_framework.response import Response

from .models import Book, Order
from .serializers import BookSerializer, OrderSerializer

# Create your views here.
class BookListView (generics.ListCreateAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    # Permission IsAdminOrReadOnly
    # https://stackoverflow.com/questions/37968770/django-rest-framework-permission-isadminorreadonly

class BookDetailView (generics.RetrieveUpdateDestroyAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    # Permission IsAdminOrReadOnly
    # https://stackoverflow.com/questions/37968770/django-rest-framework-permission-isadminorreadonly

