
class Config(object) :
    DATA_PATH = ''
    pass

class DevConfig(Config) :
    DEBUG = True
    DATA_PATH = '/Users/zhou/android_workspace/GifMakerWeb/data'
    SQLALCHEMY_DATABASE_URI = 'mysql://gifmaker:123456@localhost:3306/gif_maker'
    SQLALCHEMY_ECHO = True

class ProdConfig(Config) :
    DEBUG = False
