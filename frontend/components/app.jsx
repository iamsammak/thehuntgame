import React from 'react';
import styled from 'styled-components';
import io from 'socket.io-client';
import { Route, Redirect } from 'react-router-dom';
import { withCookies } from 'react-cookie';
import { ToastContainer, toast } from 'react-toastify';

import Nav from './nav';

import Home from './home';
import Main from './main';
import Puzzle from './puzzle';
import Puzzle1 from './puzzle1';
import Puzzle2 from './puzzle2';
import Puzzle3 from './puzzle3';
import Puzzle4 from './puzzle4';
import Puzzle5 from './puzzle5';

const AppContainer = styled.div`
  max-width: 400px;
  min-width: 400px;
  text-align: center;
`;

class App extends React.Component {
  constructor(props) {
    super(props);
    const { cookies } = props;
    // TODO: update URL
    const socket = io(SOCKET_URL);

    socket.on('game_state_update', (data) => {
      this.setState({ gameState: data });
    });

    socket.on('player_joined', () => {
      toast('Someone has joined your table!', {
        type: 'info',
      });
    });

    socket.on('player_left', () => {
      toast('Someone has left your table!', {
        type: 'error',
      });
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
      <AppContainer>
        <div>
          <Route exact path="/" render={() => <Redirect to="/home" />} />
          <Route path="/home" render={() => <Home {...this.state} />} />
          <Route path="/main" render={() => <Main {...this.state} />} />
          <Route path="/puzzle1" render={() => <Puzzle {...this.state} component={Puzzle1} />} />
          <Route path="/puzzle2" render={() => <Puzzle {...this.state} component={Puzzle2} />} />
          <Route path="/puzzle3" render={() => <Puzzle {...this.state} component={Puzzle3} />} />
          <Route path="/puzzle4" render={() => <Puzzle {...this.state} component={Puzzle4} />} />
          <Route path="/puzzle5" render={() => <Puzzle {...this.state} component={Puzzle5} />} />
        </div>
        <hr />
        <h5>Testing Below</h5>
        <Nav />
        <ToastContainer
          position={toast.POSITION.TOP_RIGHT}
          autoClose={2000}
          hideProgressBar
          closeOnClick
        />
      </AppContainer>
    );
  }
}

export default withCookies(App);
