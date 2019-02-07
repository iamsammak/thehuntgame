import React from 'react';
import styled from 'styled-components';

import { getCurrentStage, formatElapsedTime } from '../helpers';

const Time = styled.div`
  font-family: monospace;
  font-size: 4em;
`;

class Finish extends React.Component {
  render() {
    const { gameState } = this.props;
    const stage = getCurrentStage(gameState);
    const { start_time, end_time } = gameState;
    const elapsed = new Date(end_time) - new Date(start_time);

    if (stage != 9) {
      return (
        <div>
          Hm...it doesn&apos;t look like you&apos;ve finished the game yet.
          <a href="/main">Continue</a>
        </div>
      );
    }

    return (
      <div>
        Congrats! Your finishing time is:
        <Time>
          {formatElapsedTime(elapsed)}
        </Time>
      </div>
    );
  }
}

export default Finish;
