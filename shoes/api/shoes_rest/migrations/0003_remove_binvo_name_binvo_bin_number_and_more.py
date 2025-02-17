# Generated by Django 4.0.3 on 2024-01-31 18:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shoes_rest', '0002_remove_binvo_bin_number_remove_binvo_bin_size_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='binvo',
            name='name',
        ),
        migrations.AddField(
            model_name='binvo',
            name='bin_number',
            field=models.PositiveSmallIntegerField(null=True),
        ),
        migrations.AlterField(
            model_name='binvo',
            name='import_href',
            field=models.CharField(max_length=200, unique=True),
        ),
        migrations.AlterField(
            model_name='shoe',
            name='model_name',
            field=models.CharField(max_length=200, null=True),
        ),
    ]
