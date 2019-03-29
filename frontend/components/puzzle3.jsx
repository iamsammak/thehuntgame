import React from 'react';
import styled from 'styled-components';

import { isSolved } from '../helpers';
import { SpeechBubbleSpacing } from '../wrappers';
import SpeechBubble from './speechBubble';
import Submit from './submit';

const PuzzleContainer = styled.div`
  border: 1px solid black;
  background-color: white;
  padding: 1em 0;
  border-radius: 4px;
  margin: 1em;
`;

const Puzzle = styled.div`
  font-family: monospace;
  font-size: 2em;
`;

const initial_combo = ['','','','',''];

class Puzzle3 extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.submitAnswer = this.submitAnswer.bind(this);
    this.state = {
      combo: initial_combo,
      shake: false,
    };
  }

  handleClick(input) {
    return () => {
      const { combo: tempArray } = this.state;
      let flag = 'full';
      for (var i = 0; i <= tempArray.length; i++) {
        if (tempArray[i] === '') {
          this.setState(state => {
            const combo = state.combo.slice();
            combo.splice(i, 1, input);
            return { combo };
          });
          flag = 'good';
          break;
        }
      }
      if (flag === 'full') {
        this.setState({ shake: true });
        setTimeout(() => {
          this.setState({ shake: false });
        }, 500);
      }
    };
  }

  submitAnswer() {
    const { send } = this.props;

    const { combo: userinput } = this.state;
    send('submit', { puzzle: '3', answer: userinput });
  }

  handleClear() {
    const { reset } = this.props;

    this.setState({ combo: initial_combo });
    reset();
  }

  render() {
    const { gameState, personId } = this.props;
    const solved = isSolved(gameState, '3');

    return (
      <div>
        <SpeechBubble personId={personId}>
          I found this paper with these numbers on it when I was unpacking the tea. Maybe if I can make sense of these numbers, I can remember what I did next. I might have misplaced the key somewhere here.
        </SpeechBubble>
        <PuzzleContainer>
          <Puzzle>
            1 2 3 4 5 6 7 8 9
          </Puzzle>
          <Puzzle>
            5 8 3 5 7 5 6 1 2
          </Puzzle>
        </PuzzleContainer>
        <p>
          <Submit {...this.props} puzzleNumber="3" disabled={solved} />
        </p>
        {
          solved ? (
            <SpeechBubble personId={personId}>
              Ah, I guess they&apos;re looking forward to their honeymoon as much as they are looking forward to starting a tea favor business! Everything&apos;s in order here now, but it doesn&apos;t look like the key is here.
            </SpeechBubble>
          ) : (
            <SpeechBubbleSpacing lines={2} />
          )
        }
      </div>
    );
  }
}

export default Puzzle3;
