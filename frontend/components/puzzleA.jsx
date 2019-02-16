import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { isSolved } from '../helpers';

const Button = styled.button`
  ${props => props.selected && 'border-style: inset;'}
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
        <Button
          key={key}
          onClick={this.handleOptionClick(question, index)}
          selected={answer === index}
        >
          <FontAwesomeIcon icon={icon} />
        </Button>
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
    const { correct, gameState } = this.props;
    const solved = isSolved(gameState, 'A');

    const question1Icons = ['chevron-circle-up', 'chevron-circle-down', 'chevron-circle-left', 'chevron-circle-down'];
    const question2Text = ['selection1', 'selection2', 'selection3'];
    const question3Text = ['selection1', 'selection2', 'selection3'];

    return (
      <div>
        <p>
          Did you know that Chris and his dad pretty much made the cornhole boards themselves? He wants me to jot down some of the details for future reference. Can you help me out?
        </p>
        <p>
          Question 1 placeholder?
        </p>
        {question1Icons.map(this.renderIconOptions(0))}
        <p>
          Question 2 placeholder?
        </p>
        {question2Text.map(this.renderTextOptions(1))}
        <p>
          Question 3 placeholder?
        </p>
        {question3Text.map(this.renderTextOptions(2))}
        <p>
          <button onClick={this.handleSubmit}>Submit</button>
        </p>
        {
          correct === false &&
            <p>
              That doesn't seem right...
            </p>
        }
        {
          solved &&
            <p>
              Awesome, thanks! Chris told me something about a Caesar cipher too. Not sure what that has to do with anything though.
            </p>
        }
      </div>
    );
  }
}

export default PuzzleA;
