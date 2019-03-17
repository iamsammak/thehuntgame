import React from 'react';

import { isSolved } from '../helpers';
import { SpeechBubbleSpacing } from '../wrappers';
import SpeechBubble from './speechBubble';
import Submit from './submit';

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
          He kept talking about how his tea favor idea needs to be CAPITALIZED. It would be the FIRST idea of its kind where guests can choose from EACH of the tea components.
        </SpeechBubble>
        <p>
          <Submit {...this.props} puzzleNumber="3" disabled={solved} />
        </p>
        {
          solved ? (
            <SpeechBubble personId={personId}>
              Ah, that&apos;s right. Everything&apos;s in order here, but it doesn&apos;t look like the key is here.
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
