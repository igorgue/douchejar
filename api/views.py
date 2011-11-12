import json

from django.http import HttpResponse

def latest(request):
    """Get the latest douchey comments."""
    data = {'message': "change me!"}
    return HttpResponse("{'message': ")
