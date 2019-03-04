import React from 'react';
import { withCookies } from 'react-cookie';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import WelcomeHeader from './welcomeHeader';
import { SubmitButton } from './buttonContants';

const Table = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
`;

const TableNumber = styled.div`
  height: 50%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #d6928b;
`;

const Container = styled.div`
  height: 300px;
  width: 150px;
  font-size: 100px;
`;

const TensContainer = styled(Container)`
  border-width: 1px 0 0 1px;
  margin: 5px 0 0 5px;
  border-radius: 25px 0 0 0;
  background-color: #f8dfca;
`;

const OnesContainer = styled(Container)`
  border-width: 1px 1px 0 0;
  margin: 5px 5px 0 0;
  border-radius: 0 25px 0 0;
  background-color: #bcd7cf;
`;

const UpIcon = styled(FontAwesomeIcon).attrs({
  icon: 'chevron-up',
})`
  height: 25%;
  font-size: 0.25em;
  color: white;
  padding: 0 2em;
`;

const DownIcon = styled(FontAwesomeIcon).attrs({
  icon: 'chevron-down',
})`
  height: 25%;
  font-size: 0.25em;
  color: white;
  padding: 0 2em;
`;

const EnterButton = styled(SubmitButton)`
  height: 60px;
  width: 300px;
  border-radius: 0 0 25px 25px;
  margin-top: 0;
  background-color: #d6928b;
`;

class Home extends React.Component {
  constructor(props) {
    super(props);
    const { socket } = props;
    socket.on('game_started', (data) => { this.setState({ gameStarted: data['gameStarted'] });
    });
    this.state = {
      tens: 0,
      ones: 0,
      gameStarted: false
    };

    this.gameStartPing();
    this.calcTens = this.calcTens.bind(this);
    this.calcOnes = this.calcOnes.bind(this);
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
        tens = (tens + num + 3) % 3;
        return ({ tens : tens });
      });
    };
  }

  setTable() {
    const { tens, ones, gameStarted } = this.state;
    const tableNumber = (tens * 10) + ones;
    if (tableNumber === 0 || tableNumber === 26 || gameStarted === false) {
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
    const { tens, ones, gameStarted } = this.state;
    const { cookies, join } = this.props;
    const table = cookies.get("table");
    if (gameStarted === false) {
      var message = 'Game has not started';
    }
    if (table) {
      join(table);
      return <Redirect to="/main" />;
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
        <Table>
          <TensContainer>
            <UpIcon onClick={this.calcTens(1)}></UpIcon>
            <TableNumber>{tens}</TableNumber>
            <DownIcon onClick={this.calcTens(-1)}></DownIcon>
          </TensContainer>
          <OnesContainer>
            <UpIcon onClick={this.calcOnes(1)}></UpIcon>
            <TableNumber>{ones}</TableNumber>
            <DownIcon onClick={this.calcOnes(-1)}></DownIcon>
          </OnesContainer>
          <EnterButton onClick={this.setTable}>Enter</EnterButton>
        </Table>
        <p>{message}</p>
      </div>
    );
  }
}

export default withCookies(Home);
