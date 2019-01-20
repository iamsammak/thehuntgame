import React from 'react';

import { getCurrentStage } from '../helpers';
import EmptyBody from './emptyBody';
import PersonHeader from './personHeader';
import Puzzle from './puzzle';
import Puzzle5 from './puzzle5';

class Person5 extends React.Component {
  render() {
    const { gameState } = this.props;
    const stage = getCurrentStage(gameState);

    let body = <EmptyBody />;
    if (stage === 5) {
      body = <Puzzle {...this.props} component={Puzzle5} />;
    }

    return (
      <div>
        <PersonHeader name="Person5" src="images/placeholder.jpg" />
        {body}
      </div>
    );
  }
}

export default Person5;
