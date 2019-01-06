import React from 'react';

class Puzzle5 extends React.Component {
  constructor(props) {
    super(props);

    props.socket.on('puzzle5_join_response', (data) => {
      this.setState({
        switchIndex: data.switch_index,
        total: data.total,
      });
    });

    props.send('puzzle5_join', {});

    this.state = {
      total: 0,
      switchIndex: null,
    };
  }

  render() {
    const {
      total,
      switchIndex,
    } = this.state;

    const switches = [...Array(total).keys()].map((i) => {
      return (
        <div key={i}>
          {i === switchIndex ? 'Y' : 'X'}
        </div>
      );
    });

    return (
      <div>
        <h1>Puzzle Five</h1>
        {switches}
      </div>
    );
  }
}

export default Puzzle5;
