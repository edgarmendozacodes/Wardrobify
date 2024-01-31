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

@require_http_methods(["GET", "DELETE", "PUT"])
def api_show_hats(request, pk):# pk is the primary key -> api/conferences/<pk>/
    #"GET"
    if request.method == "GET": 
        try:
            hat = Hat.objects.get(id=pk) # is 'hats' better for this code
            return JsonResponse(
                hat,
                encoder=HatDetailEncoder, #is this the right ENCODER for this ? 
                safe=False,
            )
        except Hat.DoesNotExist: # is the try/except necessary OR is an if/return okay?
            response = JsonResponse({"message": "Does not exist"})
            response.status_code=404
            return response
    # DELETE: Fearless-Frontend/Events/Api_Views Delete Method     
    elif request.method == "DELETE":
        count, _ = Hat.objects.filter(id=pk).delete()
        return JsonResponse({"deleted": count > 0})
    # PUT: Fearless-Frontend/Events/Api_Views Edit Method 
    else:
        content = json.loads(request.body)
        Hat.objects.filter(id=pk).update(**content)
        hat = Hat.objects.get(id=pk)
        return JsonResponse(
            hat,
            encoder = HatDetailEncoder,
            safe=False,
        )


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
        # except:
        #     return JsonResponse(
        #         {"message": "Not working ******"},
        #         status=400,
        #     )
        hat = Hat.objects.create(**content)
        return JsonResponse(
            hat,
            encoder=HatDetailEncoder,
            safe=False,
        )
