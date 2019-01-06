import React from 'react';
import { HashRouter } from 'react-router-dom';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faLock, faUnlock } from '@fortawesome/free-solid-svg-icons';

import App from './app';

library.add(faLock);
library.add(faUnlock);

const Root = () => {
  return (
    <HashRouter>
      <App />
    </HashRouter>
  );
};

export default Root;
