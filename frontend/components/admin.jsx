import React from 'react';
import { render } from 'react-dom';
class Admin extends React.Component {
  constructor(props) {
    super(props);
    const socket = io(SOCKET_URL);
    socket.on('admin_return', (data) => {
      var dataArray = []
      console.log('im in admin return')
//      for (var key in data) {
//        dataArray.push(data[key])
//    }
      this.setState({info : [data]});
      console.log(this.state)
//      this.setState({gamestate:data['game_state'], clients:data['CLIENTS']});
    });
    this.state = {
      socket:socket,
      info: ''

    };
    this.adminPing();
  }

  adminPing() {
    const { socket } = this.state
    socket.emit('admin_ping', {})
  }

  renderTableinfo() {
    var infotest = this.state.info
    for (var key in infotest) {
      var testarray = infotest[key]
      var maptest = testarray.map((testarray) => <li> {testarray}</li>);
    return (
      <ul>{maptest} </ul>
    );
    };
}

// doesnt work because im passing dict. Need to change dict into array and  map each item in array out to component
  render() {  
    console.log(this.state)
    this.renderTableinfo.bind(this)
    return(
      <div>
        {var test = this.renderTableinfo}
      </div>
    
    );
  }
}

export default Admin;
