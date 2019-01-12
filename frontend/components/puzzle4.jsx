import React from 'react';
import styled from 'styled-components';

import PuzzleHeader from './puzzleHeader';

import {
  KeypadContainer, Button,
  OneButton, TwoButton, ThreeButton, FourButton, FiveButton,
  SixButton, SevenButton, EightButton, NineButton,
  ButtonContainer
} from './buttonContants'

class Puzzle4 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value,
      one: false,
      two: false,
      three: false,
      four: false,
      five: false,
      six: false,
      seven: false,
      eight: false,
      nine: false,
      zero: false
    };

    this.handleClick = this.handleClick.bind(this);
    this.clearValue = this.clearValue.bind(this);
  }

  handleClick(event) {
    console.log(event.target.value);
    let buttonName = event.target.value;
    this.setState(state => ({ [buttonName]: !state[buttonName]}));
  }

  clearValue(event) {
    this.setState({
      one: false,
      two: false,
      three: false,
      four: false,
      five: false,
      six: false,
      seven: false,
      eight: false,
      nine: false,
      zero: false
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
        <KeypadContainer>
          <OneButton one={this.state.one} onClick={this.handleClick} value="one">1</OneButton>
          <TwoButton two={this.state.two} onClick={this.handleClick} value="two">2</TwoButton>
          <ThreeButton three={this.state.three} onClick={this.handleClick} value="three">3</ThreeButton>
          <FourButton four={this.state.four} onClick={this.handleClick} value="four">4</FourButton>
          <FiveButton five={this.state.five} onClick={this.handleClick} value="five">5</FiveButton>
          <SixButton six={this.state.six} onClick={this.handleClick} value="six">6</SixButton>
          <SevenButton seven={this.state.seven} onClick={this.handleClick} value="seven">7</SevenButton>
          <EightButton eight={this.state.eight} onClick={this.handleClick} value="eight">8</EightButton>
          <NineButton nine={this.state.nine} onClick={this.handleClick} value="nine">9</NineButton>

          <ButtonContainer value={name} onClick={this.handleClick}></ButtonContainer>
          <Button onClick={this.clearValue} >Clear</Button>
        </KeypadContainer>
      </div>
    );
  }
}

export default Puzzle4;
