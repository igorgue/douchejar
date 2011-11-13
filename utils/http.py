from django.http import *

class HttpResponseNoContent(HttpResponse):
    status_code = 204