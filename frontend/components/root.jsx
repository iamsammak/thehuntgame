import React from 'react';
import styled from 'styled-components';
import { HashRouter } from 'react-router-dom';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faLock, faUnlock, faArrowLeft, faPoo, faGlassCheers, faAngry, faHorse, faAnchor, faCarrot, faCloudRain, faGlasses, faSeedling, faChessPawn, faCookieBite, faGasPump, faInfinity, faGhost, faDiceFive, faGem, faPuzzlePiece, faToilet, faPencilAlt, faMoon } from '@fortawesome/free-solid-svg-icons';

import App from './app';

library.add(faLock, faUnlock, faArrowLeft, faPoo, faGlassCheers, faAngry, faHorse, faAnchor, faCarrot, faCloudRain, faGlasses, faSeedling, faChessPawn, faCookieBite, faGasPump, faInfinity, faGhost, faDiceFive, faGem, faPuzzlePiece, faToilet, faPencilAlt, faMoon);

const AppContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Root = () => {
  return (
    <HashRouter>
      <AppContainer>
        <App />
      </AppContainer>
    </HashRouter>
  );
};

export default Root;
