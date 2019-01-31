import React from 'react';

import Submit from './submit';

class Puzzle1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cipher: "",
    };

    const { socket } = props;
    socket.on('cipher_return', (data) => {
      this.setState({ cipher: data });
    });
    this.cipherPing();
  }

  cipherPing() {
    const { send } = this.props;

    send('cipher_ping', {});
  }

  render() {
    const { value, cipher } = this.state;
    const { correct } = this.props;
    return (
      <div>
        <div>
          {cipher}
        </div>
        <Submit {...this.props} puzzleNumber={1} />
      </div>
    );
  }
}

export default Puzzle1;
