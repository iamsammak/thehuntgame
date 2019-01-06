import React from 'react';
import { NavLink } from 'react-router-dom';

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
    <br/>
    <NavLink to='/puzzle5' >Puzzle 5</NavLink>
  </div>
);

export default Nav;
