from rest_framework.views import APIView
from rest_framework import generics
from rest_framework import viewsets
from rest_framework import status
from rest_framework.response import Response
from rest_framework import permissions

from .models import Book, Order
from .serializers import BookSerializer, OrderSerializer
from .permissions import IsAdminOrReadOnly

# Create your views here.
class BookListView (generics.ListCreateAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    permission_classes = (IsAdminOrReadOnly,)

class BookDetailView (generics.RetrieveUpdateDestroyAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    permission_classes = (IsAdminOrReadOnly, )

class OrderListView (viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

    def get_permissions(self):
        if self.action == 'list':
            self.permission_classes = (permissions.IsAdminUser, )
        elif self.action == 'create':
            self.permission_classes = (permissions.IsAuthenticated,)
        return super().get_permissions()

class OrderDetailView (generics.RetrieveUpdateAPIView):
    permission_classes = (permissions.IsAuthenticated, )
    serializer_class = OrderSerializer
    queryset = Order.objects.all()

    def update (self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        
        if serializer.is_valid():
            if (serializer.data['is_submit'] == True):
                list_books = serializer.data['list_books']
                for book_id in list_books:
                    book = Book.objects.get(id=book_id)
                    current_quantity = book.quantity
                    update_quantity = current_quantity - 1
                    book.quantity = update_quantity
                    book.save(update_fields=['quantity'])
            
            super(OrderDetailView, self).update(serializer, *args, **kwargs) 
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=400)
