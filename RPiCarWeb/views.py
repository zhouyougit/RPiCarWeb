#coding:utf-8

import os
import json

from flask import Blueprint, render_template, request, current_app, jsonify, redirect, url_for, g
from werkzeug import secure_filename

from RPiCar import Car

carPage = Blueprint('carPage', __name__, url_prefix = '/car')

@carPage.route('/')
def indexKey() :
    return render_template('index/key.html')

@carPage.route('/joystick')
def index() :
    return render_template('index/joystick.html')


@carPage.route('/run', methods=['POST', 'GET'])
def run() :
    car = Car.getCar()
    l = request.form.get('l', '0')
    r = request.form.get('r', '0')
    t = request.form.get('t', '0')
    if t == '0' :
        car.run(int(r), int(l))
    return 'OK'

@carPage.route('/run2', methods=['POST', 'GET'])
def run2() :
    car = Car.getCar()
    x = request.form.get('x', '0')
    y = request.form.get('y', '0')
    t = request.form.get('t', '0')
    if t == '0' :
        car.run2(int(x), int(y))
    return 'OK'
