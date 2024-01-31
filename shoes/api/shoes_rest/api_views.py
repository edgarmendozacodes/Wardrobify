from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json

from common.json import ModelEncoder
from .models import BinVO, Shoe


# Create your views here.
class BinVODetailEncoder(ModelEncoder):
    model = BinVO
    properties = [
        "bin_number",
        "import_href",
    ]

class ShoeListEncoder(ModelEncoder):
    model = Shoe
    properties = [
        "id",
        "manufacturer",
        "model_name",
        "color",
        "bin",
    ]
    encoders = {
        "bin": BinVODetailEncoder(),
    }


class ShoeDetailEncoder(ModelEncoder):
    model = Shoe
    properties = [
        "id",
        "manufacturer",
        "model_name",
        "color",
        "picture_url",
        "bin",
    ]
    encoders = {
        "bin": BinVODetailEncoder(),
    }


@require_http_methods(["GET", "POST"])
def api_list_shoes(request):
    if request.method == "GET":
        shoes = Shoe.objects.all()
        return JsonResponse(
            {"shoes": shoes},
            encoder=ShoeListEncoder,
        )
    else:
        content = json.loads(request.body)
        try:
            bin_href = content["bin"]
            bin = BinVO.objects.get(import_href = bin_href)
            content["bin"] = bin
        except BinVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid bin id"},
                status=400,
            )

        shoe = Shoe.objects.create(**content)
        return JsonResponse(
            shoe,
            encoder=ShoeDetailEncoder,
            safe=False,
        )

@require_http_methods(["GET", "DELETE"])
def api_delete_shoes(request, id):
    if request.method == "GET":
        shoe = Shoe.objects.get(id=id)
        return JsonResponse(
            shoe,
            encoder=ShoeDetailEncoder,
            safe=False,
        )
    else:
        count, _ = Shoe.objects.filter(id=id).delete()
        return JsonResponse({"deleted": count > 0})
