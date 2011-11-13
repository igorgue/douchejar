from django.http import HttpResponse
from django.utils import simplejson
from django.utils.decorators import available_attrs

from functools import wraps
from decimal import Decimal

import json


class JSONEncoder(simplejson.JSONEncoder):

    def default(self, obj):
        if hasattr(obj, 'isoformat'):
            return obj.isoformat()
        elif isinstance(obj, Decimal):
            return "%d" % obj

        return simplejson.JSONEncoder.default(self, obj)


def as_json(view):
    """
    Decorates a dictionary to json with headers
    """
    def decorator(view_func):
        def _wrapped_view(request, *args, **kwargs):
            response_raw = view_func(request, *args, **kwargs)

            if isinstance(response_raw, tuple):
                response_data, response = response_raw
            else:
                response_data = response_raw
                response = None

            if not response:
                response = HttpResponse

            if hasattr(response_data, "status_code"):
                return response_data()

            return response(
                json.dumps(response_data, cls=JSONEncoder),
                content_type='application/json;charset=UTF-8'
            )
        
        return wraps(view_func, assigned=available_attrs(view_func))(_wrapped_view)
    
    return decorator(view)