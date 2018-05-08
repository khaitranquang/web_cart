from rest_framework.views import APIView
from rest_framework import generics
from rest_framework import viewsets
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



# Update model
# https://docs.djangoproject.com/en/1.9/topics/db/queries/#updating-multiple-objects-at-once
class OrderListView (viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

#     def get_permissions(self):
#         if self.action == 'list':
#             self.permission_classes = [IsSuperUser, ]
#         elif self.action == 'retrieve':
#             self.permission_classes = [IsUser]
#         return super(self.__class__, self).get_permissions()

# class IsSuperUser(BasePermission):

#     def has_permission(self, request, view):
#         return request.user and request.user.is_superuser

# class IsUser(permissions.BasePermission):

#     def has_object_permission(self, request, view, obj):
#         if request.user:
#             if request.user.is_superuser:
#                 return True
#             else:
#                 return obj == request.user
#         else:
#             return False

class OrderDetailView (generics.RetrieveUpdateAPIView):
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
