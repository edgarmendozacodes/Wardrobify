# Generated by Django 4.0.3 on 2024-01-31 19:05

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='LocationVO',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('closet_name', models.CharField(max_length=200)),
                ('section_number', models.CharField(max_length=200)),
                ('shelf_number', models.CharField(max_length=200)),
                ('import_href', models.CharField(max_length=200, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='Hat',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fabric', models.CharField(max_length=200)),
                ('style_name', models.CharField(max_length=200)),
                ('color', models.CharField(max_length=200)),
                ('picture_url', models.URLField(null=True)),
                ('location', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='location', to='hats_rest.locationvo')),
            ],
        ),
    ]
