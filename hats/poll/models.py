from django.db import models

# Create your models here.
class LocationVO(models.Model):
    closet_name = models.CharField(max_length=200)
    section_number = models.CharField(max_length=200)
    shelf_number = models.CharField(max_length=200)
    import_href = models.CharField(max_length=200, unique=True)
 

