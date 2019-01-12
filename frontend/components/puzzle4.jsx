import React from 'react';
import styled from 'styled-components';

import PuzzleHeader from './puzzleHeader';

import {
  KeypadContainer, Button, ButtonContainer } from './buttonContants'

class Puzzle4 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: [false, false, false, false, false, false, false, false, false],
      hello: ""
    };

    this.handleClick = this.handleClick.bind(this);
    this.clearValue = this.clearValue.bind(this);
  }

  handleClick(event) {
    console.log(event.target.value);
    let buttonNum = parseInt(event.target.value) - 1;
    let value = this.state.value;
    value[buttonNum] = !value[buttonNum]
    console.log(value);

    this.setState({ value: value })
  }

  clearValue(event) {
    this.setState({
      value: [false, false, false, false, false, false, false, false, false],
      hello: ""
    });
  }

  componentDidUpdate() {

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
        <h3>{this.state.hello}</h3>
        <br/>
        <KeypadContainer>

          <Button click={this.state.value[0]} onClick={this.handleClick} value="1">1</Button>
          <Button click={this.state.value[1]} onClick={this.handleClick} value="2">2</Button>
          <Button click={this.state.value[2]} onClick={this.handleClick} value="3">3</Button>
          <Button click={this.state.value[3]} onClick={this.handleClick} value="4">4</Button>
          <Button click={this.state.value[4]} onClick={this.handleClick} value="5">5</Button>
          <Button click={this.state.value[5]} onClick={this.handleClick} value="6">6</Button>
          <Button click={this.state.value[6]} onClick={this.handleClick} value="7">7</Button>
          <Button click={this.state.value[7]} onClick={this.handleClick} value="8">8</Button>
          <Button click={this.state.value[8]} onClick={this.handleClick} value="9">9</Button>

          <ButtonContainer value={name} onClick={this.handleClick}></ButtonContainer>
          <Button onClick={this.clearValue} >Clear</Button>
        </KeypadContainer>
      </div>
    );
  }
}

export default Puzzle4;
