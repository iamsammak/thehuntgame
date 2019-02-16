import React from 'react';

import { isSolved } from '../helpers';
import Submit from './submit';
import Puzzle5Clue from './puzzle5Clue';

class Puzzle5 extends React.Component {
  render() {
    const { gameState } = this.props;
    const solved = isSolved(gameState, '5');

    return (
      <div>
        <p>
          Earlier this morning, Chris gave us a piece of paper and said to hold onto it. We had the smart idea of tearing it apart and splitting up the pieces among us...maybe that piece of paper has something to do with the key.
        </p>
        <Puzzle5Clue clue="clue0" />
        <p>
          <Submit {...this.props} puzzleNumber={'5'} />
        </p>
        {
          solved && (
            <p>
              ...All that for nothing. I guess it&apos;s not mixed in with the photobooth props.
            </p>
          )
        }
      </div>
    );
  }
}

export default Puzzle5;
