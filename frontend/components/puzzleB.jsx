import React from 'react';

import { Narration, SpeechBubbleSpacing } from '../wrappers';
import { isSolved } from '../helpers';
import SpeechBubble from './speechBubble';
import { Button } from './buttons';
import { CenteredRow } from '../wrappers';

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
    const { correct, gameState, personId } = this.props;
    const solved = isSolved(gameState, 'B');

    const question1Text = ["Candle lamp", "Arbor post", "Water pitcher"];
    const question2Text = ["White ribbons", "Peach flowers", "Yellow napkins"];
    const question3Text = ["Candy bags", "Boba straws", "Tea tins"];

    return (
      <div>
        <SpeechBubble personId={personId}>
          Is it here? Is it in this box? Hey, can you help me sort through these boxes and move all the unused stuff to my car? Maybe if we clear out all this stuff, then we can find the key here.
        </SpeechBubble>
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
              <CenteredRow>
                <Button onClick={this.handleSubmit} disabled={solved}>Submit</Button>
              </CenteredRow>
            </div>
        }
        {
          correct === false ? (
            <SpeechBubble personId={personId}>
              No, I think we can use some of that.
            </SpeechBubble>
          ) : (
            <SpeechBubbleSpacing lines={1} />
          )
        }
        {
          solved &&
            <div>
              <Narration>You got all the items right!</Narration>
              <SpeechBubble personId={personId}>
                Thanks so much for bringing those to the car! Hm? You found a strong magnet in the trunk? Can you hold onto it for now?
              </SpeechBubble>
              <Narration>You found a strong magnet.</Narration>
            </div>
        }
      </div>
    );
  }
}

export default PuzzleB;
