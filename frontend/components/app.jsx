import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { withCookies } from 'react-cookie';
import { ToastContainer, toast } from 'react-toastify';
import io from 'socket.io-client';

import Nav from './nav';

import Home from './home';
import Main from './main';
import Person0 from './person0';
import Person1 from './person1';
import Person2 from './person2';
import Person3 from './person3';
import Person4 from './person4';
import Person5 from './person5';
import Person6 from './person6';
import Person7 from './person7';

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
      <div>
        <div id="puzzle-container">
          <Route exact path="/" render={() => <Redirect to="/home" />} />
          <Route path="/home" render={() => <Home {...this.state} />} />
          <Route path="/main" render={() => <Main {...this.state} />} />
          <Route path="/person0" render={() => <Person0 {...this.state} />} />
          <Route path="/person1" render={() => <Person1 {...this.state} />} />
          <Route path="/person2" render={() => <Person2 {...this.state} />} />
          <Route path="/person3" render={() => <Person3 {...this.state} />} />
          <Route path="/person4" render={() => <Person4 {...this.state} />} />
          <Route path="/person5" render={() => <Person5 {...this.state} />} />
          <Route path="/person6" render={() => <Person6 {...this.state} />} />
          <Route path="/person7" render={() => <Person7 {...this.state} />} />
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
      </div>
    );
  }
}

export default withCookies(App);
