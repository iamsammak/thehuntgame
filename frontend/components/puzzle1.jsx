import React from 'react';
import { AnswerAwareInput } from './puzzle.jsx';

import PuzzleHeader from './puzzleHeader';

// Answer: getaway (caesar ciphered)
class Puzzle1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }
  submitAnswer() {
    var userinput = this.state.value;
    this.props.send('submit', { puzzle: '1', answer: userinput });
  }
  render() {
    const { value } = this.state;
    const { correct } = this.props;
    return (
      <div>
        <PuzzleHeader title="Puzzle One" />
        <div id="cipher-container">
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
