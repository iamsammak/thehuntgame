import React from 'react';
import styled from 'styled-components';
import { withCookies } from 'react-cookie';
import Timer from './timer';

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
  padding-left: 5px
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  margin-top: 2px;
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
  padding-right: 5px
`;

class WelcomeHeader extends React.Component {

  render() {
    const { gameState, cookies } = this.props;
    const { start_time } = gameState || {};
    const table = cookies.get('table');
    return (
      <Header>
        <TitleContainer>
          <Title>Chois Escape</Title>
        </TitleContainer>
        {
          start_time && (
            <InfoContainer>
              <TableContainer>
                <div>Table</div>
                <TableNumContainer>{table}</TableNumContainer>
              </TableContainer>
                  |
              <TimerContainer>
                <Timer start_time={new Date(start_time)} />
              </TimerContainer>
            </InfoContainer>
          )
        }
        <Hr />
      </Header>
    );
  }
}

export default withCookies(WelcomeHeader);
