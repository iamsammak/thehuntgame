import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// Answer: See o double you

class Puzzle2 extends React.Component {
 constructor(props) {
    super(props);
    
    this.state = {
      puzzlesolved: 'no',
      blankanswer: 'no',
      wronganswer: 'no'
    }
 };
   submitanswer() {
      console.log(document.getElementById('puzzleAnswer').value)
      var userinput = document.getElementById('puzzleAnswer').value;
      console.log(userinput)
      this.props.send('submit', {1: userinput})
      console.log('answer was submitted')
  }


  render() {
   return (
      <div>
        <h1>Puzzle Two</h1>
        <form id="puzzle2-form">
          <p>Can you write cow in 13 letters?</p>
          <p>
            <input type="text" id="puzzleAnswer" autocomplete="off" placeholder="Type here" />
          </p>
          <div>
            <button type="submit" onClick={() =>this.submitanswer()}>submit</button>
          </div>
        </form>

      </div>
    );
  }
};

export default Puzzle2;
