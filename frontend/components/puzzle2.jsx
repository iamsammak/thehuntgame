import React from 'react';

// Answer: See o double you

class Puzzle2 extends React.Component {
  render() {

    return (
      <div>
        <h1>Puzzle Two</h1>
        <form id="puzzle2-form">
          <p>Can you write cow in 13 letters?</p>
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

export default Puzzle2;
