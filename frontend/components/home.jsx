import React from 'react';
import { withCookies } from 'react-cookie';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { black, dustStorm, juniper, whiteLilac } from '../constants';
import WelcomeHeader from './welcomeHeader';
import { Button } from './buttons';
import { CenteredRow, MdSpacing, XlSpacing } from '../wrappers';

const Table = styled(CenteredRow)`
  border-radius: 5px;
  border: 1px solid ${dustStorm};
  background-color: ${whiteLilac};
  overflow: hidden;
  height: 300px;
  width: 300px;
`;

const NumberContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 300px;
  width: 50px;
`;

const TableNumber = styled.div`
  color: ${black};
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: baseline;
  font-family: 'Madina Script';
  font-size: 8em;
  line-height: 1.6em;
`;

const UpIcon = styled(FontAwesomeIcon).attrs({
  icon: 'chevron-up',
})`
  height: 25%;
  font-size: 2em;
  color: ${juniper};
`;

const DownIcon = styled(FontAwesomeIcon).attrs({
  icon: 'chevron-down',
})`
  height: 25%;
  font-size: 2em;
  color: ${juniper};
`;

const EnterButton = styled(Button)`
  height: 60px;
  width: 300px;
  font-size: 30px;
`;

class Home extends React.Component {
  constructor(props) {
    super(props);
    const { socket } = props;
    socket.on('game_started', (data) => {
      this.setState({ gameStarted: data['gameStarted'] });
    });
    this.state = {
      tens: 0,
      ones: 0,
      gameStarted: false,
      submittedTable: null,
    };

    this.gameStartPing();
    this.calcTens = this.calcTens.bind(this);
    this.calcOnes = this.calcOnes.bind(this);
    this.validTable = this.validTable.bind(this);
    this.setTable = this.setTable.bind(this);
  }


  calcOnes(num) {
    return () => {
      this.setState(state => {
        let { ones } = state;
        ones = (ones + num + 10) % 10;
        return ({ ones: ones });
      });
    };
  }

  calcTens(num) {
    return () => {
      this.setState(state => {
        let { tens } = state;
        tens = (tens + num + 4) % 4;
        return ({ tens : tens });
      });
    };
  }

  validTable(table) {
    return table !== 0 && table <= 31;
  }

  setTable() {
    const { tens, ones, gameStarted } = this.state;
    const tableNumber = (tens * 10) + ones;
    this.setState({ submittedTable: tableNumber });
    if (!this.validTable(tableNumber) || gameStarted === false) {
      return;
    }
    const { cookies } = this.props;
    cookies.set("table", tableNumber);
  }

  gameStartPing() {
    const { socket } = this.props;
    socket.emit('game_started', {});
  }

  render() {
    const { tens, ones, gameStarted, submittedTable } = this.state;
    const { cookies, join } = this.props;

    const table = cookies.get("table");
    if (table) {
      join(table);
      return <Redirect to="/main" />;
    }

    let message;
    if (gameStarted === false) {
      message = 'Game has not started yet.';
    } else if (submittedTable !== null && !this.validTable(submittedTable)) {
      message = 'I don\'t think that table exists...';
    }

    return (
      <div>
        <WelcomeHeader />
        <div>
          <p>
            We really need your help! With everything going on today, the bridal party somehow lost the key to the getaway car. No one is sure who had it last, so you&apos;ll need to ask around and see if anyone can remember anything.
          </p>
          <p>
            It doesn&apos;t matter which table finds it first--Chris and Christine would love for your table to finish this entire adventure and show them that you found the key!
          </p>
          <p>
            Each of the bridal party members is looking for the key. If you can&apos;t figure out what they&apos;re asking for or how to help them, ask the best man and he can give you a hint (unless you want to finish without using any hints!).
          </p>
        </div>
        <h2>What table are you sitting at?</h2>
        <CenteredRow>
          <Table>
            <NumberContainer>
              <UpIcon onClick={this.calcTens(1)}></UpIcon>
              <TableNumber>{tens}</TableNumber>
              <DownIcon onClick={this.calcTens(-1)}></DownIcon>
            </NumberContainer>
            <XlSpacing />
            <NumberContainer>
              <UpIcon onClick={this.calcOnes(1)}></UpIcon>
              <TableNumber>{ones}</TableNumber>
              <DownIcon onClick={this.calcOnes(-1)}></DownIcon>
            </NumberContainer>
          </Table>
        </CenteredRow>
        <MdSpacing />
        <CenteredRow>
          <EnterButton onClick={this.setTable}>Enter</EnterButton>
        </CenteredRow>
        <p>{message}</p>
      </div>
    );
  }
}

export default withCookies(Home);
