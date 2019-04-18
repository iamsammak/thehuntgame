import React from 'react';
import styled from 'styled-components';

import { getCurrentStage, formatElapsedTime } from '../helpers';
import { Narration } from '../wrappers';

const Congrats = styled.p`
  font-size: 2em;
`;

const Time = styled.div`
  font-family: monospace;
  font-size: 3em;
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
          <br />
          <a href="/main">Continue</a>
        </div>
      );
    }

    return (
      <div>
        <p>
          Turns out the key was with the bride and groom at their sweetheart table all along. How anticlimactic, right?
        </p>
        <Congrats>CONGRATULATIONS!</Congrats>
        <p>
          Show them this screen and take a celebratory picture with them!
        </p>
        Your finishing time is:
        <Time>
          {formatElapsedTime(elapsed)}
        </Time>
        <br />
        <br />
        <Narration>
          Enjoyed this game? Know someone who&apos;s interested in having this at their event? Send your thoughts to <a href="mailto:thinkingalaud@gmail.com">thinkingalaud@gmail.com</a>.
        </Narration>
      </div>
    );
  }
}

export default Finish;
