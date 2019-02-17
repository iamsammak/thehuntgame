import React from 'react';
import io from 'socket.io-client';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import faCheck from '@fortawesome/free-solid-svg-icons/faCheck';
import faTimes from '@fortawesome/free-solid-svg-icons/faTimes';

library.add(
  faCheck,
  faTimes,
);

const CheckIcon = styled(FontAwesomeIcon).attrs( props => ({
  icon: props.solved ? 'check' : 'times',
}))`
  color: ${props => (props.solved ? 'green' : 'red')};
`;

class Admin extends React.Component {
  constructor(props) {
    super(props);
    const socket = io(SOCKET_URL);
    socket.on('admin_data', (data) => {
      this.setState({ puzzleData: data['puzzleData'], tableData : data['tableData'], gameStarted: data['gameStarted'] });
    });
    socket.on('game_started', (data) => {
      this.setState({ gameStarted: data['gameStarted'] });
    });
    this.state = {
      socket:socket,
      puzzleData:[],
      gameStarted: false
    };
    this.adminPing('load');
    this.renderTable = this.renderTable.bind(this)
    this.renderPuzzle = this.renderPuzzle.bind(this)
  }

  adminPing(trigger) {
    const { socket } = this.state;
    socket.emit('load_admin_data', { 'trigger':trigger });
  }

  startGame() {
    this.adminPing('start_game');
  }

  renderTable(tableDataEntry) {
    var [table, info] = tableDataEntry
    var {started, solved, hintCount} = info
    return (
      <li key={table}>table: {table} --> started: <CheckIcon solved={started}/> solved: <CheckIcon solved={solved}/> hint count: {hintCount}</li>

    );
  }

  renderPuzzle(data) {
    var [puzzle, tableData] = data
    var solvedCounter = 0;
    var tableCounter = Object.keys(tableData).length 
    for (var table in tableData) {
      var { solved } = tableData[table]
      if (solved ===true) {
        solvedCounter += 1
      };
    }
    if (puzzle === 'start_time') {
       return;
    } else {
    return (
      <div key={puzzle}>
        <h1>Puzzle {puzzle}: </h1>
        <p>Number of Tables Solved: {solvedCounter}/{tableCounter}</p>
        {Object.entries(tableData).map(this.renderTable)}
      </div>
      );
    };
  }

  render() {
    const { gameStarted, puzzleData } = this.state;
    let message;
    if (gameStarted === false) {
      message = "You have not started the game yet";
    } else {
      message = "Game has been started";
    }
    return (
      <div>
        <button type = "submit" onClick ={() =>this.startGame()}> Press Me! </button>
        <button type = "submit" onClick ={() =>this.stopGame()}> Press Me to Stop Game! </button>
        <p>{message}</p>
        <div>
          {Object.entries(puzzleData).map(this.renderPuzzle)}
        </div>
      </div>
    );
  }
}

export default Admin;
