import React from 'react';
import {
  Route,
  Link,
  NavLink
} from 'react-router-dom';

import Home from './home';
import Main from './main';
import Puzzle1 from './puzzle1';
import Puzzle2 from './puzzle2';
import Puzzle3 from './puzzle3';
import Puzzle4 from './puzzle4';

const Nav = () => (
  <div>
    <NavLink to='/' >Index Route</NavLink>
    <br/>
    <NavLink to='/home' >Home</NavLink>
    <br/>
    <NavLink to='/main' >Main</NavLink>
    <br/>
    <NavLink to='/puzzle1' >Puzzle 1</NavLink>
    <br/>
    <NavLink to='/puzzle2' >Puzzle 2</NavLink>
    <br/>
    <NavLink to='/puzzle3' >Puzzle 3</NavLink>
    <br/>
    <NavLink to='/puzzle4' >Puzzle 4</NavLink>
  </div>
)

export default Nav;
