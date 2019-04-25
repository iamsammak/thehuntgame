import React from 'react';
import styled from 'styled-components';
import { BrowserRouter, withRouter } from 'react-router-dom';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons/faArrowDown';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons/faArrowRight';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons/faArrowUp';
import { faCarSide } from '@fortawesome/free-solid-svg-icons/faCarSide';
import { faChevronCircleDown } from '@fortawesome/free-solid-svg-icons/faChevronCircleDown';
import { faChevronCircleLeft } from '@fortawesome/free-solid-svg-icons/faChevronCircleLeft';
import { faChevronCircleRight } from '@fortawesome/free-solid-svg-icons/faChevronCircleRight';
import { faChevronCircleUp } from '@fortawesome/free-solid-svg-icons/faChevronCircleUp';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons/faChevronDown';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons/faChevronLeft';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons/faChevronRight';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons/faChevronUp';
import { faCircle } from '@fortawesome/free-solid-svg-icons/faCircle';
import { faGem } from '@fortawesome/free-solid-svg-icons/faGem';
import { faHeart } from '@fortawesome/free-solid-svg-icons/faHeart';
import { faPlay } from '@fortawesome/free-solid-svg-icons/faPlay';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons/faQuestionCircle';
import { faSquare } from '@fortawesome/free-solid-svg-icons/faSquare';
import { faStar } from '@fortawesome/free-solid-svg-icons/faStar';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';

import App from './app';

library.add(
  faArrowDown,
  faArrowLeft,
  faArrowRight,
  faArrowUp,
  faCarSide,
  faChevronCircleDown,
  faChevronCircleLeft,
  faChevronCircleRight,
  faChevronCircleUp,
  faChevronDown,
  faChevronLeft,
  faChevronRight,
  faChevronUp,
  faCircle,
  faGem,
  faHeart,
  faPlay,
  faQuestionCircle,
  faSquare,
  faStar,
  faTimes,
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
