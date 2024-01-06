from functools import wraps
from django.http import HttpResponseServerError

def require_login(view_func):
    @wraps(view_func)
    def wrapper(request, *args, **kwargs):
        if not request.user.is_authenticated:
            return HttpResponseServerError('Access Denied', status=500)
        return view_func(request, *args, **kwargs)
    return wrapper


