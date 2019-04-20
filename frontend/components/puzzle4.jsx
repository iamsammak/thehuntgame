import React from 'react';
import styled from 'styled-components';

import { red, gray, sidecar, juniper, whiteLilac, darkSidecar } from '../constants';
import { Narration, SpeechBubbleSpacing } from '../wrappers';
import { isSolved, getCurrentStage } from '../helpers';
import { Button } from './buttons';
import SpeechBubble from './speechBubble';

const KeypadContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const SafeImage = styled.img`
  height: 75px;
  width: 65px;
`;

const Character = styled.div`
  font-size: 2em;
`;

const KeypadButton = styled(Button)`
  height: 88px;
  width: 88px;
  background-color: ${props => {
    if (props.disabled) {
      return gray;
    } else if (props.clicked) {
      return darkSidecar;
    }
    return sidecar;
  }}
`;

const ClearButton = styled(Button)`
  height: 88px;
  width: 88px;
  color: ${red};
  font-size: 30px;
  background-color: ${whiteLilac};
`;

const SubmitButton = styled(Button)`
  color: white;
  font-size: 30px;
  height: 88px;
  width: 88px;
  background-color: ${juniper};
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
    this.renderButton = this.renderButton.bind(this);
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
      }, 3000);
    }

    this.clearValue();
  }

  renderButton(index) {
    const { value } = this.state;
    const { gameState } = this.props;
    const solved = isSolved(gameState, '4');
    const puzzleBSolved = isSolved(gameState, 'B');

    const images = [
      { src: 'images/puzzle4/water_droplet.png' },
      { src: 'images/puzzle4/dog.png' },
      { src: 'images/puzzle4/bok_choy.png' },
      { src: 'images/puzzle4/cooking_pot.png' },
      { src: 'images/puzzle4/fire.png' },
      { src: 'images/puzzle4/tree.png' },
      { src: 'images/puzzle4/fish.png' },
      { src: 'images/puzzle4/orange.png' },
      { src: 'images/puzzle4/green_onion.png' },
      { src: 'images/puzzle4/flower.png' },
    ];
    const characters = [
      '水',
      '狗',
      '菜',
      '熟',
      '火',
      '樹',
      '魚',
      '橙',
      '蔥',
      '花',
    ];

    return (
      <KeypadButton
        clicked={value[index]}
        onClick={this.handleClick(index)}
        disabled={solved}
        key={index}
      >
        {
          puzzleBSolved ?
            <Character>{characters[index]}</Character> :
            <SafeImage src={images[index].src} />
        }
      </KeypadButton>
    );
  }

  render() {
    const { correct, gameState, personId } = this.props;
    const { error } = this.state;
    const solved = isSolved(gameState, '4');
    const puzzleBSolved = isSolved(gameState, 'B');

    return (
      <div>
        <Narration>Matt lugs in a safe and is fiddling with the keypad.</Narration>
        <SpeechBubble personId={personId}>
          Chris gave me this safe, so maybe we had put it in here. Only thing is that I don&apos;t remember the code to unlock it.
        </SpeechBubble>
        {
          puzzleBSolved &&
            <SpeechBubble personId={personId}>
              Ah, you found my magnet. It&apos;s supposed to help us unlock this safe. Let&apos;s see...looks like it converts the pictures into Chinese characters. Interesting...
            </SpeechBubble>
        }
        <KeypadContainer>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(this.renderButton)}
          <ClearButton onClick={this.clearValue} disabled={solved}>Clear</ClearButton>
          {this.renderButton(9)}
          <SubmitButton onClick={this.submitAnswer} disabled={solved}>Enter</SubmitButton>
        </KeypadContainer>
        {!solved && !error && correct !== false && <SpeechBubbleSpacing lines={1} />}
        {
          solved && (
            <SpeechBubble personId={personId}>
              There we go...oh. Doesn&apos;t look like we put the key here. Where else could it be then?
            </SpeechBubble>
          )
        }
        {
          error && (
            <SpeechBubble personId={personId}>
              Are you sure about that?
            </SpeechBubble>
          )
        }
        {
          correct === false && (
            <SpeechBubble personId={personId}>
              That doesn&apos;t sound right...
            </SpeechBubble>
          )
        }
      </div>
    );
  }
}

export default Puzzle4;
