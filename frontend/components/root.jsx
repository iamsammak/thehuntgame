import React from 'react';
import styled from 'styled-components';
import { BrowserRouter, withRouter } from 'react-router-dom';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons/faArrowRight';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons/faArrowUp';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons/faArrowDown';
import { faStar } from '@fortawesome/free-solid-svg-icons/faStar';
import { faGem } from '@fortawesome/free-solid-svg-icons/faGem';
import { faCarSide } from '@fortawesome/free-solid-svg-icons/faCarSide';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons/faChevronLeft';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons/faChevronRight';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons/faChevronUp';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons/faChevronDown';
import { faChevronCircleLeft } from '@fortawesome/free-solid-svg-icons/faChevronCircleLeft';
import { faChevronCircleRight } from '@fortawesome/free-solid-svg-icons/faChevronCircleRight';
import { faChevronCircleUp } from '@fortawesome/free-solid-svg-icons/faChevronCircleUp';
import { faChevronCircleDown } from '@fortawesome/free-solid-svg-icons/faChevronCircleDown';

import App from './app';

library.add(
  faTimes,
  faArrowLeft,
  faArrowRight,
  faArrowUp,
  faArrowDown,
  faStar,
  faGem,
  faCarSide,
  faChevronLeft,
  faChevronRight,
  faChevronUp,
  faChevronDown,
  faChevronCircleLeft,
  faChevronCircleRight,
  faChevronCircleUp,
  faChevronCircleDown,
);

const AppContainer = styled.div`
  display: flex;
  justify-content: center;
`;

class ScrollToTopComponent extends React.Component {
  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return this.props.children;
  }
}

const ScrollToTop = withRouter(ScrollToTopComponent);


const Root = () => {
  return (
    <BrowserRouter>
      <ScrollToTop>
        <AppContainer>
          <App />
        </AppContainer>
      </ScrollToTop>
    </BrowserRouter>
  );
};

export default Root;
