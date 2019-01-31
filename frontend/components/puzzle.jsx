import React from 'react';
import { Redirect } from 'react-router-dom';
import styled, { css, keyframes } from 'styled-components';

// style component for incorrect answers
export const AnswerAwareInput = styled.input`
  border-color: ${props => (props.correct === false ? 'red' : '#f8f8f8t')};
  text-color: ${props => (props.correct === false ? 'red' : 'black')};
`;

const shakeAnimation = keyframes`
  10%, 90% {
    transform: translate3d(-1px, 0, 0);
  }
  20%, 80% {
    transform: translate3d(2px, 0, 0);
  }
  30%, 50%, 70% {
    transform: translate3d(-4px, 0, 0);
  }
  40%, 60% {
    transform: translate3d(4px, 0, 0);
  }
`;

export const AnswerAwareDiv = styled.div`
  display:inline-block;
  color: ${props => (props.correct === false ? 'red' : 'black')};
  border-bottom: 2px solid;
  width: 20px;
  height: 20px;
  margin: 2px;
  vertical-align: middle;
  animation: ${props => {
    return props.shake ?
      css`
        ${shakeAnimation} 0.5s cubic-bezier(.36,.07,.19,.97)
      `
      : null;
  }};
`;

export default class Puzzle extends React.Component {
  constructor(props) {
    super(props);
    const { socket } = props;
    this.resetCorrect = this.resetCorrect.bind(this);
    this.submitResponseHandler = this.submitResponseHandler.bind(this);
    socket.on('submit_response', this.submitResponseHandler);

    this.state = {
      correct: null,
    };
  }

  componentWillUnmount() {
    const { socket } = this.props;

    socket.removeListener('submit_response', this.submitResponseHandler);
  }

  submitResponseHandler(data) {
    this.setState({ correct: data.correct });
  }

  resetCorrect() {
    this.setState({ correct : null });
  }

  render() {
    const { component: Component } = this.props;
    const { correct } = this.state;
    if (correct === true) {
      return <Redirect to="/main" />;
    } else {
      return <Component correct={correct} reset={this.resetCorrect} {...this.props} />;
    }
  }
}
