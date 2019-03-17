import React from 'react';

import { Narration, SpeechBubbleSpacing } from '../wrappers';
import { isSolved } from '../helpers';
import SpeechBubble from './speechBubble';
import Submit from './submit';

class Puzzle2 extends React.Component {
  render() {
    const { gameState, personId } = this.props;
    const solved = isSolved(gameState, '2');

    return (
      <div>
        <SpeechBubble personId={personId}>
          Oh, can you watch over the table for a minute? I&apos;ll be right back--thanks!
        </SpeechBubble>
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
          solved ? (
            <SpeechBubble personId={personId}>
              Thank you again for covering me. I don&apos;t think the key is around here. You should check with the others and ask them.
            </SpeechBubble>
          ) : (
            <SpeechBubbleSpacing lines={3} />
          )
        }
      </div>
    );
  }
}

export default Puzzle2;
