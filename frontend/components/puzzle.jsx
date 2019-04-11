import React from 'react';

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
    return <Component correct={correct} reset={this.resetCorrect} {...this.props} />;
  }
}
