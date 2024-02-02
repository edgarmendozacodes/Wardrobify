from django.db import models
from django.urls import reverse

# Create your models here.
class LocationVO(models.Model):
    closet_name = models.CharField(max_length=200)
    section_number = models.CharField(max_length=200)
    shelf_number = models.CharField(max_length=200)
    import_href = models.CharField(max_length=200, unique=True)

    def __str__(self):
        return self.closet_name
 

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

    def get_api_url(self):
        return reverse("api_show_hat", kwargs={"id":self.pk})
    
    def __str__(self):
        return self.style_name
    
    # class Meta: 
    #     ordering = ("style_name", "location")
    #     #Default order for 
