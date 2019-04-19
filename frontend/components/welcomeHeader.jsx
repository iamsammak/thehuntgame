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
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const TableContainer = styled.div`
`;

const SolvedContainer = styled.div`
`;

class WelcomeHeader extends React.Component {
  constructor(props) {
    super(props);
    this.renderSolved = this.renderSolved.bind(this);
  }

  renderSolved(gameState) {
    var solvedCounter = 0;
    const gameStateValues = Object.values(gameState);
    for (var entry in gameStateValues) {
      if (gameStateValues[entry]['solved'] == true) {
        solvedCounter += 1;
      }
    }
    return solvedCounter;
  }

  render() {
    const { gameState } = this.props;
    const { start_time, table } = gameState || {};
    var solved = this.renderSolved(gameState);
    return (
      <Header>
        <TitleContainer>
          <Title>Chois Escape</Title>
        </TitleContainer>
        <InfoContainer>
          <TableContainer>Table #{table}</TableContainer>
          <SolvedContainer>Puzzles Solved: {solved}</SolvedContainer>
          {
            start_time && (
              <TimerContainer>
                <Timer start_time={new Date(start_time)} />
              </TimerContainer>
            )
          }
        </InfoContainer>
        <hr />
      </Header>
    );
  }
}

export default WelcomeHeader;
