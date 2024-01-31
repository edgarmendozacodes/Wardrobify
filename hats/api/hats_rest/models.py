from django.db import models

# Create your models here.
class LocationVO(models.Model):
    import_href = models.CharField(max_length=200, unique=True)
    name = models.CharField(max_length=200)

class Hat(models.Model): 
    fabric = models.CharField(max_length=200)
    style_name = models.CharField(max_length=200)
    color = models.CharField(max_length=200)
    picture_url = models.URLField(null=True)

    location = models.ForeignKey(
        LocationVO, 
        related_name="location", #hats
        on_delete=models.CASCADE,
    )
