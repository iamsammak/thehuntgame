import React from 'react';
import { withCookies } from 'react-cookie';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import WelcomeHeader from './welcomeHeader';
import { Button, SubmitButton } from './buttonContants';

const Table = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
`;

const NumContainer = styled.div`
  height: 50%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #d6928b;
`;

const TableButton = styled(Button)`
  height: 300px;
  width: 150px;
  font-size: 100px;
`;

const TensButton = styled(TableButton)`
  border-width: 1px 0 0 1px;
  margin: 5px 0 0 5px;
  border-radius: 25px 0 0 0;
  background-color: #f8dfca;
`;

const OnesButton = styled(TableButton)`
  border-width: 1px 1px 0 0;
  margin: 5px 5px 0 0;
  border-radius: 0 25px 0 0;
  background-color: #bcd7cf;
`;

const EnterButton = styled(SubmitButton)`
  height: 60px;
  width: 300px;
  border-radius: 0 0 25px 25px;
  border-top: 0;
  margin-top: 0;
  background-color: #d6928b;
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

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tens: 0,
      ones: 0
    };

    this.calcTens = this.calcTens.bind(this);
    this.calcOnes = this.calcOnes.bind(this);
    this.setTable = this.setTable.bind(this);
  }


  calcOnes(num) {
    return () => {
      this.setState(state => {
        let { ones } = this.state;
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
    const {tens, ones} = this.state;
    const tableNumber = (tens * 10) + ones;

    if (tableNumber === 0 || tableNumber === 26) {
      return;
    }

    const { cookies } = this.props;
    cookies.set("table", tableNumber);
  }

  render() {
    const { tens, ones } = this.state;

    const { cookies, join } = this.props;
    const table = cookies.get("table");

    if (table) {
      join(table);
      return <Redirect to="/main" />;
    }

    return (
      <div>
        <WelcomeHeader />
        <h2>Click to your Table Number</h2>
        <Table>
          <TensButton>
            <UpIcon onClick={this.calcTens(1)}></UpIcon>
            <NumContainer>{tens}</NumContainer>
            <DownIcon onClick={this.calcTens(-1)}></DownIcon>
          </TensButton>
          <OnesButton>
            <UpIcon onClick={this.calcOnes(1)}></UpIcon>
            <NumContainer>{ones}</NumContainer>
            <DownIcon onClick={this.calcOnes(-1)}></DownIcon>
          </OnesButton>
          <EnterButton onClick={this.setTable}>Enter</EnterButton>
        </Table>
      </div>
    );
  }
}

export default withCookies(Home);
