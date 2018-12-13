import React from 'react';
// import { Provider } from 'react-redux';
import { HashRouter, Route, Link, NavLink, IndexRoute } from 'react-router-dom';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock, faUnlock } from '@fortawesome/free-solid-svg-icons'

import App from './app';

library.add(faLock);
library.add(faUnlock);

const Root = () => {
  return(
    <HashRouter>
      <App />
    </HashRouter>
  );
}
export default Root;
