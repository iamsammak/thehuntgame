import React from 'react';
import { Redirect } from 'react-router-dom';

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

    if (correct === true) {
      return <Redirect to="/main" />;
    }
    return <Component correct = { this.state.correct } {...this.props} />;
  }
}
