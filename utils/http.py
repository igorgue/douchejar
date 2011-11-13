from django.http import *

class HttpResponseNoContent(HttpResponse):
    status_code = 204

class HttpResponseUnauthorized(HttpResponse):
    status_code = 401