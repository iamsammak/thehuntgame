import React from 'react';
import { Route, Link, NavLink, IndexRoute } from 'react-router-dom';

import Nav from './nav';

import Home from './home';
import Lobby from './lobby';
import Main from './main';
import Puzzle1 from './puzzle1';
import Puzzle2 from './puzzle2';
import Puzzle3 from './puzzle3';
import Puzzle4 from './puzzle4';

class App extends React.Component {

  render() {

    return (
      <div>
        <h1 id="temp-header">Welcome to The Hunt v2</h1>
        <hr />
        <div id="puzzle-container">
          <Route path="/home" component={ Home }></Route>
          <Route path="/lobby" component={Lobby} />
	        <Route path="/main" component={Main} />
          <Route path="/puzzle1" component={Puzzle1} />
          <Route path="/puzzle2" component={Puzzle2} />
          <Route path="/puzzle3" component={Puzzle3} />
          <Route path="/puzzle4" component={Puzzle4} />

        </div>
        <hr />
        <h5>Testing Below</h5>
        <Nav />
      </div>
    );
  }
};

export default App;
