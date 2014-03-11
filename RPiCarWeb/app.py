from flask import Flask

from views import RPiCarWeb

def create_app() :
    app = Flask(__name__)
    app.config.from_object('RPiCarWeb.config.DevConfig')
    configureBlueprint(app)
    return app

def configureBlueprint(app) :
    app.register_blueprint(RPiCarWeb)
