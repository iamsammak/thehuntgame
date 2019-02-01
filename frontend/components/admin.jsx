import React from 'react';
import { render } from 'react-dom';
import io from 'socket.io-client';
class Admin extends React.Component {
  constructor(props) {
    super(props);
    const socket = io(SOCKET_URL);
    socket.on('admin_return', (data) => {
      var dataArray = []

      this.setState({gamestate : data['gamestate'], tabledata : data['tabledata'], finaltest: data['finaltest']});
    console.log('i heard an answer')
    console.log(this.state)
    });
    this.state = {
      socket:socket,
      tabledata : ['initialvalue'],
      gamestate : {},
      info: [['hello']],
      test: ['im the test'],
      entrytest:['initial entry test'],
      finaltest: ['initial final test']

    };
    this.adminPing();
  }

  adminPing() {
    const { socket } = this.state
    socket.emit('admin_ping', {})
    console.log('i made a ping')
  }

  renderTableinfo() {
    var infotest = this.state.info
    var testarray = infotest[0]
    console.log(testarray)
    var maptest = testarray.map((element) => <li> {element}</li>);
    return (
      <ul>{maptest} </ul>
    );
    };

  testerfunction() {
    const { finaltest } = this.state
    console.log('testerfunction here')
    var holygrail = {}
    let gamestatemap
    let clientmap
    for (var table in finaltest) {
      var tabledata = finaltest[table]
      console.log(tabledata)
//data is being overwritten. need to store it somewhere after writing
      gamestatemap = Object.entries(tabledata[0]).map(elements => {
        console.log(elements)
        const puzzledata = Object.entries(elements)
        console.log(puzzledata)
        var puzzle = puzzledata[0][0]
        var puzzlesolved = Object.values(puzzledata[1][1])
        console.log('here is a puzzle')
      return (
        <div>
          <li key={puzzle}>puzzle {puzzle} is solved? {puzzlesolved.toString()}</li>
        </div>
      );

    })
      clientmap = tabledata[1].map(clients => {
          return (
            <li>{clients} </li>
          )
    });
   holygrail[table] = [clientmap,gamestatemap] 
  }
    this.setState({info:holygrail[2][0], test:holygrail[2][1]})
    };


  testerfunction2() {
    const { tabledata } = this.state
    var beam = Object.keys(tabledata)
    console.log('testerfunction2 here')
    let newteststate
    newteststate = Object.values(tabledata).map(clients => {
      for (var stuff in clients) {
        console.log(stuff)
        console.log(clients[stuff])
      return (
        <p> {clients} </p>
      );}

})
    this.setState({info:newteststate})
    };


  testerfunction3() {
    const { gamestate } = this.state
    console.log('testerfunction3 here')
    let newteststate
    for (var key in gamestate) {
      newteststate = Object.entries(gamestate[key]).map(elements => {
        console.log(elements)
        const thing = Object.values(elements[1])
        const puzzlenumber = elements[0]
        console.log(puzzlenumber)
      return (
        <p key={puzzlenumber}>puzzle {puzzlenumber.toString()} is solved? {thing.toString()}</p>
      );

    })
  }
    this.setState({entrytest:newteststate})
    };

// doesnt work because im passing dict. Need to change dict into array and  map each item in array out to component
  render() {  
    console.log('now i render')
    console.log(this.state)
    const { tabledata,info, test, entrytest } = this.state;
     return(
      <div>
       <button type = "submit" onClick ={() =>this.testerfunction()}> im a button </button>
       <button type = "submit" onClick ={() =>this.testerfunction2()}> im a second button </button>
      <button type = "submit" onClick ={() =>this.testerfunction3()}> im a third button </button>
        <ul>
          {info}
        </ul>
        <div> {test} </div>
        <div> {entrytest} </div>
    </div>
    );
  }
}

export default Admin;
