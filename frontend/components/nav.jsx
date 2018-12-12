import React from 'react';
import {
  Route,
  Link,
  NavLink
} from 'react-router-dom';

import Home from './home';
import Lobby from './lobby';
import Main from './main';
import Puzzle1 from './puzzle1';
import Puzzle2 from './puzzle2';
import Puzzle3 from './puzzle3';
import Puzzle4 from './puzzle4';

const Nav = () => (
  <div>
    <NavLink to='/' >Index Route</NavLink>
    <NavLink to='/home' >Home</NavLink>
    <NavLink to='/lobby' >Lobby</NavLink>
    <NavLink to='/main' >Main</NavLink>
    <NavLink to='/puzzle1' >Puzzle 1</NavLink>
    <NavLink to='/puzzle2' >Puzzle 2</NavLink>
    <NavLink to='/puzzle3' >Puzzle 3</NavLink>
    <NavLink to='/puzzle4' >Puzzle 4</NavLink>
  </div>
)

export default Nav;
