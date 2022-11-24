import datetime
import mysql.connector


t = datetime.datetime.now()
unix_timestamp = datetime.datetime.timestamp(t)

conn = mysql.connector.connect(host='localhost',database='devcalendar',user='root',password='admin')

cur = conn.cursor(prepared=True)
 
params = []

insert_query = """insert into events (uid, title, description, event_start_time, event_end_time, created_at, updated_at) 
VALUES (%s, %s, %s, %s, %s, %s, %s)
"""
uid = 10
params.append(uid)
title = "SOmehitng new"
params.append(title)
description = "test net new"
params.append(description)
time = "123456789"
params.append(time)
time = "123456789"
params.append(time)
time = "123456789"
params.append(time)
time = "123456789"
params.append(time)
params = (uid, title, description, time, time, time, time)
# creating database
cur.execute(insert_query, params)
conn.commit()



"""
SELECT ALL FROM events WHERE
"""