# Generated by Django 3.2 on 2021-04-11 16:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0005_book_readers'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userbookrelation',
            name='rate',
            field=models.PositiveSmallIntegerField(choices=[(1, 'Awful'), (2, 'Bad'), (3, 'Good'), (4, 'Amazing'), (5, 'Incredible')], null=True),
        ),
    ]