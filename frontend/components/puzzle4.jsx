import React from 'react';

import { Narration } from '../wrappers';
import { isSolved } from '../helpers';
import { KeypadContainer, Button, SubmitButton, ClearButton } from './buttonContants';
import { getCurrentStage } from '../helpers';

class Puzzle4 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: [false, false, false, false, false, false, false, false, false],
      error: false,
    };

    this.handleClick = this.handleClick.bind(this);
    this.clearValue = this.clearValue.bind(this);
    this.submitAnswer = this.submitAnswer.bind(this);
  }

  handleClick(idx) {
    return () => {
      this.setState(state => {
        const { value } = state;
        value[idx] = !value[idx];
        return ({ value : value });
      });
    };
  }

  clearValue() {
    this.setState({
      value: [false, false, false, false, false, false, false, false, false],
    });
  }

  submitAnswer() {
    const { value: answer } = this.state;
    const { gameState, send } = this.props;
    const stage = getCurrentStage(gameState);

    if (stage === 4) {
      send('submit', { puzzle: '4', answer: answer });
    } else {
      this.setState({ error: true });
      setTimeout(() => {
        this.setState({ error: false });
      }, 2000);
    }

    this.clearValue();
  }

  render() {
    const { gameState } = this.props;
    const { error } = this.state;
    const solved = isSolved(gameState, '4');
    const puzzleBSolved = isSolved(gameState, 'B');

    return (
      <div>
        <Narration>Matt lugs in a safe and is fiddling with the keypad.</Narration>
        <p>
          Chris gave me this safe, so maybe we had put it in here. Only thing is that I don&apos;t remember the code to unlock it.
        </p>
        {
          puzzleBSolved &&
            <p>
              Ah, you found my magnet. It&apos;s supposed to help us unlock this safe. Let&apos;s see...yup--it looks like the magnet disabled one of the buttons.
            </p>
        }
        <KeypadContainer>
          <Button click={this.state.value[0]} onClick={this.handleClick(0)} >1</Button>
          <Button click={this.state.value[1]} onClick={this.handleClick(1)} >2</Button>
          <Button click={this.state.value[2]} onClick={this.handleClick(2)} >3</Button>
          <Button click={this.state.value[3]} onClick={this.handleClick(3)} >4</Button>
          <Button click={this.state.value[4]} onClick={this.handleClick(4)} >5</Button>
          <Button click={this.state.value[5]} onClick={this.handleClick(5)} disabled={puzzleBSolved}>6</Button>
          <Button click={this.state.value[6]} onClick={this.handleClick(6)} >7</Button>
          <Button click={this.state.value[7]} onClick={this.handleClick(7)} >8</Button>
          <Button click={this.state.value[8]} onClick={this.handleClick(8)} >9</Button>

          <ClearButton onClick={this.clearValue} >Clear</ClearButton>
          <SubmitButton onClick={this.submitAnswer} >Enter</SubmitButton>
        </KeypadContainer>
        {
          solved && (
            <p>
              There we go...oh. Doesn&apos;t look like we put the key here. Where else could it be then?
            </p>
          )
        }
        {
          error && (
            <p>
              Are you sure about that?
            </p>
          )
        }
      </div>
    );
  }
}

export default Puzzle4;
