from django.core.urlresolvers import reverse
from django.contrib import messages
from django.contrib.auth import authenticate, login
from django.contrib.auth.forms import AuthenticationForm
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render_to_response
from django.template import RequestContext

def home(request):
    """Home page, just render the main template"""
    if request.method == 'POST':
        login_form = AuthenticationForm(None, request.POST)

        if login_form.is_valid():
            username = login_form.cleaned_data['username']
            password = login_form.cleaned_data['password']

            # Auth
            user = authenticate(username=username, password=password)

            # Checking if it was successful
            if user is not None:
                # Active or not inactive for banned users
                if user.is_active:
                    login(request, user)

                    messages.success(request, "Welcome back {0}!".format(user.first_name or user.username))
                    return HttpResponseRedirect(reverse("home"))
                else:
                    messages.info(request, 'The user "{0}" is not active'.format(username))

                messages.error(request, "Incorrect login, check your username and password, we could not find your user.")
    else:
        login_form = AuthenticationForm(None)

    data = {
        'login_form': login_form
    }

    context = RequestContext(request, data)
    return render_to_response("home.html", context)

# Push state stuff
def comment(request, comment_id):
    # TODO Fix this actually render the comment.
    return HttpResponseRedirect(reverse("home"))
