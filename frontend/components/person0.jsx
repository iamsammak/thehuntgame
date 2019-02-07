import React from 'react';

import { getCurrentStage } from '../helpers';
import Base from './base';
import PersonHeader from './personHeader';

class Person0 extends React.Component {
  render() {
    const { gameState, name } = this.props;
    const stage = getCurrentStage(gameState);
    const showBase = true;

    let body;
    if (stage === 1) {
      body = (
        <div>
Hi, I'm Matt, the best man and the brother of the groom. We really need your help! With everything going on today, we somehow lost the key to the getaway car. No one is sure who had it last, so you'll need to ask around and see if anyone can remember anything.
          <br />
It doesn't matter which table finds it first--I'm sure Chris and Christine would love for your table to finish this entire adventure and show them that you found the key!
          <br />
I told each of the bridal party members to look for the key. If you can't figure out what they're asking for or how to help them, ask me and I can give you a hint.
        </div>
      );
    } else if (stage === 5) {
      body = <div>Try talking to other members of the bridal party. I think they have some more information.</div>;
    }

    return (
      <div>
        <PersonHeader name={name} />
        {showBase && <Base name={name} />}
        {body}
      </div>
    );
  }
}

export default Person0;
