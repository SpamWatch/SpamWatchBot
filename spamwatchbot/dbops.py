import psycopg2 as ps2
from psycopg2.extensions import connection as ps2conn
from psycopg2.extensions import cursor as ps2cursor
import config

curdir = '/'.join(__file__.split('/')[:-1])


def runsql(sql: str, data: tuple = (), mogrify: bool = False) -> str:
    conn_string = f"""host='{config.db_host}'
                      dbname='{config.db_name}'
                      user='{config.db_user}' 
                      password='{config.db_password}' 
                      port='{config.db_port}'"""
    conn = ps2.connect(conn_string)  # type: ps2conn
    c = conn.cursor()  # type: ps2cursor
    if mogrify:
        return c.mogrify(sql, data)
    c.execute(sql, data)
    # result = c.mogrify(sql, data)
    try:
        result = c.fetchall()
    except ps2.ProgrammingError:
        result = None
    conn.commit()
    return result
