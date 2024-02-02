from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json

from common.json import ModelEncoder
from .models import BinVO, Shoe


class BinVOEncoder(ModelEncoder):
    model = BinVO
    properties = [
        "bin_number",
        "import_href",
    ]


class ShoeEncoder(ModelEncoder):
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
        "bin": BinVOEncoder(),
    }


@require_http_methods(["GET", "POST"])
def api_list_shoes(request):
    if request.method == "GET":
        shoes = Shoe.objects.all()
        return JsonResponse(
            {"shoes": shoes},
            encoder=ShoeEncoder,
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
            encoder=ShoeEncoder,
            safe=False,
        )


@require_http_methods(["DELETE"])
def api_delete_shoes(request, id=None):
    if request.method == "DELETE":
        count, _ = Shoe.objects.filter(id=id).delete()
        return JsonResponse({"deleted": count > 0})
