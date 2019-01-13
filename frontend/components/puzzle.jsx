import React from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';

//style component for incorrect answers
export const AnswerAwareInput = styled.input`
    border-color: ${props => (props.correct === false ? 'red' : '#f8f8f8t')};
    text-color: ${props => (props.correct === false ? 'red' : 'black')};
  `;
export const AnswerAwareDiv = styled.div`
    display:inline-block;
    color: ${props => (props.correct === false ? 'red' : 'black')};
    border-bottom: 2px solid;
    width: 20px;
    height: 20px;
    margin: 2px;
    vertical-align: middle;
  `;

export default class Puzzle extends React.Component {
  constructor(props) {
    super(props);
    const { socket } = props;
    this.resetCorrect = this.resetCorrect.bind(this);
    socket.on('submit_response', (data) => {
      this.setState({ correct: data.correct });
    });

    this.state = {
      correct: null,
    };
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
      return <Component correct = { correct } reset = {this.resetCorrect} {...this.props} />;

    }
  }
}
