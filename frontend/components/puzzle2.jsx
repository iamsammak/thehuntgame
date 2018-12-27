import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// Answer: See o double you

class Puzzle2 extends React.Component {
  constructor() {
    super();
    
   this.state = {
      puzzlesolved: 'no',
    };
     
    }

  submitanswer() {
    var input = document.getElementById('puzzleAnswer').value
    console.log(input)

    sendresponse = this.props.send('submit', {puzzle2:input})
 // socketIO listen for the response and run a function to log response
    var serverresponse = socket.on('submit_response', function(response) {
      console.log(response.answer) 
      if (response.answer == 'correct') {
	console.log('response is correct')
	this.props.history.push('/main')
      } else {
	var input = document.getElementbyID('puzzleAnswer').value
	console.log('answer is wrong')
     };
    });

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
