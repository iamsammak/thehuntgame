import React from 'react';
import { Redirect } from 'react-router-dom';

export default class Puzzle extends React.Component {
  constructor(props) {
    super(props);
    const { socket } = props;
    socket.on('submit_response', (data) => {
      if (data.correct) {
        this.setState({ correct: data.correct });
      }
    });

    this.state = {
      correct: false,
    }
  }

  render() {
    const { component: Component } = this.props;
    const { correct } = this.state;

    if (correct) {
      console.log('correct!');
      return <Redirect to="/main" />;
    }
    return <Component {...this.props} />;
  }
}
