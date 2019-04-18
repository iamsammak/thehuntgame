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

ANSWERS = {
  'A': [1, 2, 1],
  'B': [0, 2, 0],
  '1': 'getaway',
  '2': 'secret',
  '3': 'honeymoon',
  '4': [False, False, True, True, False, False, False, False, True, False],
  '5': 'devotion',
  '6': '',
  '7': [False, True, True, False, True, False, False, True, True, False],
  '8': '',
}
START_CRITERIA = {
  '1': 'ryan',
  '2': 'kristi',
  '3': 'erica',
  '4': 'tim',
  '5': 'helena',
  '6': 'maryann',
  '7': 'ryan',
  '8': 'jay',
}

### Data access ###
def get_table(sid):
  return CLIENTS[sid] if sid in CLIENTS else None

def remove_client(sid):
  if sid in CLIENTS:
    del CLIENTS[sid]

def set_table(sid, table):
  CLIENTS[sid] = table

def get_game_state(table):
  return GAME_STATE[table]

def set_game_state(table, puzzle, key, value):
  GAME_STATE[table][puzzle][key] = value

# TODO replace more efficient way of doing this
def initialize_game_state(table):
  GAME_STATE[table] = {}
  GAME_STATE[table]['1'] = {}
  set_game_state(table, '1', 'solved', False);
  set_game_state(table, '1', 'started', True);
  set_game_state(table, '1', 'hint_count', 0);
  GAME_STATE[table]['2'] = {}
  set_game_state(table, '2', 'solved', False);
  set_game_state(table, '2', 'started', False);
  set_game_state(table, '2', 'hint_count', 0);
  GAME_STATE[table]['3'] = {}
  set_game_state(table, '3', 'solved', False);
  set_game_state(table, '3', 'started', False);
  set_game_state(table, '3', 'hint_count', 0);
  GAME_STATE[table]['4'] = {}
  set_game_state(table, '4', 'solved', False);
  set_game_state(table, '4', 'started', False);
  set_game_state(table, '4', 'hint_count', 0);
  GAME_STATE[table]['5'] = {}
  set_game_state(table, '5', 'solved', False);
  set_game_state(table, '5', 'started', False);
  set_game_state(table, '5', 'hint_count', 0);
  GAME_STATE[table]['6'] = {}
  set_game_state(table, '6', 'solved', False);
  set_game_state(table, '6', 'started', False);
  set_game_state(table, '6', 'hint_count', 0);
  GAME_STATE[table]['7'] = {}
  set_game_state(table, '7', 'solved', False);
  set_game_state(table, '7', 'started', False);
  set_game_state(table, '7', 'hint_count', 0);
  GAME_STATE[table]['8'] = {}
  set_game_state(table, '8', 'solved', False);
  set_game_state(table, '8', 'started', False);
  set_game_state(table, '8', 'hint_count', 0);
  GAME_STATE[table]['A'] = {}
  set_game_state(table, 'A', 'solved', False);
  set_game_state(table, 'A', 'started', True);
  GAME_STATE[table]['B'] = {}
  set_game_state(table, 'B', 'solved', False);
  set_game_state(table, 'B', 'started', True);

def get_tables():
  return GAME_STATE.keys()

def get_table_state(table):
  return GAME_STATE[table]

def set_table_state(table, key, value):
  GAME_STATE[table][key] = value

### Data access ###

def server_now():
  return datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%SZ')

def game_complete(table):
  state = get_game_state(table)
  required = ['1', '2', '3', '4', '5', '6', '7', '8'];
  return all([state[puzzle]['solved'] for puzzle in required])

def send_game_state(table=None, sid=None):
  if sid:
    table = get_table(sid)
  sio.emit('game_state_update', get_game_state(table), room=(sid or table))

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
  file_path = os.path.join(root_dir, 'frontend', path)
  if os.path.exists(file_path):
    return send_from_directory(os.path.join(root_dir, 'frontend'), path)
  else:
    return index()

@flask_app.route('/admin')
def admin():
  root_dir = os.getcwd()
  return send_from_directory(os.path.join(root_dir, 'frontend'), 'huntadmin.html')

