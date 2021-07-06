from django.shortcuts import render

# Create your views here.

# Write all "end locations" on web server here
#   using slash for the urls for website

def index(request):
    # main home page
    return render(request, 'Arithmetic/index.html')


def game(request):
    # if dict of query key-value pairs is empty:
    #   e.g. url is /game (with no query params)
    if bool(request.GET) == False:
        # display error page
        return render(request, 'Arithmetic/404.html')
    else:
        return render(request, 'Arithmetic/game.html')


def error(request):
    #context = {}
    return render(request, 'Arithmetic/404.html')