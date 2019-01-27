import React from 'react';

import { AnswerAwareDiv } from './puzzle.jsx';
import { KeypadContainer, Button } from './buttonContants';

// Answer: [5,4,3,2,1]

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
      var tempArray = this.state.combo;
      var flag = 'full';
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
    var userinput = this.state.combo;
    this.props.send('submit', { puzzle: '3', answer: userinput });
  }

  handleClear() {
    this.setState({ combo:initial_combo });
    this.props.reset();
  }

  render() {
    const { combo } = this.state;
    return (
      <div>
        <div className="riddle">
          <p>Some riddle pertaining to the pictures below</p>
          <p>make the correct selections are you&apos;ll best this foe</p>
        </div>
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
          <Button onClick={this.handleClick(1)}>1</Button>
          <Button onClick={this.handleClick(2)}>2</Button>
          <Button onClick={this.handleClick(3)}>3</Button>
          <Button onClick={this.handleClick(4)}>4</Button>
          <Button onClick={this.handleClick(5)}>5</Button>
          <Button onClick={this.handleClick(6)}>6</Button>
          <Button onClick={this.handleClick(7)}>7</Button>
          <Button onClick={this.handleClick(8)}>8</Button>
          <Button onClick={this.handleClick(9)}>9</Button>
          <Button onClick={this.handleClear}>clear</Button>
          <Button onClick={this.handleClick(0)}>0</Button>
          <Button onClick={this.submitAnswer}>Enter</Button>
        </KeypadContainer>
      </div>
    );
  }
}

export default Puzzle3;
