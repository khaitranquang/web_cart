# Generated by Django 2.0.5 on 2018-05-08 04:37

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Book',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('price', models.FloatField(default=0)),
                ('quantity', models.PositiveIntegerField(default=0)),
                ('image', models.CharField(default='', max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='Order',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('order_id', models.CharField(max_length=255)),
                ('is_submit', models.BooleanField(default=False)),
                ('total_money', models.FloatField(default=0)),
                ('list_books', models.ManyToManyField(to='cart.Book')),
            ],
        ),
    ]