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

    serverresponse = socket.send('submit', {puzzle2:input})
    

    if (serverresponse === 'correct') {
      this.setState({
      puzzlesolved : this.state.puzzlesolved = 'yes'
       });
      console.log('answer is correct')

      this.props.history.push('/main')
      
  } else {
    var input = document.getElementById('puzzleAnswer')
    console.log('answer is wrong')
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
