import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import io from 'socket.io-client';
import { withRouter } from 'react-router';
import { Route, Redirect } from 'react-router-dom';
import { withCookies } from 'react-cookie';

import { barelyGray } from '../constants';
import { PEOPLE } from '../helpers';
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
  body {
    background-color: ${barelyGray};
  }
`;

const AppContainer = styled.div`
  width: ${props => Math.min(360, props.width)}px;
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
    const { cookies, history, location } = this.props;
    const { pathname } = location;
    // If at any point we don't have a table cookie, we should kick the user
    // back out to the home page to re-enter their table and join again
    const table = cookies.get('table');
    if (!table && pathname !== '/home') {
      history.push('/home');
    }

    return (
      <AppContainer width={window.innerWidth}>
        <GlobalStyles />
        <div>
          <Route exact path="/" render={() => <Redirect to="/home" />} />
          <Route path="/home" render={() => <Home {...this.state} />} />
          <Route path="/main" render={() => <Main {...this.state} />} />
          <Route path="/finish" render={() => <Finish {...this.state} />} />
          <Route path={PEOPLE['matt'].path} render={() => <Person {...this.state} component={Person0} personId="matt" />} />
          <Route path={PEOPLE['tim'].path} render={() => <Person {...this.state} component={Person1} personId="tim" />} />
          <Route path={PEOPLE['jay'].path} render={() => <Person {...this.state} component={Person2} personId="jay" />} />
          <Route path={PEOPLE['ryan'].path} render={() => <Person {...this.state} component={Person3} personId="ryan" />} />
          <Route path={PEOPLE['kristi'].path} render={() => <Person {...this.state} component={Person4} personId="kristi" />} />
          <Route path={PEOPLE['erica'].path} render={() => <Person {...this.state} component={Person5} personId="erica" />} />
          <Route path={PEOPLE['maryann'].path} render={() => <Person {...this.state} component={Person6} personId="maryann" />} />
          <Route path={PEOPLE['helena'].path} render={() => <Person {...this.state} component={Person7} personId="helena" />} />
        </div>
      </AppContainer>
    );
  }
}

export default withCookies(withRouter(App));
