import React from 'react';
import styled from 'styled-components';

import { Narration } from '../wrappers';
import { isSolved } from '../helpers';
import { KeypadContainer, Button, SubmitButton, ClearButton } from './buttonContants';
import { getCurrentStage } from '../helpers';

const SafeImage = styled.img.attrs(props => ({
  src: props.src,
}))`
  height: 75px;
  width: 65px;
`;

class Puzzle4 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: [false, false, false, false, false, false, false, false, false, false],
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
      value: [false, false, false, false, false, false, false, false, false, false],
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

    const images = [
      { src: 'images/puzzle4/water_droplet.png' },
      { src: 'images/puzzle4/dog.png' },
      { src: 'images/puzzle4/bok_choy.png' },
      { src: 'images/puzzle4/tree.png' },
      { src: 'images/puzzle4/fire.png' },
      { src: 'images/puzzle4/cooking_pot.png' },
      { src: 'images/puzzle4/fish.png' },
      { src: 'images/puzzle4/orange.png' },
      { src: 'images/puzzle4/green_onion.png' },
      { src: 'images/puzzle4/flower.png' },
    ];

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
          <Button click={this.state.value[0]} onClick={this.handleClick(0)} ><SafeImage src={images[0].src} ></SafeImage></Button>
          <Button click={this.state.value[1]} onClick={this.handleClick(1)} ><SafeImage src={images[1].src} ></SafeImage></Button>
          <Button click={this.state.value[2]} onClick={this.handleClick(2)} ><SafeImage src={images[2].src} ></SafeImage></Button>
          <Button click={this.state.value[3]} onClick={this.handleClick(3)} ><SafeImage src={images[3].src} ></SafeImage></Button>
          <Button click={this.state.value[4]} onClick={this.handleClick(4)} ><SafeImage src={images[4].src} ></SafeImage></Button>
          <Button click={this.state.value[5]} onClick={this.handleClick(5)} disabled={puzzleBSolved}><SafeImage src={images[5].src} ></SafeImage></Button>
          <Button click={this.state.value[6]} onClick={this.handleClick(6)} ><SafeImage src={images[6].src} ></SafeImage></Button>
          <Button click={this.state.value[7]} onClick={this.handleClick(7)} ><SafeImage src={images[7].src} ></SafeImage></Button>
          <Button click={this.state.value[8]} onClick={this.handleClick(8)} ><SafeImage src={images[8].src} ></SafeImage></Button>

          <ClearButton onClick={this.clearValue} >Clear</ClearButton>
          <Button click={this.state.value[9]} onClick={this.handleClick(9)} ><SafeImage src={images[9].src} ></SafeImage></Button>
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
