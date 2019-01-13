import React from 'react';
import styled from 'styled-components';

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
  background-color: ${props => props.click ? '#1995AD' : '#A1D6E2'};
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
