import React from 'react';

import { Narration } from '../wrappers';
import { isSolved } from '../helpers';

const INITIAL_ANSWERS = [null, null, null];

class PuzzleB extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: [...INITIAL_ANSWERS],
    };
    this.handleOptionClick = this.handleOptionClick.bind(this);
    this.renderTextOptions = this.renderTextOptions.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleOptionClick(question, index) {
    return () => {
      this.setState(state => {
        const answers = [...state.answers];
        answers.splice(question, 1, index);
        return { answers };
      });
    };
  }

  renderTextOptions(question) {
    return (text, index) => {
      const { answers } = this.state;
      const answer = answers[question];
      const key = `${question}-${index}`;
      return (
        <div key={key}>
          <input
            id={key}
            type="radio"
            value={index}
            onChange={this.handleOptionClick(question, index)}
            checked={answer === index}
          />
          <label htmlFor={key}>{text}</label>
        </div>
      );
    };
  }

  handleSubmit() {
    const { send } = this.props;
    const { answers } = this.state;

    send('submit', { puzzle: 'B', answer: answers });
    this.setState({ answers: [...INITIAL_ANSWERS] });
  }

  render() {
    const { correct, gameState } = this.props;
    const solved = isSolved(gameState, 'B');

    const question1Text = ["Candle lamp", "Arbor post", "Wine barrel"];
    const question2Text = ["White ribbons", "Peach flowers", "Yellow napkins"]
    const question3Text = ["Party poppers", "Boba straws", "Tea bags"];

    return (
      <div>
        <p>
          Is it here? Is it in this box? Hey, can you help me sort through these boxes and move all the unused stuff to my car? Maybe if we clear out all this stuff, then we can find the key here.
        </p>
        {
          !solved &&
            <div>
              <p>
                Which of these items should you take from the ceremony site boxes?
              </p>
              {question1Text.map(this.renderTextOptions(0))}
              <p>
                Which of these items should you take from the decoration boxes?
              </p>
              {question2Text.map(this.renderTextOptions(1))}
              <p>
                Which of these items should you take from the reception hall boxes?
              </p>
              {question3Text.map(this.renderTextOptions(2))}
              <p>
                <button onClick={this.handleSubmit} disabled={solved}>Submit</button>
              </p>
            </div>
        }
        {
          correct === false &&
            <p>
              No, I think we can use some of that.
            </p>
        }
        {
          solved &&
            <div>
              <Narration>You got all the items right!</Narration>
              <p>
                Thanks so much for bringing those to the car! Hm? You found a strong magnet in the trunk? Can you hold onto it for now? I think Matt was holding onto it for some reason.
              </p>
              <Narration>You found a strong magnet.</Narration>
            </div>
        }
      </div>
    );
  }
}

export default PuzzleB;
