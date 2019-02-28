import React from 'react';
import styled from 'styled-components';

import Timer from './timer';

const Header = styled.div`
  margin-top: 2em;
`;

const Title = styled.div`
  font-size: 2em;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const TimerContainer = styled.div`
  align-self: flex-end;
`;

class WelcomeHeader extends React.Component {
  render() {
    const { gameState } = this.props;

    const { start_time } = gameState || {};

    return (
      <Header>
        <TitleContainer>
          <Title>Chois Escape</Title>
          {
            start_time && (
              <TimerContainer>
                <Timer start_time={new Date(start_time)} />
              </TimerContainer>
            )
          }
        </TitleContainer>
        <hr />
      </Header>
    );
  }
}

export default WelcomeHeader;
