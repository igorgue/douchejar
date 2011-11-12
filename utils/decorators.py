from django.http import HttpResponse
from django.utils.decorators import available_attrs

from functools import wraps

import json

def as_json():
    """
    Decorates a dictionary to json with headers
    """
    def decorator(view_func):
        def _wrapped_view(request, *args, **kwargs):
            return HttpResponse(
                json.dumps(view_func(request, *args, **kwargs)),
                content_type='application/json;charset=UTF-8'
            )
        
        return wraps(view_func, assigned=available_attrs(view_func))(_wrapped_view)
    
    return decorator