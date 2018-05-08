from pyArango.connection import Connection
import config

conn = Connection(username=config.db_user, password=config.db_password)


