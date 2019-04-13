import React from 'react';
import styled from 'styled-components';

import { Button } from './buttons';
import { CenteredRow } from '../wrappers';

const AnswerAwareInput = styled.input`
  // prevents iOS from zooming in on inputs on focus
  font-size: 100%;
  border-color: ${props => (props.correct === false ? 'red' : '#f8f8f8t')};
  text-color: ${props => (props.correct === false ? 'red' : 'black')};
  outline: none;
`;

class Submit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
    };

    this.submitAnswer = this.submitAnswer.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  submitAnswer() {
    const { send, puzzleNumber } = this.props;
    const { value } = this.state;

    send("submit", { puzzle: puzzleNumber, answer: value });
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  render() {
    const { correct, disabled } = this.props;
    const { value } = this.state;

    return (
      <CenteredRow>
        <AnswerAwareInput
          type="text"
          autocomplete="off"
          placeholder="Type here"
          correct={correct}
          value={value}
          onChange={this.handleChange}
          disabled={disabled}
        />
        <Button type="submit" onClick={this.submitAnswer} disabled={disabled}>Submit</Button>
      </CenteredRow>
    );
  }
}

export default Submit;
