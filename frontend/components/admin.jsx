import React from 'react';
import { render } from 'react-dom';
import io from 'socket.io-client';
class Admin extends React.Component {
  constructor(props) {
    super(props);
    const socket = io(SOCKET_URL);
    socket.on('admin_return', (data) => {
      var dataArray = []

      this.setState({gameState : data['gameState'], tableData : data['tableData']});
    console.log('i heard an answer')
    console.log(this.state)
    });
    this.state = {
      socket:socket,
      tableData : [['initialValue']],
      gameState : [''],
      info: [['Hello! Welcome to the Admin Page. Press the button to see the progress!']],
    };
    this.adminPing();
  }

  adminPing() {
    const { socket } = this.state
    socket.emit('admin_ping', {})
    console.log('i made a ping')
  }

  startGame() {
    console.log('this will be the start game button')
  }
  renderClients(table) {
    const { tableData } = this.state
    const clientElements = Object.entries(tableData[table]).map((elements,i) => {
      var clients = elements[1]
      return (
          <li key={i}>{clients}</li>
        )
      });
    return clientElements
  }

 renderPuzzle(table) {
    const { gameState } = this.state
    const puzzleElements = Object.entries(gameState[table]).map(elements => {
      var puzzle = elements[0]
      var solved = elements[1]['solved']
      console.log(solved)
      return (
          <li key={puzzle}>puzzle {puzzle} is solved? {solved.toString()}</li>
      )
    });
    return puzzleElements
  }

  render() {  
 
    const { tableData } = this.state
    const tableElements = Object.entries(tableData).map(elements => {
      var table = elements[0]
      console.log(table)
      var clientList = this.renderClients(table);
      var tableGamestate = this.renderPuzzle(table);
       return (
        <div key={table}>
          <h1>{table}</h1>
          <p>Participants: {clientList} </p>
          <p>Status: {tableGamestate} </p>
        </div>
      );
    })

     return(
      <div>
       <button type = "submit" onClick ={() =>this.startGame()}> Press Me! </button>
        <div>
          { tableElements }
        </div>
    </div>
    );
  }
}

export default Admin;
