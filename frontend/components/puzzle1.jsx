import React from 'react';
import { AnswerAwareInput } from './puzzle.jsx';

import PuzzleHeader from './puzzleHeader';

// Answer: getaway (caesar ciphered)
class Puzzle1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      cipher: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.cipherPing = this.cipherPing.bind(this);

    const { socket } = props;
    socket.on('cipher_return', (data) => {
      this.setState({ cipher: data });
    });
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }
  submitAnswer() {
    var userinput = this.state.value;
    this.props.send('submit', { puzzle: '1', answer: userinput });
  }

  cipherPing() {
    this.props.ping('cipher_ping', { 'hello': 'hello' });
  }
  render() {
    const { value } = this.state;
    const { correct } = this.props;
    this.cipherPing();
    return (
      <div>
        <PuzzleHeader title="Puzzle One" />
        <div id="cipher-container">
          {this.state.cipher}
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
