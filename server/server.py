#!/usr/bin/env python2

import os
import socketio
import eventlet
import eventlet.wsgi
import random
from copy import deepcopy
from datetime import datetime
from collections import defaultdict
from string import ascii_lowercase as alphabet
from flask import Flask, render_template, jsonify, request, send_from_directory

sio = socketio.Server()
flask_app = Flask(__name__)

GAME_STARTED = False

# { sid: str -> table number: int }
CLIENTS = {}
# { table number: int -> { puzzle number: str -> { solved: str -> bool } } }
GAME_STATE = {}
INITIAL_GAME_STATE_FOR_TABLE = {
  '1': {'solved': False, 'started': False, 'hint_count' : 0},
  '2': {'solved': False, 'started': False, 'hint_count' : 0},
  '3': {'solved': False, 'started': False, 'hint_count' : 0},
  '4': {'solved': False, 'started': False, 'hint_count' : 0},
  '5': {'solved': False, 'started': False, 'hint_count' : 0},
  '6': {'solved': False, 'started': False, 'hint_count' : 0},
  '7': {'solved': False, 'started': False, 'hint_count' : 0},
  '8': {'solved': False, 'started': False, 'hint_count' : 0},
  'A': {'solved': False},
  'B': {'solved': False},
}
ANSWERS = {
  'A': [0, 1, 2],
  'B': [0, 1, 2],
  '1': 'getaway',
  '2': 'see o double you',
  '3': [5,4,3,2,1],
  '4': [False, False, True, True, False, False, False, False, True, False],
  '5': '',
  '6': '',
  '7': [False, True, True, False, False, True, True, False, False, True],
  '8': '',
}
START_CRITERIA = {
  '1': 'Ryan',
  '2': 'Kristi',
  '3': 'Erica',
  '4': 'Tim',
  '5': 'Helena',
  '6': 'MaryAnn',
  '7': 'Ryan',
  '8': 'Jay',
}

def game_complete(table):
  state = GAME_STATE[table]
  required = ['1', '2', '3', '4', '5', '6', '7', '8'];
  return all([state[puzzle]['solved'] for puzzle in required])

def send_game_state(table=None, sid=None):
  if sid:
    table = CLIENTS[sid]
  sio.emit('game_state_update', GAME_STATE[table], room=(sid or table))

def send_redirect(table, redirect_code):
  sio.emit('redirect', redirect_code, room=table)

### Only for development use ###
@flask_app.route('/')
def index():
  root_dir = os.getcwd()
  return send_from_directory(os.path.join(root_dir, 'frontend'), 'thehunt.html')

@flask_app.route('/<path:path>')
def static_files(path):
  root_dir = os.getcwd()
  return send_from_directory(os.path.join(root_dir, 'frontend'), path)

@flask_app.route('/admin')
def admin():
  root_dir = os.getcwd()
  return send_from_directory(os.path.join(root_dir, 'frontend'), 'huntadmin.html')

### Only for development use ###

@sio.on('connect')
def connect(sid, environ):
  print("connect ", sid)

@sio.on('hint_shown')
def handle_hint(sid, data):
  puzzle = data['puzzle']
  table = CLIENTS[sid]
  GAME_STATE[table][puzzle]['hint_count'] += 1

@sio.on('load_admin_data')
def adminconnect(sid, data):
  print('admin ping was triggered', data['trigger'])
  trigger = data['trigger']
  if trigger == 'load':
    table_data = defaultdict(list)
    puzzle_data = defaultdict(dict)

    for table in GAME_STATE:
      data = GAME_STATE[table]
      print(table)
      print(data)
      for puzzle in data:
        info = data[puzzle]
        puzzle_data[puzzle][table] = info

    data_to_send = {'puzzleData' : puzzle_data, 'gameStarted': GAME_STARTED}
    sio.emit('admin_data', data_to_send)
  elif trigger == 'start_game':
    global GAME_STARTED
    print('Game has been started: ', GAME_STARTED)
    GAME_STARTED = True
    print('Game has been started: ', GAME_STARTED) 
    data_to_send = {'gameStarted': GAME_STARTED}
    sio.emit('game_started', data_to_send)
  elif trigger == 'stop_game':
    global GAME_STARTED
    print('Game has been started: ', GAME_STARTED)
    GAME_STARTED = False
    print('Game has been started: ', GAME_STARTED) 
    data_to_send = {'gameStarted': GAME_STARTED}
    sio.emit('game_started', data_to_send)

@sio.on('game_started')
def game_start(sid, data):
  data_to_send = {'gameStarted': GAME_STARTED}
  sio.emit('game_started', data_to_send)

@sio.on('cipher_ping')
def cipherconnect(sid, environ):
  table = CLIENTS[sid]
  message = ANSWERS['1']
  cipher = encrypt(message, table)
  sio.emit('cipher_return', cipher)

def encrypt(message, shift):
  output = ''
  for c in message:
    index = alphabet.find(c)
    if index < 0:
      output += ' '
    else:
      new_index = (index + shift) % len(alphabet)
      new_character = alphabet[new_index]
      output += new_character
  return output

@sio.on('join')
def join(sid, data):
  print("join", data, sid)
  table = int(data['table'])
  CLIENTS[sid] = table
  sio.enter_room(sid, table)
  if table in GAME_STATE:
    # broadcast that someone has joined to everyone except this person
    sio.emit('player_joined', {}, room=table, skip_sid=sid)
  else:
    # this is the first person to join this table
    GAME_STATE[table] = deepcopy(INITIAL_GAME_STATE_FOR_TABLE)
    GAME_STATE[table]['start_time'] = datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%SZ')
  send_game_state(sid=sid)
  print GAME_STATE

@sio.on('submit')
def submit(sid, data):
  print("answer", sid, data)
  puzzle, answer = [data.get(key) for key in ['puzzle', 'answer']]
  # TODO: error gracefully if no puzzle or answer
  correct = answer == ANSWERS.get(str(puzzle))

  response = {
    'correct': correct,
  }
  sio.emit('submit_response', response, room=sid)
  if correct:
    table = CLIENTS[sid]
    GAME_STATE[table][str(puzzle)]['solved'] = True
    send_game_state(table=table)

    if game_complete(table):
      GAME_STATE[table]['end_time'] = datetime.now().isoformat()
      send_game_state(table=table)
      send_redirect(table, 'FINISH')

@sio.on('person_visit')
def person_visit(sid, data):
  print("person_visit", sid, data)
  table = CLIENTS[sid]
  game_state = GAME_STATE[table]
  name = data['name']

  for puzzle in game_state:
    if START_CRITERIA.get(puzzle) == name and not game_state[puzzle]['started'] and not game_state[puzzle]['solved']:
      if puzzle == '1' or game_state[str(int(puzzle) - 1)]['solved']:
        game_state[puzzle]['started'] = True
        send_game_state(table=table)
        return

@sio.on('disconnect')
def disconnect(sid):
  print('disconnect ', sid)
  if sid in CLIENTS:
    # Delete from our clients
    table = CLIENTS.pop(sid)

    # broadcast that someone left
    sio.emit('player_left', {}, room=table)

if __name__ == '__main__':
  app = socketio.WSGIApp(sio, flask_app)
  eventlet.wsgi.server(eventlet.listen(('', 8000)), app)
