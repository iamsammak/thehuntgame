import React from 'react';

import { AnswerAwareInput } from './puzzle.jsx';

// Answer: See o double yo

class Puzzle2 extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      value : ''
    };
  }

  submitAnswer() {
    var userinput = this.state.value.toLowerCase();
    this.props.send('submit', { puzzle: '2', answer: userinput });
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  render() {
    const { value } = this.state;
    const { correct } = this.props;
    return (
      <div>
        <p>Can you write cow in 13 letters?</p>
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

export default Puzzle2;
