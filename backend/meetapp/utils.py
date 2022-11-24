from django.conf import settings

import time
import MySQLdb as mdb
import datetime


def get_unix_time():
    n = datetime.datetime.now()
    unix_time = time.mktime(n.timetuple())
    return int(unix_time)


def get_connection():
    db = settings.DATABASES['default']
    con = mdb.connect(db['HOST'],
                      db['USER'],
                      db['PASSWORD'],
                      db['NAME'],
                      charset='utf8')
    return con

def query(sql, args):
    query, values = sql, args
    conn = get_connection()
    cur = conn.cursor(mdb.cursors.DictCursor)
    cur.execute(query, values)
    rows = cur.fetchall()
    return list(rows)

def execute_query(query, values):
    try:
        conn = get_connection()
        cur = conn.cursor(mdb.cursors.DictCursor)
        cur.execute(query, values)
        conn.commit()
    except Exception as err:
        print(err, "HEREREREREER")
        return False
    finally:
        cur.close()
        conn.close()
    return True

def mandatory_keyval_empty_check(data, keys):
    """
    This function is used check whether all mandatory fields are empty or not..
    """
    for key in keys:
        if key not in data:
            return [False, key]
        elif data[key] == "":
            return [False, key]
    return [True, True]