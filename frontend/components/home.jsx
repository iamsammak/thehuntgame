import React from 'react';

import { Route, NavLink } from 'react-router-dom';

class Home extends React.Component {
  render() {
    return (
      <section className="home-container">
        <h2>Click on your table number</h2>
        <div id="table">
        </div>
      </section>
    );
  }
};

export default Home;
