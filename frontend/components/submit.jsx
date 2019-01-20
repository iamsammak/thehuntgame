import React from 'react';
import styled from 'styled-components';

const AnswerAwareInput = styled.input`
  border-color: ${props => (props.correct === false ? 'red' : '#f8f8f8t')};
  text-color: ${props => (props.correct === false ? 'red' : 'black')};
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
    const { send } = this.props;
    const { value } = this.state;
    send("submit", { answer: value });
  }

  handleChange(value) {
    this.setState({ value: value });
  }

  render() {
    const { correct } = this.props;
    const { value } = this.state;

    return (
      <div>
        <AnswerAwareInput
          type="text"
          autocomplete="off"
          placeholder="Type here"
          correct={correct}
          value={value}
          onChange={this.handleChange}
        />
        <button type="submit" onClick={this.submitAnswer}>submit</button>
      </div>
    );
  }
}

export default Submit;
