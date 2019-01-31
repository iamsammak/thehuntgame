import React from 'react';
import styled from 'styled-components';

const Time = styled.div`
  font-family: monospace;
`;

const pad = (n) => {
  if (n < 10) {
    return '0' + n;
  }
  return n.toString();
};

class Timer extends React.Component {
  constructor(props) {
    super(props);
    const { start_time } = props;
    this.state = {
      start: Date.now() - start_time,
    };
    setInterval(() => {
      const { start_time } = this.props;
      this.setState({ start: Date.now() - start_time });
    });
  }

  render() {
    const { start } = this.state;
    const ms = Math.round(((start % 1000) / 101) * 10);
    const sec = Math.floor((start / 1000)) % 60;
    const min = Math.floor((start / 1000 / 60)) % 60;
    const hrs = Math.floor((start / 1000 / 60 / 60)) % 24;
    return (
      <Time>
        {pad(hrs)}:{pad(min)}:{pad(sec)}:{pad(ms)}
      </Time>
    );
  }
}

export default Timer;
