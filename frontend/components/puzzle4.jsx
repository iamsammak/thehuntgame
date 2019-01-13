import React from 'react';

import PuzzleHeader from './puzzleHeader';

import {
  KeypadContainer, Button } from './buttonContants';

class Puzzle4 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: [false, false, false, false, false, false, false, false, false]
    };

    this.handleClick = this.handleClick.bind(this);
    this.clearValue = this.clearValue.bind(this);
  }

  handleClick(idx) {
    return () => {
      this.setState(state => {
        let value = state.value;
        value[idx] = !value[idx];
        return ({ value : value });
      }, () => {
        this.props.send('submit', { puzzle: '4', answer: this.state.value });
      });
    };
  }

  clearValue() {
    this.setState({
      value: [false, false, false, false, false, false, false, false, false]
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
        <br/>
        <KeypadContainer>

          <Button click={this.state.value[0]} onClick={this.handleClick(0)} >1</Button>
          <Button click={this.state.value[1]} onClick={this.handleClick(1)} >2</Button>
          <Button click={this.state.value[2]} onClick={this.handleClick(2)} >3</Button>
          <Button click={this.state.value[3]} onClick={this.handleClick(3)} >4</Button>
          <Button click={this.state.value[4]} onClick={this.handleClick(4)} >5</Button>
          <Button click={this.state.value[5]} onClick={this.handleClick(5)} >6</Button>
          <Button click={this.state.value[6]} onClick={this.handleClick(6)} >7</Button>
          <Button click={this.state.value[7]} onClick={this.handleClick(7)} >8</Button>
          <Button click={this.state.value[8]} onClick={this.handleClick(8)} >9</Button>

          <Button onClick={this.clearValue} >Clear</Button>
        </KeypadContainer>
      </div>
    );
  }
}

export default Puzzle4;
