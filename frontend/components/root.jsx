import React from 'react';
import { HashRouter } from 'react-router-dom';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faLock, faUnlock, faArrowLeft, faPoo, faGlassCheers, faAngry, faHorse, faAnchor, faCarrot, faCloudRain, faGlasses, faSeedling } from '@fortawesome/free-solid-svg-icons';

import App from './app';

library.add(faLock, faUnlock, faArrowLeft, faPoo, faGlassCheers, faAngry, faHorse, faAnchor, faCarrot, faCloudRain, faGlasses, faSeedling);

const Root = () => {
  return (
    <HashRouter>
      <App />
    </HashRouter>
  );
};

export default Root;
