import React from 'react';

import { Narration } from '../wrappers';
import { isSolved } from '../helpers';
import Submit from './submit';

class Puzzle2 extends React.Component {
  render() {
    const { gameState } = this.props;
    const solved = isSolved(gameState, '2');

    return (
      <div>
        <p>
          Oh, can you watch over the table for a minute? I&apos;ll be right back--thanks!
        </p>
        <Narration>You sit down and see a note that reads:</Narration>
        <p>
          Looked right past,
          <br />
          Gone in a blink;
          <br />
          A clue in plain sight,
          <br />
          Not written in ink.
        </p>
        <Narration>What in the world is this referring to?</Narration>
        <p>
          <Submit {...this.props} puzzleNumber="2" disabled={solved} />
        </p>
        {
          solved && (
            <p>
              Thank you again for covering me. I don&apos;t think the key is around here. You should check with the others and ask them.
            </p>
          )
        }
      </div>
    );
  }
}

export default Puzzle2;
