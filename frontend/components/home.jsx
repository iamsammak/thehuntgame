import React from 'react';
import { withCookies } from 'react-cookie';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';

import WelcomeHeader from './welcomeHeader';
import { Button, SubmitButton } from './buttonContants';

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

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tens: 0,
      ones: 0
    };

    this.addTens = this.addTens.bind(this);
    this.addOnes = this.addOnes.bind(this);
    this.setTable = this.setTable.bind(this);
  }

  addTens() {
    let {tens} = this.state;

    if (tens === 2) {
      tens = 0;
    } else {
      tens = tens + 1;
    }

    this.setState({tens: tens});
  }

  addOnes() {
    let {ones} = this.state;

    if (ones === 9) {
      ones = 0;
    } else {
      ones = ones + 1;
    }

    this.setState({ones: ones});
  }

  setTable() {
    const {tens, ones} = this.state;
    const tableNumber = (tens * 10) + ones;

    const { cookies } = this.props;
    cookies.set("table", tableNumber);
  }

  render() {
    const {tens} = this.state;
    const {ones} = this.state;

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
        <div id="table">
          <TensButton onClick={this.addTens}>{tens}</TensButton>
          <OnesButton onClick={this.addOnes}>{ones}</OnesButton>
          <EnterButton onClick={this.setTable}>Enter</EnterButton>
        </div>
      </div>
    );
  }
}

export default withCookies(Home);
