import React from 'react';

import { getCurrentStage } from '../helpers';
import EmptyBody from './emptyBody';
import PersonHeader from './personHeader';
import Puzzle5Clue from './puzzle5Clue';
import Puzzle7Clue from './puzzle7Clue';

class Person1 extends React.Component {
  render() {
    const { gameState } = this.props;
    const stage = getCurrentStage(gameState);

    let body = <EmptyBody />;
    if (stage === 5) {
      body = <Puzzle5Clue src="images/puzzle5_clue5.jpg" />;
    } else if (stage === 7) {
      body = <Puzzle7Clue clue="clue4" />;
    }

    return (
      <div>
        <PersonHeader name="Person1" src="images/placeholder.jpg" />
        {body}
      </div>
    );
  }
}

export default Person1;
