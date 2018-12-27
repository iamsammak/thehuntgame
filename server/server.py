#!/usr/bin/env python2

import socketio
import eventlet
import eventlet.wsgi
from flask import Flask, render_template, jsonify, request

sio = socketio.Server()
app = Flask(__name__)

# { sid -> table number }
clients = {}
# { table number -> { puzzle number -> { solved } } }
game_state = {}
answers = {
  1: 'see o double you',
}

@sio.on('connect')
def connect(sid, environ):
  print "connect ", sid

@sio.on('join')
def join(sid, data):
  print("join", data, sid)
  table = data['table']
  clients[sid] = table
  sio.enter_room(sid, table)
  if table in game_state:
    pass
    # TODO: broadcast when someone joins
  else:
    game_state[table] = dict([(key, {'solved': False}) for key in answers])
    sio.emit('game_state_update', game_state[table], room=table)
  print game_state

@sio.on('submit')
def submit(sid, data):
  print("answer", data)
  puzzle, answer = [data.get(key) for key in ['puzzle', 'answer']]
  # TODO: error gracefully if no puzzle or answer
  correct = answer == answers.get(int(puzzle))

  if correct:
    table = clients[sid]
    # TODO: update game_state
    sio.emit('game_state_update', game_state[table], room=table)

  response = {
    'correct': correct,
  }
  sio.emit('submit_response', response, room=sid)

@sio.on('disconnect')
def disconnect(sid):
  print('disconnect ', sid)
  if sid in clients:
    clients.pop(sid)

if __name__ == '__main__':
  app = socketio.WSGIApp(sio, app)
  eventlet.wsgi.server(eventlet.listen(('', 8000)), app)
