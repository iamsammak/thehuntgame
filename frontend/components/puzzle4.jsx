import React from 'react';

import PuzzleHeader from './puzzleHeader';

import { KeypadContainer, Button,
  SubmitButton, ClearButton } from './buttonContants';
import { getCurrentStage } from '../helpers';

// Answer 3, 4, 9

class Puzzle4 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: [false, false, false, false, false, false, false, false, false]
    };

    this.handleClick = this.handleClick.bind(this);
    this.clearValue = this.clearValue.bind(this);
    this.submitAnswer = this.submitAnswer.bind(this);
  }

  handleClick(idx) {
    return () => {
      this.setState(state => {
        let value = state.value;
        value[idx] = !value[idx];
        return ({ value : value });
      });
    };
  }

  clearValue() {
    this.setState({
      value: [false, false, false, false, false, false, false, false, false]
    });
  }

  submitAnswer() {
    const answer = this.state.value;
    const gameState = this.props.gameState;
    let stage = getCurrentStage(gameState);

    if (stage === 4) {
      this.props.send('submit', { puzzle: '4', answer: answer });
    }

    this.clearValue();
  }


  render() {

    return (
      <div>
        <PuzzleHeader title="Puzzle Four" />
        <div className="riddle">
          <p>Some riddle pertaining to the pictures below</p>
          <p>make the correct selections and you&apos;ll best this foe</p>
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

          <ClearButton onClick={this.clearValue} >Clear</ClearButton>
          <SubmitButton onClick={this.submitAnswer} >Enter</SubmitButton>
        </KeypadContainer>
      </div>
    );
  }
}

export default Puzzle4;
