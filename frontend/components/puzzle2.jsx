import React from 'react';
import styled from 'styled-components';

import PuzzleHeader from './puzzleHeader';

// Answer: See o double yo

//style component for incorrect answers
const AnswerAwareInput = styled.input`
  border-color: ${props => (props.correct === false ? 'red' : '#f8f8f8t')};
  text-color: ${props => (props.correct === false ? 'red' : 'black')};
`;

class Puzzle2 extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      value : ''
    };
  }

  submitanswer() {
    var userinput = this.state.value;
    this.props.send('submit', { puzzle: '1', answer: userinput });
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  render() {
    return (
      <div>
        <PuzzleHeader title="Puzzle Two" />
        <form id="puzzle2-form">
          <p>Can you write cow in 13 letters?</p>
          <p>
            <AnswerAwareInput
              type="text"
              autocomplete="off"
              placeholder="Type here"
              correct={this.props.correct}
              value= {this.state.value}
              onChange={this.handleChange}
            />
          </p>
          <div>
            <button type="submit" onClick={() =>this.submitanswer()}>submit</button>
          </div>
        </form>

      </div>
    );
  }
}

export default Puzzle2;
