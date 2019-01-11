import React from 'react';
import styled from 'styled-components'
import PuzzleHeader from './puzzleHeader';

// Answer: Your name

class Puzzle3 extends React.Component {
 constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      combo : []
    };
  }


  handleClick(input) {
    var temparray = this.state.combo
    if (temparray.length > 4){
      console.log('more than 5')
    } else {
      var newarray = temparray.push(input)
      this.setState({combo: temparray});

    };
}

  submitanswer() {
    var userinput = this.state.combo
    this.props.send('submit', {puzzle: '3', answer: userinput})
    console.log('answer was submitted')

  }

  handleClear() {
    this.setState({combo:[]})
    console.log('things were cleared')
  }

  render() {
    const pw = this.state.combo
    console.log(pw)  
  return (
      <div>
        <PuzzleHeader title="Puzzle Three" />
        <div className="riddle">
          <p>Some riddle pertaining to the pictures below</p>
          <p>make the correct selections are you&apos;ll best this foe</p>
        </div>
        <br/>
        <AnswerAwareDiv>
          <button id="keypad-1" className="keypad-image" onClick={()=> this.handleClick(1)}>1</button>
          <button id="keypad-2" className="keypad-image" onClick={()=> this.handleClick(2)}>2</button>
          <button id="keypad-3" className="keypad-image" onClick={()=> this.handleClick(3)}>3</button>
          <button id="keypad-4" className="keypad-image" onClick={()=> this.handleClick(4)}>4</button>
          <button id="keypad-5" className="keypad-image" onClick={()=> this.handleClick(5)}>5</button>
          <button id="keypad-6" className="keypad-image" onClick={()=> this.handleClick(6)}>6</button>
          <button id="keypad-7" className="keypad-image" onClick={()=> this.handleClick(7)}>7</button>
          <button id="keypad-8" className="keypad-image" onClick={()=> this.handleClick(8)}>8</button>
          <button id="keypad-9" className="keypad-image" onClick={()=> this.handleClick(9)}>9</button>
          <button id="keypad-Clear" className="keypad-image"onClick={()=> this.handleClear()}>clear</button>
          <button id="keypad-0" className="keypad-image"onClick={()=> this.handleClick(0)}>0</button>
          <button id="keypad-Enter" className="keypad-image" onClick={()=> this.submitanswer()}>Enter</button>
        </AnswerAwareDiv>
        <br/>
        <p>I am a place to add text</p>
      </div>
    );
  }
}

export default Puzzle3;
