import React from 'react';

import { getCurrentStage } from '../helpers';
import Base from './base';
import Hint from './hint';
import Puzzle from './puzzle';
import Puzzle4 from './puzzle4';
import Puzzle5Clue from './puzzle5Clue';
import Puzzle7Clue from './puzzle7Clue';
import PersonHeader from './personHeader';

class Person0 extends React.Component {
  render() {
    const { gameState, personId, socket } = this.props;
    const stage = getCurrentStage(gameState);
    const showBase = true;
    const hint = <Hint hint={stage.toString()} socket={socket} />;

    let body;
    if (stage === 1) {
      body = (
        <div>
          <p>
            Hi, I&apos;m Matt, the best man and the brother of the groom. We really need your help! With everything going on today, we somehow lost the key to the getaway car. No one is sure who had it last, so you&apos;ll need to ask around and see if anyone can remember anything.
          </p>
          <p>
            It doesn&apos;t matter which table finds it first--I&apos;m sure Chris and Christine would love for your table to finish this entire adventure and show them that you found the key!
          </p>
          <p>
            I told each of the bridal party members to look for the key. If you can&apos;t figure out what they&apos;re asking for or how to help them, ask me and I can give you a hint.
          </p>
        </div>
      );
    } else if (stage > 1 && stage <= 4) {
      body = <Puzzle {...this.props} component={Puzzle4} />;
    } else if (stage === 5) {
      body = <Puzzle5Clue clue="clue0" personId={personId} />;
    } else if (stage === 7) {
      body = <Puzzle7Clue personId={personId} />;
    }

    return (
      <div>
        <PersonHeader personId={personId} />
        {showBase && <Base personId={personId} />}
        {hint}
        <br />
        {body}
      </div>
    );
  }
}

export default Person0;
