import React from 'react';
import { render } from 'react-dom';
import io from 'socket.io-client';
class Admin extends React.Component {
  constructor(props) {
    super(props);
    const socket = io(SOCKET_URL);
    socket.on('admin_return', (data) => {
      var dataArray = []

      this.setState({gamestate : data['gamestate'], tabledata : data['tabledata']});
    console.log('i heard an answer')
    console.log(this.state)
    });
    this.state = {
      socket:socket,
      tabledata : ['initialvalue'],
      gamestate : {},
      info: [['Hello! Welcome to the Admin Page. Press the button to see the progress!']],
    };
    this.adminPing();
  }

  adminPing() {
    const { socket } = this.state
    socket.emit('admin_ping', {})
    console.log('i made a ping')
  }

  renderAdminfunction() {
    const { tabledata } = this.state
    console.log('testerfunction here')
    let tableelements
    tableelements = Object.entries(tabledata).map(elements => {
      var table = elements[0]
      console.log(table)
      var clientlist = this.renderClients(table);
      var tablegamestate = this.renderPuzzle(table);
       return (
        <div key={table}>
          <h1>{table}</h1>
          <p>Participants: {clientlist} </p>
          <p>Status: {tablegamestate} </p>
        </div>
      );
    })
     this.setState({info:tableelements})
}

  renderClients(table) {
    const { tabledata } = this.state
    const clientelements = Object.entries(tabledata[table]).map((elements,i) => {
      var clients = elements[1]
      return (
          <li key={i}>{clients}</li>
        )
      });
    return clientelements
  }

 renderPuzzle(table) {
    const { gamestate } = this.state
    const puzzleelements = Object.entries(gamestate[table]).map(elements => {
      var puzzle = elements[0]
      var solved = elements[1]['solved']
      console.log(solved)
      return (
          <li key={puzzle}>puzzle {puzzle} is solved? {solved.toString()}</li>
      )
    });
    return puzzleelements
  }

  render() {  
    const { info } = this.state;
    console.log(this.state)
     return(
      <div>
       <button type = "submit" onClick ={() =>this.renderAdminfunction()}> Press Me! </button>
        <div>
          {info}
        </div>
    </div>
    );
  }
}

export default Admin;
