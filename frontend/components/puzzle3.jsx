import React from 'react';

// Answer: Your name

class Puzzle3 extends React.Component {
  render() {

    return (
      <div>
        <h1>Puzzle Three</h1>
        <form id="puzzle3-form">
          <p>
            What belongs to you but other people use it more than you?
          </p>
          <p>
            <input type="text" name="puzzleAnswer" autocomplete="off" placeholder="Type here" />
          </p>

          <div>
            <button type="submit">submit</button>
          </div>
        </form>

      </div>
    );
  }
};

export default Puzzle3;
