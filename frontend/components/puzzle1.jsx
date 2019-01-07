import React from 'react';
import styled from 'styled-components'
import { AnswerAwareInput } from './puzzle.jsx'

// Answer: getaway (caesar ciphered)
class Puzzle1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }
     submitanswer() {
      var userinput = this.state.value
      this.props.send('submit', {puzzle: '1', answer: userinput})
      console.log('answer was submitted')
}
  render() {
    const { value } = this.state;

    return (
      <div>
        <h1>Puzzle One</h1>
        <form id="puzzle1-form">
          <div id="cipher-container">
          </div>
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
}

export default Puzzle1;
