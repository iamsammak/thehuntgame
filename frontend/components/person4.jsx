import React from 'react';

import { getCurrentStage } from '../helpers';
import EmptyBody from './emptyBody';
import PersonHeader from './personHeader';

class Person4 extends React.Component {
  render() {
    const { gameState } = this.props;
    const stage = getCurrentStage(gameState);

    let body = <EmptyBody />;
    if (stage === 5) {
      body = <EmptyBody />;
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
