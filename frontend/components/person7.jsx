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
    const name = 'Helena';

    let body = <EmptyBody name={name} />;
    if (stage === 5) {
      body = <Puzzle5Clue clue="clue1" />;
    } else if (stage === 7) {
      body = <Puzzle {...this.props} component={Puzzle7} />;
    }

    return (
      <div>
        <PersonHeader name={name} />
        {body}
      </div>
    );
  }
}

export default Person7;
