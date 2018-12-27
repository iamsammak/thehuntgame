import React from 'react';
import { withCookies } from 'react-cookie'
import { Route, Redirect } from 'react-router-dom';
import styled from 'styled-components';

const TableNumber = styled.button`
  padding: 5px;
  margin: 5px;
  height: 100px;
  width: 100px;
  font-size: 30px;
`;

class Home extends React.Component {
  join(tableNumber) {
    const { socket } = this.props;

    console.log(`joining table ${tableNumber}`);
    socket.emit('join', { table: tableNumber });
  }

  setTable(tableNumber) {
    return () => {
      const { cookies } = this.props;
      cookies.set("table", tableNumber);
    }
  }

  render() {
    const { cookies } = this.props;

    const table = cookies.get("table");

    if (table) {
      this.join(table);
      return <Redirect to="/main" />
    }

    return (
      <section className="home-container">
        <p>Before you embark on the hunt...Sheldon come up with a blurb</p>
        <h2>Click on your table number</h2>
        <div id="table">
          <TableNumber onClick={this.setTable(1)}>1</TableNumber>
          <TableNumber onClick={this.setTable(2)}>2</TableNumber>
          <TableNumber onClick={this.setTable(3)}>3</TableNumber>
          <TableNumber onClick={this.setTable(4)}>4</TableNumber>
          <TableNumber onClick={this.setTable(5)}>5</TableNumber>
          <TableNumber onClick={this.setTable(6)}>6</TableNumber>
        </div>
      </section>
    );
  }
};

export default withCookies(Home);
