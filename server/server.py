#!/usr/bin/env python2

import os
import socketio
import eventlet
import eventlet.wsgi
import random
from flask import Flask, render_template, jsonify, request, send_from_directory

sio = socketio.Server()
flask_app = Flask(__name__)

# { sid -> table number }
CLIENTS = {}
# { table number -> { puzzle number -> { solved } } }
GAME_STATE = {}
INITIAL_GAME_STATE_FOR_TABLE = {
  1: {'solved': False},
  2: {'solved': False},
  3: {'solved': False},
  4: {'solved': False},
  5: {'solved': False, 'segments': {}, 'switches': []},
}
ANSWERS = {
  1: 'see o double you',
  2: '',
  3: '',
  4: '',
  5: '',
}
PUZZLE5_CHOICES = ['poo', 'glass-cheers', 'angry', 'horse', 'anchor', 'carrot', 'cloud-rain', 'glasses', 'seedling']
PUZZLE5_COLORS = [ '#000000', '#009933', '#ff4d4d', '#bb54c9']

def send_game_state(table):
  sio.emit('game_state_update', GAME_STATE[table], room=table)

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
  return jsonify({ 'game_state': GAME_STATE, 'clients': CLIENTS })
### Only for development use ###

@sio.on('connect')
def connect(sid, environ):
  print("connect ", sid)

@sio.on('join')
def join(sid, data):
  print("join", data, sid)
  table = data['table']
  CLIENTS[sid] = table
  sio.enter_room(sid, table)
  if table in GAME_STATE:
    pass
    # TODO: broadcast when someone joins
  else:
    GAME_STATE[table] = INITIAL_GAME_STATE_FOR_TABLE.copy()
    send_game_state(table)
  print GAME_STATE

@sio.on('submit')
def submit(sid, data):
  print("answer", sid, data)
  puzzle, answer = [data.get(key) for key in ['puzzle', 'answer']]
  # TODO: error gracefully if no puzzle or answer
  correct = answer == ANSWERS.get(int(puzzle))

  if correct:
    table = CLIENTS[sid]
    GAME_STATE[table][int(puzzle)]['solved'] = True
    send_game_state(table)

  response = {
    'correct': correct,
  }
  sio.emit('submit_response', response, room=sid)

@sio.on('disconnect')
def disconnect(sid):
  print('disconnect ', sid)
  if sid in CLIENTS:
    # Delete from our clients
    table = CLIENTS.pop(sid)

    # Puzzle 5 cleanup
    if sid in GAME_STATE[table][5]['segments']:
      del GAME_STATE[table][5]['segments'][sid]

@sio.on('puzzle5_join')
def puzzle5_join(sid, data):
  print('puzzle5_join', sid)
  table = CLIENTS[sid]
  puzzle5 = GAME_STATE[table][5]

  # This is the first person joining
  if len(puzzle5['switches']) == 0:
    friends = [key for key in CLIENTS if CLIENTS[key] == table]
    random.shuffle(friends)
    puzzle5['switches'] = [[choice, PUZZLE5_COLORS[0]] for choice in random.sample(PUZZLE5_CHOICES, max(len(friends), 3))]
    for i in range(len(friends)):
      puzzle5['segments'][friends[i]] = i

  segments = puzzle5['segments']
  if sid in segments:
    # Return your assigned segment
    index = segments[sid]
  else:
    if len(segments.values()) == len(puzzle5['switches']):
      # All indexes are taken, you are a spectator
      index = -1
    else:
      # Pick an unused index
      unused = set(range(len(puzzle5['switches']))) - set(segments.values())
      index = random.choice(list(unused))
      # Claim the index by setting it in segments
      segments[sid] = index
  sio.emit('puzzle5_join_response', { 'index': index }, room=sid)
  send_game_state(table)

@sio.on('puzzle5_toggle')
def puzzle5_toggle(sid, data):
  print('puzzle5_toggle', sid)
  table = CLIENTS[sid]
  puzzle5 = GAME_STATE[table][5]
  if sid in puzzle5['segments']:
    index = puzzle5['segments'][sid]
    current_color = puzzle5['switches'][index][1]
    if current_color in PUZZLE5_COLORS:
      new_color = PUZZLE5_COLORS[(PUZZLE5_COLORS.index(current_color) + 1) % len(PUZZLE5_COLORS)]
      puzzle5['switches'][index][1] = new_color
      send_game_state(table)
    else:
      pass
      # TODO: wat.
  else:
    # TODO: how is this user doing this?
    pass

if __name__ == '__main__':
  app = socketio.WSGIApp(sio, flask_app)
  eventlet.wsgi.server(eventlet.listen(('', 8000)), app)
