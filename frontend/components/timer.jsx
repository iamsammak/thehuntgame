import React from 'react';
import styled from 'styled-components';

import { formatElapsedTime } from '../helpers';

const Time = styled.div`
  font-family: monospace;
`;

class Timer extends React.Component {
  constructor(props) {
    super(props);
    const { start_time } = props;
    this.state = {
      start: new Date(start_time),
      end: Date.now(),
    };
    setInterval(() => {
      this.setState({ end: Date.now() });
    });
  }

  render() {
    const { start, end } = this.state;
    const elapsed = end - start;
    return (
      <Time>
        {formatElapsedTime(elapsed)}
      </Time>
    );
  }
}

export default Timer;
