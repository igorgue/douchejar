from django.http import HttpResponse
from django.shortcuts import render_to_response
from django.template import RequestContext

def home(request):
    """Home page, just render the main template"""
    context = RequestContext(request, {})
    return render_to_response("home.html", context)

# Push state stuff
def comment(request, comment_id):
    return HttpResponse("")
