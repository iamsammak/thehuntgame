import React from 'react';
import { Route } from 'react-router-dom';
import { withCookies } from 'react-cookie';
import io from 'socket.io-client';

import Nav from './nav';

import Home from './home';
import Main from './main';
import Puzzle from './puzzle';
import Puzzle1 from './puzzle1';
import Puzzle2 from './puzzle2';
import Puzzle3 from './puzzle3';
import Puzzle4 from './puzzle4';
import Puzzle5 from './puzzle5';

class App extends React.Component {
  constructor(props) {
    super(props);
    const { cookies } = props;
    // TODO: update URL
    const socket = io(SOCKET_URL);

    socket.on('game_state_update', (data) => {
      this.setState({ gameState: data });
    });

    this.state = {
      gameState: {},
      socket: socket,
      send: this.send.bind(this),
      join: this.join.bind(this),
    };

    const table = cookies.get('table');
    if (table) {
      this.join(table);
    }
  }

  join(tableNumber) {
    const { socket } = this.state;

    socket.emit('join', { table: tableNumber });
  }

  send(eventName, data) {
    const { socket } = this.state;
    socket.emit(eventName, data);
  }

  render() {
    return (
      <div>
        <div id="puzzle-container">
          <Route path="/home" component={() => <Home {...this.state} />}></Route>
          <Route path="/main" component={() => <Main {...this.state} />} />
          <Route path="/puzzle1" component={() => <Puzzle {...this.state} component={Puzzle1} />} />
          <Route path="/puzzle2" component={() => <Puzzle {...this.state} component={Puzzle2} />} />
          <Route path="/puzzle3" component={() => <Puzzle {...this.state} component={Puzzle3} />} />
          <Route path="/puzzle4" component={() => <Puzzle {...this.state} component={Puzzle4} />} />
          <Route path="/puzzle5" component={() => <Puzzle {...this.state} component={Puzzle5} />} />
        </div>
        <hr />
        <h5>Testing Below</h5>
        <Nav />
      </div>
    );
  }
}

export default withCookies(App);
