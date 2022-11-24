from django.contrib import admin
from django.urls import path,include
from .import views

urlpatterns = [
    path('register',views.register_request,name="register"),
    path('event',views.create_event,name="createEvent"),
    path('getmonthlyevents',views.get_monthly_events,name="get_monthly_events"),
    path('getdailyevents',views.get_daily_events,name="get_daily_events"),
    path('update',views.update_event,name="updateEvent"),
    path('remove',views.remove_event,name="removeEvent"),
]
