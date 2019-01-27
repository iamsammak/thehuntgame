import React from 'react';

import { getCurrentStage } from '../helpers';
import EmptyBody from './emptyBody';
import PersonHeader from './personHeader';
import Puzzle5Clue from './puzzle5Clue';
import Puzzle7Clue from './puzzle7Clue';

class Person3 extends React.Component {
  render() {
    const { gameState } = this.props;
    const stage = getCurrentStage(gameState);

    let body = <EmptyBody />;
    if (stage === 5) {
      body = <Puzzle5Clue src="images/puzzle5_clue4.jpg" />;
    } else if (stage === 7) {
      body = <Puzzle7Clue clue="clue2" />;
    }

    return (
      <div>
        <PersonHeader name="Person3" src="images/placeholder.jpg" />
        {body}
      </div>
    );
  }
}

export default Person3;
