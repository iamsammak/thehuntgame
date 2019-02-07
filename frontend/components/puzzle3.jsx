import React from 'react';

import { isSolved } from '../helpers';
import { AnswerAwareDiv } from './puzzle.jsx';
import { KeypadContainer, Button } from './buttonContants';

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
    const { combo } = this.state;
    const { gameState } = this.props;
    const solved = isSolved(gameState, 3);

    return (
      <div>
        <p>
          He kept talking about how his tea favor idea needs to be CAPITALIZED. It would be the FIRST idea of its kind where guests can choose from EACH of the tea components.
        </p>
        <div>
          {
            combo.map((pw, i) => {
              return (
                <AnswerAwareDiv key={`${i}${pw}`} shake={this.state.shake} correct={this.props.correct}>
                  {pw}
                </AnswerAwareDiv>
              );
            })
          }
        </div>
        <KeypadContainer>
          <Button disabled={solved} onClick={this.handleClick(1)}>1</Button>
          <Button disabled={solved} onClick={this.handleClick(2)}>2</Button>
          <Button disabled={solved} onClick={this.handleClick(3)}>3</Button>
          <Button disabled={solved} onClick={this.handleClick(4)}>4</Button>
          <Button disabled={solved} onClick={this.handleClick(5)}>5</Button>
          <Button disabled={solved} onClick={this.handleClick(6)}>6</Button>
          <Button disabled={solved} onClick={this.handleClick(7)}>7</Button>
          <Button disabled={solved} onClick={this.handleClick(8)}>8</Button>
          <Button disabled={solved} onClick={this.handleClick(9)}>9</Button>
          <Button disabled={solved} onClick={this.handleClear}>clear</Button>
          <Button disabled={solved} onClick={this.handleClick(0)}>0</Button>
          <Button disabled={solved} onClick={this.submitAnswer}>Enter</Button>
        </KeypadContainer>
        {
          solved && (
            <p>
              Ah, that&apos;s right. Everything&apos;s in order here, but it doesn&apos;t look like the key is here.
            </p>
          )
        }
      </div>
    );
  }
}

export default Puzzle3;
