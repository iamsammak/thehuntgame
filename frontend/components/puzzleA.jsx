import React from 'react';
import styled from 'styled-components';

import { Narration, SpeechBubbleSpacing } from '../wrappers';
import { isSolved } from '../helpers';
import SpeechBubble from './speechBubble';
import { Button } from './buttons';
import { CenteredRow } from '../wrappers';

const SafeImage = styled.img`
  display: inline-flex;
  height: 150px;
  width: 75px;
  margin-right: auto;
  margin-left: auto;
`;

const CornholeDiv = styled.div`
  display: inline-flex;
  margin-right: 5px;
  ${props => (props.selected ? 'border-style: inset; border-color: #7C9790; border-width: 5px' : 'background-color: transparent; border-color: transparent')}
`;

const INITIAL_ANSWERS = [null, null, null];

class PuzzleA extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: [...INITIAL_ANSWERS],
    };
    this.handleOptionClick = this.handleOptionClick.bind(this);
    this.renderIconOptions = this.renderIconOptions.bind(this);
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

  renderIconOptions(question) {
    return (icon, index) => {
      const { answers } = this.state;
      const answer = answers[question];
      const key = `${question}-${index}`;
      return (
        <CornholeDiv
          key={key}
          selected={answer === index}
          onClick={this.handleOptionClick(question, index)}
        >
          <SafeImage src={icon}/>
        </CornholeDiv>
      );
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
    send('submit', { puzzle: 'A', answer: answers });
    this.setState({ answers: [...INITIAL_ANSWERS] });
  }

  render() {
    const { correct, gameState, personId } = this.props;
    const solved = isSolved(gameState, 'A');

    const question1Images = ['images/puzzleA/cornhole1.png', 'images/puzzleA/cornhole2.png', 'images/puzzleA/cornhole3.png', 'images/puzzleA/cornhole4.png'];
    const question2Text = ['Ultra White', 'Coral Ridge', 'New Peach'];
    const question3Text = ['3', '4', '5', '6'];

    return (
      <div>
        <SpeechBubble personId={personId}>
          Did you know that Chris and his dad pretty much made the cornhole boards themselves? Christine loves them and wants me to jot down some of their details for future reference. Can you help me out?
        </SpeechBubble>
        {
          !solved &&
            <div>
              <p>
                Which of these is the design used for painting the cornhole boards?
              </p>
              {question1Images.map(this.renderIconOptions(0))}
              <p>
                Which Valspar paint isn&apos;t used?
              </p>
              {question2Text.map(this.renderTextOptions(1))}
              <p>
                How many cornhole bags does each team play with?
              </p>
              {question3Text.map(this.renderTextOptions(2))}
              <CenteredRow>
                <Button onClick={this.handleSubmit}>Submit</Button>
              </CenteredRow>
            </div>
        }
        {
          correct === false ? (
            <SpeechBubble personId={personId}>
              That doesn&apos;t seem right...
            </SpeechBubble>
          ) : (
            <SpeechBubbleSpacing lines={1} />
          )
        }
        {
          solved &&
            <div>
              <Narration>You got all the details right!</Narration>
              <SpeechBubble personId={personId}>
                Awesome, thanks! Christine also told me something about a Caesar cipher. Not sure what that has to do with anything though.
              </SpeechBubble>
            </div>
        }
      </div>
    );
  }
}

export default PuzzleA;
