import React from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components'
 
 //style component for incorrect answers
  export const AnswerAwareInput = styled.input`
    border-color: ${props => props.correct === false ? 'red' : '#f8f8f8t'};
    text-color: ${props => props.correct === false ? 'red' : 'black'};
  `;
   export const AnswerAwareDiv = styled.div`
    border-color: ${props => props.correct === false ? 'red' : '#f8f8f8t'};
    text-color: ${props => props.correct === false ? 'red' : 'black'};
  `;
 
export default class Puzzle extends React.Component {
  constructor(props) {
    super(props);
    const { socket } = props;
    socket.on('submit_response', (data) => {
      this.setState({ correct: data.correct });
    });

    this.state = {
      correct: null
    };
  }

  render() {
    const { component: Component } = this.props;
    const { correct } = this.state;

    if (correct=== true) {
       return <Redirect to="/main" />;
    } else {
       return <Component correct = { this.state.correct } {...this.props} />

  }
}
}
