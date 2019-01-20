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
          <Route path="/person0" component={Person0} />
          <Route path="/person1" component={Person1} />
          <Route path="/person2" component={Person2} />
          <Route path="/person3" component={Person3} />
          <Route path="/person4" component={Person4} />
          <Route path="/person5" component={Person5} />
          <Route path="/person6" component={Person6} />
          <Route path="/person7" component={Person7} />
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
