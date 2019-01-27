import React from 'react';

import Submit from './submit';
import Puzzle5Clue from './puzzle5Clue';

class Puzzle5 extends React.Component {
  render() {
    return (
      <div>
        <Puzzle5Clue clue="clue0" />
        <Submit {...this.props} />
      </div>
    );
  }
}

export default Puzzle5;