### Only for development use ###

def parse_cookies(cookie_string):
  cookies = {}
  for cookie in cookie_string.split(';'):
    key, value = cookie.split('=')
    cookies[key.strip()] = value.strip()
  return cookies

@sio.on('connect')
def connect(sid, environ):
  print('connect', sid)

@sio.on('hint_shown')
def handle_hint(sid, data):
  print('hint_shown', sid)
  puzzle = str(data['puzzle'])
  table = get_table(sid)
  # TODO make this robust
  hint_count = get_game_state(table)[puzzle]['hint_count']
  set_game_state(table, puzzle, 'hint_count', hint_count + 1)

@sio.on('load_admin_data')
def adminconnect(sid, data):
  print('load_admin_data', data['trigger'])
  trigger = data['trigger']
  if trigger == 'load':
    puzzle_data = defaultdict(dict)

    for table in get_tables():
      data = get_game_state(table)
      for puzzle in data:
        info = data[puzzle]
        puzzle_data[puzzle][table] = info

    global GAME_STARTED
    data_to_send = {'puzzleData' : puzzle_data, 'gameStarted': GAME_STARTED}
    sio.emit('admin_data', data_to_send)
  elif trigger == 'start_game':
    GAME_STARTED = True
    data_to_send = {'gameStarted': GAME_STARTED}
    sio.emit('game_started', data_to_send)
  elif trigger == 'stop_game':
    GAME_STARTED = False
    data_to_send = {'gameStarted': GAME_STARTED}
    sio.emit('game_started', data_to_send)

@sio.on('game_started')
def game_start(sid, data):
  print('game_started', data)
  data_to_send = {'gameStarted': GAME_STARTED}
  sio.emit('game_started', data_to_send)

@sio.on('cipher_ping')
def cipherconnect(sid, environ):
  print('cipher_ping', sid)
  table = get_table(sid)
  message = ANSWERS['1']
  cipher = encrypt(message, 30)
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
  print('join', sid, data)
  table = int(data['table'])
  set_table(sid, table)

  sio.enter_room(sid, table)

  if table not in get_tables():
    # this is the first person to join this table
    initialize_game_state(table)
    set_table_state(table, 'start_time', server_now())
  send_game_state(sid=sid)

  if game_complete(table):
    send_redirect(table, 'FINISH')

@sio.on('submit')
def submit(sid, data):
  print('submit', sid, data)
  puzzle, answer = [data.get(key) for key in ['puzzle', 'answer']]
  # TODO: error gracefully if no puzzle or answer
  if isinstance(answer, basestring):
    correct = answer.lower() == ANSWERS.get(str(puzzle))
  else:
    correct = answer == ANSWERS.get(str(puzzle))

  response = {
    'correct': correct,
  }
  sio.emit('submit_response', response, room=sid)
  table = get_table(sid)
  if correct:
    set_game_state(table, str(puzzle), 'solved', True)
    send_game_state(table=table)

    if game_complete(table):
      set_table_state(table, 'end_time', server_now())
      send_game_state(table=table)
      send_redirect(table, 'FINISH')
  elif str(puzzle) == '7':
    set_game_state(table, str(puzzle), 'last_attempt', server_now())
    send_game_state(table=table)

@sio.on('person_visit')
def person_visit(sid, data):
  print('person_visit', sid, data)
  table = get_table(sid)
  game_state = get_game_state(table)
  person_id = data['personId']

  for puzzle in game_state:
    if START_CRITERIA.get(puzzle) == person_id and not game_state[puzzle]['started'] and not game_state[puzzle]['solved']:
      if puzzle == '1' or game_state[str(int(puzzle) - 1)]['solved']:
        game_state[puzzle]['started'] = True
        send_game_state(table=table)
        return

@sio.on('disconnect')
def disconnect(sid):
  print('disconnect', sid)
  table = get_table(sid)
  if table:
    # Delete from our clients
    remove_client(sid)

if __name__ == '__main__':
  app = socketio.WSGIApp(sio, flask_app)
  eventlet.wsgi.server(eventlet.listen(('', 8000)), app)
