import React from 'react';

import { getCurrentStage } from '../helpers';
import EmptyBody from './emptyBody';
import PersonHeader from './personHeader';
import Puzzle7Clue from './puzzle7Clue';

class Person4 extends React.Component {
  render() {
    const { gameState } = this.props;
    const stage = getCurrentStage(gameState);

    let body = <EmptyBody />;
    if (stage === 5) {
      body = <EmptyBody />;
    } else if (stage === 7) {
      body = <Puzzle7Clue clue="clue3" />;
    }

    return (
      <div>
        <PersonHeader name="Person4" src="images/placeholder.jpg" />
        {body}
      </div>
    );
  }
}

export default Person4;