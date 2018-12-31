import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// Answer: See o double you

class Puzzle2 extends React.Component {
  constructor(props) {
    super(props);
 // socketIO listen for the response and run a function to log response
    const { socket } = this.props;
    socket.on('submit_response', function(response) {
      console.log(response.answer) 
      if (response.answer == 'correct') {
	console.log('response is correct')
	this.setState({puzzlesolved : 'yes'})
      } else if (response.answer === 'incorrect') {
	console.log('answer is wrong')
	this.setState({wronganswer: 'yes'})
     };
    });
     
console.log(socket.io.engine.id)
   this.state = {
      puzzlesolved: 'no',
      blankanswer: 'no',
      wronganswer: 'no'
    };
     
    }

  submitanswer() {
    var input = document.getElementById('puzzleAnswer').value
    console.log(input)

    this.props.send('submit', {puzzle2:input})
 };

  render() {
    console.log(this.state)
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
