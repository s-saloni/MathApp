## added by Saloni
from django.urls import path, re_path
from . import views 
# or use from .views import func_name(s) or *

urlpatterns = [
    # blank path: go to home page
    path('', views.index), 
    path('game', views.game), # for all query strings after path
    path('error', views.error),
    # if path != '/game': send to 404 page
    #   note: this also matches the path '', but this is already checked in first path
    re_path(r'(?!.*game).*', views.error),
]