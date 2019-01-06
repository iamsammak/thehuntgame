import React from 'react';

class Puzzle4 extends React.Component {
  render() {

    return (
      <div>
        <h1>Puzzle Four</h1>
        <div className="riddle">
          <p>Some riddle pertaining to the pictures below</p>
          <p>make the correct selections are you&apos;ll best this foe</p>
        </div>
        <br/>
        <div className="image-keypad-container">
          <button id="keypad-1" className="keypad-image">1</button>
          <button id="keypad-2" className="keypad-image">2</button>
          <button id="keypad-3" className="keypad-image">3</button>
          <button id="keypad-4" className="keypad-image">4</button>
          <button id="keypad-5" className="keypad-image">5</button>
          <button id="keypad-6" className="keypad-image">6</button>
          <button id="keypad-7" className="keypad-image">7</button>
          <button id="keypad-8" className="keypad-image">8</button>
          <button id="keypad-9" className="keypad-image">9</button>
          <button id="keypad-0" className="keypad-image">0</button>
        </div>
      </div>
    );
  }
}

export default Puzzle4;
