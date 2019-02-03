import React from 'react';

import Submit from './submit';

class Puzzle2 extends React.Component {
  render() {
    const { correct } = this.props;

    return (
      <div>
        <p>Can you write cow in 13 letters?</p>
        <p>
          <Submit {...this.props} puzzleNumber={2} />
        </p>
      </div>
    );
  }
}

export default Puzzle2;
