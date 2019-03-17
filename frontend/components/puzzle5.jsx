import React from 'react';

import { isSolved } from '../helpers';
import SpeechBubble from './speechBubble';
import Submit from './submit';
import Puzzle5Clue from './puzzle5Clue';

class Puzzle5 extends React.Component {
  render() {
    const { gameState, personId } = this.props;
    const solved = isSolved(gameState, '5');

    return (
      <div>
        <SpeechBubble personId={personId}>
          Earlier this morning, Chris gave us a piece of paper and said to hold onto it. We had the smart idea of tearing it apart and splitting up the pieces among us...maybe that piece of paper has something to do with the key.
        </SpeechBubble>
        <Puzzle5Clue clue="clue7" personId={personId} />
        <p>
          <Submit {...this.props} puzzleNumber="5" disabled={solved} />
        </p>
        {
          solved && (
            <SpeechBubble personId={personId}>
              ...All that for nothing. I guess it&apos;s not mixed in with the photobooth props.
            </SpeechBubble>
          )
        }
      </div>
    );
  }
}

export default Puzzle5;
