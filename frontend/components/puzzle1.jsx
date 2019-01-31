import React from 'react';

import { AnswerAwareInput } from './puzzle.jsx';

class Puzzle1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      cipher: "",
    };
    this.handleChange = this.handleChange.bind(this);

    const { socket } = props;
    socket.on('cipher_return', (data) => {
      this.setState({ cipher: data });
    });
    this.cipherPing();
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  submitAnswer() {
    const { send } = this.props;

    var userinput = this.state.value.toLowerCase();
    send('submit', { puzzle: '1', answer: userinput });
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
        <p>
          <AnswerAwareInput
            type="text"
            autocomplete="off"
            placeholder="Type here"
            correct={ correct }
            value= { value }
            onChange={this.handleChange}
          />
        </p>
        <div>
          <button type="submit" onClick={() =>this.submitAnswer()}>submit</button>
        </div>
      </div>
    );
  }
}

export default Puzzle1;
