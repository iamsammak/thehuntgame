import React from 'react';

import { getCurrentStage } from '../helpers';
import EmptyBody from './emptyBody';
import PersonHeader from './personHeader';

class Person0 extends React.Component {
  render() {
    const { gameState } = this.props;
    const stage = getCurrentStage(gameState);
    const name = 'Person0';

    let body = <EmptyBody name={name} />;

    return (
      <div>
        <PersonHeader name={name} />
        {body}
      </div>
    );
  }
}

export default Person0;
