import React from 'react';

import { getCurrentStage } from '../helpers';
import EmptyBody from './emptyBody';
import PersonHeader from './personHeader';

class Person2 extends React.Component {
  render() {
    const { gameState } = this.props;
    const stage = getCurrentStage(gameState);

    let body = <EmptyBody />;
    if (stage === 5) {
      body = <EmptyBody />;
    }

    return (
      <div>
        <PersonHeader name="Person2" src="images/placeholder.jpg" />
        {body}
      </div>
    );
  }
}

export default Person2;
