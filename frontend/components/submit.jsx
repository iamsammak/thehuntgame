import React from 'react';
import styled from 'styled-components';

import { AnswerAwareInput } from "./puzzle";

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
      <span>
        <AnswerAwareInput
          type="text"
          autocomplete="off"
          placeholder="Type here"
          correct={correct}
          value={value}
          onChange={this.handleChange}
          disabled={disabled}
        />
        <button type="submit" onClick={this.submitAnswer} disabled={disabled}>submit</button>
      </span>
    );
  }
}

export default Submit;
