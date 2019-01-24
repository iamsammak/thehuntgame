import React from 'react';

import { getCurrentStage } from '../helpers';
import EmptyBody from './emptyBody';
import PersonHeader from './personHeader';
import Puzzle5Clue from './puzzle5Clue';
import Puzzle6 from './puzzle6';

class Person6 extends React.Component {
  render() {
    const { gameState, send } = this.props;
    const stage = getCurrentStage(gameState);

    let body = <EmptyBody />;
    if (stage === 5) {
      body = <Puzzle5Clue src="images/puzzle5_clue3.jpg" />;
    } else if (stage === 6) {
      body = <Puzzle6 send={send} />;
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
