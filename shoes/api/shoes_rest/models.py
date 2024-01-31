from django.db import models

# Create your models here.
class BinVO(models.Model):
    import_href = models.CharField(max_length=200, unique=True)
    bin_number = models.PositiveSmallIntegerField(null=True)


class Shoe(models.Model):
    manufacturer = models.CharField(max_length=200)
    model_name = models.CharField(max_length=200, null=True)
    color = models.CharField(max_length=200)
    picture_url = models.URLField(null=True)

    bin = models.ForeignKey(
        BinVO,
        related_name="shoes",
        on_delete=models.CASCADE,
    )
    # def get_api_url(self):
    #     return reverse("api_show_shoes", kwargs={"pk": self.pk})
