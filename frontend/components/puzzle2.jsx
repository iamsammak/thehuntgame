import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import styled from 'styled-components'

 // Answer: See o double yo
 
 //style component for incorrect answers
   const AnswerAwareInput = styled.input`
    border-color: ${props => props.correct === false ? 'red' : '#f8f8f8t'};
    text-color: ${props => props.correct === false ? 'red' : 'black'};
  `;
 

class Puzzle2 extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      value : ''
    }
 };

   submitanswer() {
      var userinput = this.state.value  
      this.props.send('submit', {puzzle: '2', answer: userinput})
      console.log('answer was submitted')
}
 
  handleChange(event) {
    this.setState({value: event.target.value});
  }

  
  render() {
    const { value } = this.state;
  return ( 
     <div>
        <h1>Puzzle Two</h1>
        <form id="puzzle2-form">
          <p>Can you write cow in 13 letters?</p>
          <p>
            <AnswerAwareInput 
               type="text"
               autocomplete="off"
               placeholder="Type here"
               correct={this.props.correct}
               value= {this.state.value}
               onChange={this.handleChange}
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
