import React from 'react';
import { Redirect } from 'react-router-dom';

export default class Puzzle extends React.Component {
  constructor(props) {
    super(props);
    const { socket } = props;
    socket.on('submit_response', (data) => {
      if (data.correct) {
        this.setState({ correct: data.correct });
      } else {
        this.setState({incorrectanswer: true});
       }
    });

    this.state = {
      correct: false,
      incorrectanswer: false
    }
  }

  render() {
    const { component: Component } = this.props;
    const { correct } = this.state;

    if (correct) {
       return <Redirect to="/main" />;
    } else if (this.state.incorrectanswer === true) {
      console.log('there was an incorrect answer')
      return <Component incorrectanswer = { this.state.incorrectanswer }  {...this.props} />
    }
    return <Component {...this.props} />;
  }
}
