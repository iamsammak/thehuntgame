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
      var userinput = document.getElementById('puzzleAnswer').value;
      if (userinput) {
      this.props.send('submit', {puzzle: '1', answer: userinput})
      console.log('answer was submitted')
  } else {
    this.setState({blankanswer : 'yes'})
    console.log('there was a blank answer')
  }
}
  
   
render() {
   //if statement for incorrect answers
   if (this.props.incorrectanswer === true) {
     document.getElementById("puzzleAnswer").style.borderColor = "red";
    };
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
