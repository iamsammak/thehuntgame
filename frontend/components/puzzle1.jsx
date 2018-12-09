import React from 'react';

// Answer: getaway (caesar ciphered)

class Puzzle1 extends React.Component {
  render() {

    return (
      <div>
        <h1>Puzzle One</h1>
        <form id="puzzle1-form">
          <div id="cipher-container">
          </div>
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
}

export default Puzzle1;
