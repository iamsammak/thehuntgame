import React from 'react';
import styled from 'styled-components';
import { withCookies } from 'react-cookie';
import Timer from './timer';

import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPuzzlePiece } from '@fortawesome/free-solid-svg-icons/faPuzzlePiece';

const Header = styled.div`
  margin-top: 2em;
`;

const Hr = styled.hr`
  margin-top: 0;
`;


const Title = styled.div`
  font-size: 2em;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const TimerContainer = styled.div`
  padding-top: 4px;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
`;

const TableContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`;

const TableNumContainer = styled.div`
  display: flex;
  align-items: center;
  font-family: 'Madina Script';
  src: url('MadinaScript.ttf');
  padding-left: 5px;
`;

class WelcomeHeader extends React.Component {
  constructor(props) {
    super(props);
    this.numSolved = this.numSolved.bind(this);
  }

  numSolved(gameState) {
    var solvedCounter = 0;
    if (Object.values(gameState || {})) {
      return Object.values(gameState).reduce((solved, info) => {
        return info['solved'] ? solved + 1 : solved;
      }, 0);
    };
    return solvedCounter;
  }

  render() {
    const { gameState, cookies } = this.props;
    const { start_time } = gameState || {};
    const table = cookies.get('table')
    var solved = this.numSolved(gameState);
    return (
      <Header>
        <TitleContainer>
          <Title>Chois Escape</Title>
        </TitleContainer>
        <InfoContainer>
          <TableContainer><div>Table</div><TableNumContainer>{table}</TableNumContainer></TableContainer>
          <div><Icon icon="puzzle-piece" /> Solved: {solved}</div>
          {
            start_time && (
              <TimerContainer>
                <Timer start_time={new Date(start_time)} />
              </TimerContainer>
            )
          }
        </InfoContainer>
        <Hr />
      </Header>
    );
  }
}

export default withCookies(WelcomeHeader);
