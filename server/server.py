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
  5: {'solved': False, 'segments': {}, 'total_segments': 0},
}
ANSWERS = {
  1: 'getaway',
  2: 'see o double you',
  3: '',
  4: '',
  5: '',
}

### Only for development use ###
@flask_app.route('/')
def index():
  root_dir = os.getcwd()
  return send_from_directory(os.path.join(root_dir, 'frontend'), 'thehunt.html')

@flask_app.route('/frontend/<directory>/<filename>')
def static_files(directory, filename):
  root_dir = os.getcwd()
  return send_from_directory(os.path.join(root_dir, 'frontend', directory), filename)
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
    sio.emit('game_state_update', GAME_STATE[table], room=table)
  print GAME_STATE

@sio.on('submit')
def submit(sid, data):
  print("answer", data)
  puzzle, answer = [data.get(key) for key in ['puzzle', 'answer']]
#  puzzle,answer = data.items()[0]
  print(puzzle,answer)
  # TODO: error gracefully if no puzzle or answer
  correct = answer == ANSWERS.get(int(puzzle))

  if correct:
    print('correct answer was made')
    table = CLIENTS[sid]
    # TODO: update game_state
    sio.emit('game_state_update', GAME_STATE[table], room=table)

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
  if puzzle5['total_segments'] == 0:
    friends = [key for key in CLIENTS if CLIENTS[key] == table]
    random.shuffle(friends)
    puzzle5['total_segments'] = len(friends)
    for i in range(len(friends)):
      puzzle5['segments'][friends[i]] = i

  segments = puzzle5['segments']
  if sid in segments:
    # Return your assigned segment
    switch_index = segments[sid]
  else:
    if len(segments.values()) == puzzle5['total_segments']:
      # All indexes are taken, you are a spectator
      switch_index = -1
    else:
      # Pick an unused index
      unused = set(range(puzzle5['total_segments'])) - set(segments.values())
      switch_index = random.choice(list(unused))
      # Claim the index by setting it in segments
      segments[sid] = switch_index
  response = {
    'switch_index': switch_index,
    'total': puzzle5['total_segments'],
  }
  sio.emit('puzzle5_join_response', response, room=sid)

if __name__ == '__main__':
  app = socketio.WSGIApp(sio, flask_app)
  eventlet.wsgi.server(eventlet.listen(('', 8000)), app)
