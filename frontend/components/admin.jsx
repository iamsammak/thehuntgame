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
      this.setState({ puzzleData: data['puzzleData'], gameStarted: data['gameStarted'] });
    });
    socket.on('gameStarted', (data) => {
      this.setState({ gameStarted: data['gameStarted'] });
    });
    this.state = {
      socket:socket,
      puzzleData:[],
      gameStarted: false
    };
    this.adminPing('load');
  }

  adminPing(trigger) {
    const { socket } = this.state;
    socket.emit('admin_ping', { 'trigger':trigger });
  }

  startGame() {
    this.adminPing('start_game');
  }

  stopGame() {
    this.adminPing('stop_game');
  }

  renderPuzzle(puzzle) {
    const { puzzleData } = this.state;
    var solvedCounter = 0;
    var tableCounter = puzzleData[puzzle].length;
    const clientElements = Object.values(puzzleData[puzzle]).map((elements,i) => {
      var innerElements = Object.entries(elements);
      var [[table]] = innerElements;
      var { started } = elements[table];
      var { solved } = elements[table];
      var hintCount = elements[table]['hint_count'];
      if (solved === true) {
        solvedCounter += 1;
      }
      return (
        <li key={i}>table: {table} --> started: <CheckIcon solved={started}/> solved: <CheckIcon solved={solved}/> hint count: {hintCount}</li>
      );
    });
    return [clientElements, solvedCounter, tableCounter];
  }

  render() {
    const { gameStarted, puzzleData } = this.state;
    let message;
    if (gameStarted === false) {
      message = "You have not started the game yet";
    } else {
      message = "Game has been started";
    }
    const tableElements = Object.entries(puzzleData).map(elements => {
      var [puzzle] = elements;
      if (puzzle === 'start_time') {
        return;

      } else {
        var puzzleRendered = this.renderPuzzle(puzzle);
        var [clientList, solvedCounter, tableCounter] = puzzleRendered;
        return (
          <div key={puzzle}>
            <h1>Puzzle  {puzzle}:</h1>
            <div>
              <p>Number of Tables Solved: {solvedCounter}/{tableCounter}</p>
              <p>{clientList} </p>
            </div>

          </div>
        );
      }
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
