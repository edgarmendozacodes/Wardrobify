import json
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
from .models import Hat, LocationVO
from common.json import ModelEncoder


# Location VO Encoder from Location class in Wardrobe & .models/LocationVO
class LocationVOEncoder(ModelEncoder):
    model = LocationVO 
    properties = [
        "closet_name",
        "section_number",
        "shelf_number",
        "import_href", #got this from conference_go
        "id", # will probably require an id to move around insomnia
    ]

class HatListEncoder(ModelEncoder):
    model = Hat
    properties = [
        "fabric",
        "style_name", 
        "color",
        "picture_url", 
        "id",
    ]
    # D2: DIY JSON / using get_x_data: gets extra data & returns as a dictionary
    def get_extra_data(self, o):
        return {"location": o.location.closet_name}

class HatDetailEncoder(ModelEncoder):
    model = Hat
    properties = [
        "fabric",
        "style_name", 
        "color",
        "picture_url", 
        "id",
        "location",
    ]
    #ENCODER
    encoders = {
        "location": LocationVOEncoder(),
    }

@require_http_methods(["GET", "POST"])
def api_list_hats(request):
    # GET: Retrieves all instances of 'hat'
    # D2: DIY JSON Library Events/Views
    if request.method == "GET": 
        hat = Hat.objects.all()        
        return JsonResponse(
            {"hat": hat}, 
            encoder = HatListEncoder,
            safe=False,
        )
    # POST: 
    else:
        content = json.loads(request.body)
        # try:
        location_href = content["location"]
        location = LocationVO.objects.get(import_href=location_href)
        content["location"] = location
        # except LocationVO.DoesNotExist:
        #     return JsonResponse({"message": "Invalid location id"},
        #         status=400,
        #     )
        hat = Hat.objects.create(**content)
        return JsonResponse(hat, encoder=HatDetailEncoder, safe=False,)

@require_http_methods(["GET", "DELETE", "PUT"])
def api_show_hats(request, id):
    if request.method == "GET":
        hat = Hat.objects.get(id=id)
        return JsonResponse(
            hat, 
            encoder=HatDetailEncoder,
            safe=False,
        )

    elif request.method == "PUT":
        content=json.loads(request.body)
        try:
            if "location" in content: 
                location=LocationVO.objects.get(id=content["location"])
                content["location"]=location
        except LocationVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid Location"},
                status=400,
                )
    
    else: #DELETE
            delete, _ = Hat.objects.filter(id=id).delete()
            return JsonResponse({"Hat Deleted Successfully": delete > 0})
