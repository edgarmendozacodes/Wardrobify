import django
import os
import sys
import time
import json
import requests

sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "hats_project.settings")
django.setup()

#from hats_rest.models import Something
from hats_rest.models import LocationVO

def get_locations():
    url = ("http://wardrobe-api:8100/api/locations/")
    response=requests.get(url)
    content = json.loads(response.content)
    for location in content["locations"]:
        LocationVO.objects.update_or_create(
            # bare minimum is href
            # wardrobe api dropdown
            import_href=location["href"],
            defaults={
                "closet_name": location["closet_name"],
                "section_number":location["section_number"],
                "shelf_number":location["shelf_number"],
            }
        )
        print(response.status_code)

def poll():
    while True:
        print('Hats poller polling for data')
        try:
            get_locations()
            # res = reqeusts.get('')
            # content = res.json()    
        except Exception as e:
            print(e, file=sys.stderr)
        time.sleep(60)


if __name__ == "__main__":
    poll()
