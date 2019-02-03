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
    if (stage === 5) {
      body = <div>Try talking to other members of the bridal party. I think they have some more information.</div>;
    }

    return (
      <div>
        <PersonHeader name={name} />
        {body}
      </div>
    );
  }
}

export default Person0;
