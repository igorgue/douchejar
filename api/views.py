import json

from django.http import HttpResponse

def latest(request):
    """Get the latest douchey comments."""
    data = [
        {'comment': "change me!"}
    ]
    return HttpResponse(json.dumps(data), mimetype="application/json")
