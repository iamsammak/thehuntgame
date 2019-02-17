import React from 'react';
import styled from 'styled-components';

import { gray, lightBlue, darkBlue } from '../constants';

export const KeypadContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export const Button = styled.button`
  padding: 5px;
  margin: 5px;
  height: 100px;
  width: 100px;
  color: white;
  font-size: 30px;
  background-color: ${props => {
    if (props.disabled) {
      return gray;
    } else if (props.click) {
      return darkBlue;
    }
    return lightBlue;
  }};
  &:focus {
    outline: 0;
  }
`;

export const SubmitButton = styled(Button)`
  width: 150px;
  background-color: ${props => (props.click ? '#9d0e3d' : '#ff654d')};
`;

export const ClearButton = styled(Button)`
  width: 150px;
  background-color: #d2a494;
`;

export class ButtonContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.value,
      click: false
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(state => ({ click: !state.click }));
  }

  render() {
    return (
      <Button
        className="keypad-image"
        click={this.state.click}
        onClick={this.handleClick}
      >{this.state.value}</Button>
    );
  }
}
