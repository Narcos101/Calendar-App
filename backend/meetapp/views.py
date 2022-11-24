from django.shortcuts import render
from django.conf import settings
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view,permission_classes
from django.shortcuts import render, redirect
from .forms import NewUserForm
from django.contrib.auth import login
from django.contrib import messages
from django.http import HttpResponse

from meetapp.utils import *
from meetapp.status_codes import STATUS_CODES as code


@api_view(['POST'])
def register_request(request):
    form = NewUserForm(request.data)
    if form.is_valid():
        user = form.save()
        login(request, user)
        messages.success(request, "Registration successful." )
        return Response({'val':"Data SuccessFully"})
    else:
        return Response({'val':"Data failed"})

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_event(request):
    try:
        uid = request.user.id
        data = request.data
    except Exception as err:
        print(err)
        response = {"status": code['failed'],
                    "comment": "Could not load body from request."}
        return Response(response)

    MANDATORY_FIELDS = ['title', 'description', 'start', 'end']
    field_status = mandatory_keyval_empty_check(data, MANDATORY_FIELDS)
    if not field_status[0]:
        response = {"status": code['failed'],
                    "comment": field_status[1]+" not given."}
        return Response(response)

    title = data['title']
    description = data['description']
    event_start_time = data['start']
    event_end_time = data['end']
    created_at = get_unix_time()
    updated_at = get_unix_time()

    insert_query = """INSERT INTO events (uid, title, description, event_start_time, event_end_time, created_at, updated_at) 
    VALUES (%s, %s, %s, %s, %s, %s, %s)
    """
    params = (uid, title, description,event_start_time, event_end_time, created_at, updated_at)
    print(params, "MEEEE")
    try:
        status = execute_query(insert_query, params)
        if status:
            response = {"status":code['success'],
                        "comment":"Event Inserted."}
            return Response(response)
    except Exception as err:
        print(err)
        response = {"status":code['failed'],
                    "comment":"Event could not be inserted. Query failed."}
        return Response(response)

@api_view(['GET','POST'])
@permission_classes([IsAuthenticated])
def get_monthly_events(request):

    try:
        uid = request.user.id
        data = request.data
    except Exception as err:
        print(err)
        response = {"status": code['failed'],
                    "comment": "Could not load body from request."}
        return Response(response)

    MANDATORY_FIELDS = ['month_start', 'month_end']
    field_status = mandatory_keyval_empty_check(data, MANDATORY_FIELDS)
    if not field_status[0]:
        response = {"status": code['failed'],
                    "comment": field_status[1]+" not given."}
        return Response(response)

    month_start = data['month_start']
    month_end = data['month_end']

    select_query = """SELECT event_start_time FROM events 
                    WHERE event_start_time >= %s AND event_start_time <= %s AND uid = %s
                    """
    params = (month_start, month_end, uid)
    try:
        queried_data = query(select_query, params)
        response = {"status":code['success'],
                    "data":queried_data}
        return Response(response)
    except Exception as err:
        print(err)
        response = {"status":code['failed'],
                    "comment":"Events could not be selected. Query failed."}
        return Response(response)

@api_view(['GET','POST'])
@permission_classes([IsAuthenticated])
def get_daily_events(request):

    try:
        uid = request.user.id
        data = request.data
    except Exception as err:
        print(err)
        response = {"status": code['failed'],
                    "comment": "Could not load body from request."}
        return Response(response)

    MANDATORY_FIELDS = ['day_start', 'day_end']
    field_status = mandatory_keyval_empty_check(data, MANDATORY_FIELDS)
    if not field_status[0]:
        response = {"status": code['failed'],
                    "comment": field_status[1]+" not given."}
        return Response(response)

    day_start = data['day_start']
    day_end = data['day_end']

    select_query = """SELECT eid, title, description, event_start_time, event_end_time FROM events 
                    WHERE event_start_time >= %s AND event_start_time <= %s AND uid = %s
                    """
    params = (day_start, day_end, uid)
    
    try:
        queried_data = query(select_query, params)
        response = {"status":code['success'],
                    "data":queried_data}
        return Response(response)
    except Exception as err:
        print(err)
        response = {"status":code['failed'],
                    "comment":"Events could not be selected. Query failed."}
        return Response(response)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def update_event(request):

    try:
        data = request.data
    except Exception as err:
        print(err)
        response = {"status": code['failed'],
                    "comment": "Could not load body from request."}
        return Response(response)

    MANDATORY_FIELDS = ['title', 'description', 'start', 'end', 'eid']
    field_status = mandatory_keyval_empty_check(data, MANDATORY_FIELDS)
    if not field_status[0]:
        response = {"status": code['failed'],
                    "comment": field_status[1]+" not given."}
        return Response(response)

    title = data['title']
    description = data['description']
    event_start_time = data['start']
    event_end_time = data['end']
    updated_at = get_unix_time()
    eid = str(data['eid'])

    update_query = """UPDATE events SET title=%s,description=%s,event_start_time=%s,
                    event_end_time=%s,updated_at=%s WHERE eid = %s"""

    params = (title, description, event_start_time, event_end_time, updated_at, eid)

    try:
        status = execute_query(update_query, params)
        if status:
            response = {"status":code['success'],
                        "comment":"Event Updated."}
            return Response(response)
    except Exception as err:
        print(err)
        response = {"status":code['failed'],
                    "comment":"Event could not be updated. Query failed."}
        return Response(response)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def remove_event(request):
   
    try:
        data = request.data
    except Exception as err:
        print(err)
        response = {"status": code['failed'],
                    "comment": "Could not load body from request."}
        return Response(response)
        
    MANDATORY_FIELDS = ['eid']
    field_status = mandatory_keyval_empty_check(data, MANDATORY_FIELDS)
    if not field_status[0]:
        response = {"status": code['failed'],
                    "comment": field_status[1]+" not given."}
        return Response(response)

    eid = str(data['eid'])
    delete_query = """DELETE FROM events WHERE eid = %s"""
    params = [eid]

    try:
        status = execute_query(delete_query, params)
        if status:
            response = {"status":code['success'],
                        "comment":"Event Deleted."}
            return Response(response)
        else:
            response = {"status":code['failed'],
                    "comment":"Event could not be updated. Query failed."}    
            return Response(response)
    except Exception as err:
        print(err)
        response = {"status":code['failed'],
                    "comment":"Event could not be updated. Query failed."}
        return Response(response)