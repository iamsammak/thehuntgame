import React from 'react';
import io from 'socket.io-client';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas);


const CheckIcon = styled(FontAwesomeIcon).attrs( props => ({
  icon: props.solved ? 'check' : 'times',
}))`
  color: ${props => (props.solved ? 'green' : 'red')};
`;

class Admin extends React.Component {
  constructor(props) {
    super(props);
    const socket = io(SOCKET_URL);
    socket.on('admin_return', (data) => {
      this.setState({ gameState : data['gameState'], tableData : data['tableData'], gameStarted: data['gameStarted'] });
    });
     socket.on('gameStarted', (data) => {
      this.setState({ gameStarted: data['gameStarted'] });
    });
   this.state = {
      socket:socket,
      solved:false,
      tableData : [],
      gameState : [''],
      gameStarted: false
    };
    this.adminPing('load');
  }

  adminPing(trigger) {
    const { socket } = this.state;
    socket.emit('admin_ping', {'trigger':trigger});
  }

  startGame() {
    this.adminPing('start_game')
  }

  stopGame() {
    this.adminPing('stop_game')
  }

  renderClients(table) {
    const { tableData } = this.state;
    const clientElements = Object.entries(tableData[table]).map((elements,i) => {
      var clients = elements[1];
      return (
        <li key={i}>{clients}</li>
      );
    });
    return clientElements;
  }

  renderPuzzle(table) {
    const { gameState } = this.state;
    const puzzleElements = Object.entries(gameState[table]).map(elements => {
      var puzzle = elements[0];
      var solved = elements[1]['solved'];
      return (
        <li key={puzzle}>puzzle {puzzle}: <CheckIcon solved={solved}/></li>
      );
    });
    return puzzleElements;
  }

  render() {
    const { tableData, gameStarted } = this.state;
    if (gameStarted === false) {
      var message = "You have not started the game yet"
  } else {
    var message = "Game has been started"
  }
    const tableElements = Object.entries(tableData).map(elements => {
      var table = elements[0];
      var clientList = this.renderClients(table);
      var tableGameState = this.renderPuzzle(table);
      return (
        <div key={table}>
          <h1>{table}</h1>
          <p>Participants: {clientList} </p>
          <p>Status: {tableGameState} </p>

        </div>
      );
    });

    return (
      <div>
        <button type = "submit" onClick ={() =>this.startGame()}> Press Me! </button>
        <button type = "submit" onClick ={() =>this.stopGame()}> Press Me to Stop Game! </button>
       <p>{message}</p>
        <div>
          { tableElements }
        </div>
      </div>
    );
  }
}

export default Admin;
