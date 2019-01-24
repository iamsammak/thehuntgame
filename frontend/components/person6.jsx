import React from 'react';

import { getCurrentStage } from '../helpers';
import EmptyBody from './emptyBody';
import PersonHeader from './personHeader';
import Puzzle5Clue from './puzzle5Clue';

class Person6 extends React.Component {
  render() {
    const { gameState } = this.props;
    const stage = getCurrentStage(gameState);

    let body = <EmptyBody />;
    if (stage === 5) {
      body = <Puzzle5Clue src="images/puzzle5_clue3.jpg" />;
    }

    return (
      <div>
        <PersonHeader name="Person6" src="images/placeholder.jpg" />
        {body}
      </div>
    );
  }
}

export default Person6;
