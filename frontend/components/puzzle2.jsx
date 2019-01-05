import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import styled from 'styled-components'

 
   //if statement for incorrect answers
   const AnswerAwareInput = styled.input`
    border-color: ${props => props.incorrectanswer ? 'red' : '#f8f8f8t'};
    text-color: ${props => props.incorrectanswer ? 'red' : 'black'};
  `;
 
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
    this.props.send('submit', {puzzle: '1', answer: userinput})
  }
}
  
render() {
  console.log(this.props)
  
return ( 

     <div>
        <h1>Puzzle Two</h1>
        <form id="puzzle2-form">
          <p>Can you write cow in 13 letters?</p>
          <p>
            <AnswerAwareInput 
               type="text"
               id="puzzleAnswer"
               autocomplete="off"
               placeholder="Type here"
               incorrectanswer={this.props.incorrectanswer}
            />
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
