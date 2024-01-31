import django
import os
import sys
import time
import json
import requests

sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "shoes_project.settings")
django.setup()

# Import models from shoes_rest, here.
# from shoes_rest.models import Something
from shoes_rest.models import BinVO

def get_bins():
    response = requests.get("http://wardrobe-api:8000/api/bins/")
    #requests library to send a GET request to API, stores in response variable
    content = json.loads(response.content)
    # json.loads converts json content into dictionary
    # response.content -> raw binary content
    for bin in content["bins"]:
        BinVO.objects.update_or_create(
            import_href=bin["href"],
            defaults={
                "bin_number": bin["bin_number"],
            }
        )

def poll():
    while True:
        print('Shoes poller polling for data')
        try:
            get_bins()
        except Exception as e:
            print(e, file=sys.stderr)
        time.sleep(60)


if __name__ == "__main__":
    poll()
