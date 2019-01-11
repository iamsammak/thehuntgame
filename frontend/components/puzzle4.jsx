import React from 'react';
import styled from 'styled-components';

import PuzzleHeader from './puzzleHeader';

const Button = styled.button`
background-color: ${props => props.click ? '#FFA000' : '#baffc9'};
`;

class ButtonContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.value,
      click: false
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    this.setState(state => ({ click: !state.click}));
  }

  render() {
    return (
      <Button
        className="keypad-image"
        click={this.state.click}
        onClick={this.handleClick}
        >{this.state.value}</Button>
    );
  }
}

class Puzzle4 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      button: ""
    };

    this.testClick = this.testClick.bind(this);
    this.clearValue = this.clearValue.bind(this);
  }

  testClick(event) {
    var newValue = this.state.button + " " + event.target.value
    this.setState({
      button: newValue
    });
  }

  clearValue(event) {
    this.setState({
      button: ""
    });
  }

  render() {
    let name = "Sam";

    return (
      <div>
        <PuzzleHeader title="Puzzle Four" />
        <div className="riddle">
          <p>Some riddle pertaining to the pictures below</p>
          <p>make the correct selections are you&apos;ll best this foe</p>
        </div>
        <h3>{this.state.button}</h3>
        <br/>
        <div className="image-keypad-container">
          <button id="keypad-1" className="keypad-image" onClick={this.testClick} value="1">1</button>

          <ButtonContainer value={name} />

          <button id="keypad-2" className="keypad-image" onClick={this.testClick} value="2">2</button>
          <button id="keypad-3" className="keypad-image" onClick={this.testClick} value="3">3</button>
          <button id="keypad-4" className="keypad-image" onClick={this.testClick} value="4">4</button>
          <button id="keypad-5" className="keypad-image">5</button>
          <button id="keypad-6" className="keypad-image">6</button>
          <button id="keypad-7" className="keypad-image">7</button>
          <button id="keypad-8" className="keypad-image">8</button>
          <button id="keypad-9" className="keypad-image">9</button>
          <button id="keypad-0" className="keypad-image" onClick={this.clearValue} >0</button>
        </div>
      </div>
    );
  }
}

export default Puzzle4;
