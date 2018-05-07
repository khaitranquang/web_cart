from django.db import models

# Create your models here.
class Book(models.Model):
    name = models.CharField(max_length=255)
    price = models.FloatField(default=0)
    quantity = models.PositiveIntegerField(default=0)
    image = models.CharField(default='', max_length=255)

class Order (models.Model):
    order_id = models.CharField(max_length=255, unique=True)
    list_books = models.ManyToManyField(Book)
    is_submit = models.BooleanField(default=False)
    total_money = models.FloatField(default=0)