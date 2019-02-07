import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import io from 'socket.io-client';
import { withRouter } from 'react-router';
import { Route, Redirect } from 'react-router-dom';
import { withCookies } from 'react-cookie';
import { ToastContainer, toast } from 'react-toastify';

import Home from './home';
import Main from './main';
import Person from './person';
import Person0 from './person0';
import Person1 from './person1';
import Person2 from './person2';
import Person3 from './person3';
import Person4 from './person4';
import Person5 from './person5';
import Person6 from './person6';
import Person7 from './person7';
import Finish from './finish';

const GlobalStyles = createGlobalStyle`
  * {
    font-family: "Quicksand", sans-serif;
    font-weight: 300;
  }
`;

const AppContainer = styled.div`
  max-width: 400px;
  min-width: 400px;
  text-align: center;
`;

const REDIRECTS = {
  'FINISH': '/finish',
};

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

    socket.on('redirect', (data) => {
      const { history } = this.props;
      if (REDIRECTS[data]) {
        history.push(REDIRECTS[data]);
      }
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
        <GlobalStyles />
        <div>
          <Route exact path="/" render={() => <Redirect to="/home" />} />
          <Route path="/home" render={() => <Home {...this.state} />} />
          <Route path="/main" render={() => <Main {...this.state} />} />
          <Route path="/finish" render={() => <Finish {...this.state} />} />
          <Route path="/matt" render={() => <Person {...this.state} component={Person0} name="Matt" />} />
          <Route path="/tim" render={() => <Person {...this.state} component={Person1} name="Tim" />} />
          <Route path="/jay" render={() => <Person {...this.state} component={Person2} name="Jay" />} />
          <Route path="/ryan" render={() => <Person {...this.state} component={Person3} name="Ryan" />} />
          <Route path="/kristi" render={() => <Person {...this.state} component={Person4} name="Kristi" />} />
          <Route path="/erica" render={() => <Person {...this.state} component={Person5} name="Erica" />} />
          <Route path="/maryann" render={() => <Person {...this.state} component={Person6} name="MaryAnn" />} />
          <Route path="/helena" render={() => <Person {...this.state} component={Person7} name="Helena" />} />
        </div>
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

export default withCookies(withRouter(App));
