import React from 'react';
import styled from 'styled-components';
import { HashRouter } from 'react-router-dom';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

import App from './app';

library.add(fas);

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
