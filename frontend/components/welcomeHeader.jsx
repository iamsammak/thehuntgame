import React from 'react';
import styled from 'styled-components';
import { withCookies } from 'react-cookie';

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
  font-family: 'Madina Script';
  src: url('MadinaScript.ttf')
`;

const SolvedContainer = styled.div`
`;

class WelcomeHeader extends React.Component {
  constructor(props) {
    super(props);
    this.numSolved = this.numSolved.bind(this);
  }

  numSolved(gameState) {
    var solvedCounter = 0;
    return Object.values(gameState).reduce((solved, info) => {
      return info['solved'] ? solved + 1 : solved;
    }, 0);
    return solvedCounter;
  }

  render() {
    const { gameState, cookies } = this.props;
    console.log(cookies);
    const { start_time, table } = gameState || {};
//    const table = cookies.get('table')
    var solved = this.numSolved(gameState);
    return (
      <Header>
        <TitleContainer>
          <Title>Chois Escape</Title>
        </TitleContainer>
        <InfoContainer>
          <TableContainer>Table {table}</TableContainer>
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
