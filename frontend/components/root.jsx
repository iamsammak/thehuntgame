import React from 'react';
// import { Provider } from 'react-redux';
import { HashRouter, Route, Link, NavLink, IndexRoute } from 'react-router-dom';

import App from './app';

const Root = () => {
  return(
    <HashRouter>
      <App />
    </HashRouter>
  );
}
export default Root;
