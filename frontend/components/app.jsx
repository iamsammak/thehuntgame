import React from 'react';
import { Route, Link, NavLink, IndexRoute } from 'react-router-dom';
import io from 'socket.io-client';

import Nav from './nav';

import Home from './home';
import Lobby from './lobby';
import Main from './main';
import Puzzle from './puzzle';
import Puzzle1 from './puzzle1';
import Puzzle2 from './puzzle2';
import Puzzle3 from './puzzle3';
import Puzzle4 from './puzzle4';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    // TODO: update URL
    const socket = io('http://localhost:8000');

    socket.on('game_state_update', (data) => {
      this.setState({ gameState: data });
    });

    this.state = {
      gameState: {},
      socket: socket,
      send: this.send.bind(this),
    };
  }

  send(eventName, data) {
    console.log(data);
    const { socket } = this.state;
    socket.emit(eventName, data);
  }

  render() {
    return (
      <div>
        <h1 id="temp-header">Welcome to The Hunt v2</h1>
        <hr />
        <div id="puzzle-container">
          <Route path="/home" component={Home}></Route>
          <Route path="/lobby" component={Lobby} />
	        <Route path="/main" component={() => <Main {...this.state} />} />
          <Route path="/puzzle1" component={() => <Puzzle {...this.state} component={Puzzle1} />} />
          <Route path="/puzzle2" component={() => <Puzzle {...this.state} component={Puzzle2} />} />
          <Route path="/puzzle3" component={() => <Puzzle {...this.state} component={Puzzle3} />} />
          <Route path="/puzzle4" component={() => <Puzzle {...this.state} component={Puzzle4} />} />

        </div>
        <hr />
        <h5>Testing Below</h5>
        <Nav />
      </div>
    );
  }
};
