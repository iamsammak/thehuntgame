import React from 'react';

import PuzzleHeader from './puzzleHeader';

// Answer: Your name

class Puzzle3 extends React.Component {
  render() {
    return (
      <div>
        <PuzzleHeader title="Puzzle Three" />
        <form id="puzzle3-form">
          <p>
            What belongs to you but other people use it more than you?
          </p>
          <p>
            <input type="text" name="puzzleAnswer" autoComplete="off" placeholder="Type here" />
          </p>

          <div>
            <button type="submit">submit</button>
          </div>
          <div>
            <button type="submit">submit</button>
          </div>
          <div>  
            <button type="submit">submit</button>

          </div>
        </form>

      </div>
    );
  }
}

export default Puzzle3;
