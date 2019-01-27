import React from 'react';

import { getCurrentStage } from '../helpers';
import EmptyBody from './emptyBody';
import PersonHeader from './personHeader';
import Puzzle from './puzzle';
import Puzzle5Clue from './puzzle5Clue';
import Puzzle7 from './puzzle7';

class Person7 extends React.Component {
  render() {
    const { gameState } = this.props;
    const stage = getCurrentStage(gameState);

    let body = <EmptyBody />;
    if (stage === 5) {
      body = <Puzzle5Clue src="images/puzzle5_clue2.jpg" />;
    } else if (stage === 7) {
      body = <Puzzle {...this.props} component={Puzzle7} />;
    }

    return (
      <div>
        <PersonHeader name="Person7" src="images/placeholder.jpg" />
        {body}
      </div>
    );
  }
}

export default Person7;
