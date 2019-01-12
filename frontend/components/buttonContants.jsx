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

export const OneButton = styled(Button)`
  background-color: ${props => props.one ? '#1995AD' : '#A1D6E2'};
`;

export const TwoButton = styled(Button)`
  background-color: ${props => props.two ? '#1995AD' : '#A1D6E2'};
`;

export const ThreeButton = styled(Button)`
  background-color: ${props => props.three ? '#1995AD' : '#A1D6E2'};
`;

export const FourButton = styled(Button)`
  background-color: ${props => props.four ? '#1995AD' : '#A1D6E2'};
`;

export const FiveButton = styled(Button)`
  background-color: ${props => props.five ? '#1995AD' : '#A1D6E2'};
`;

export const SixButton = styled(Button)`
  background-color: ${props => props.six ? '#1995AD' : '#A1D6E2'};
`;

export const SevenButton = styled(Button)`
  background-color: ${props => props.seven ? '#1995AD' : '#A1D6E2'};
`;

export const EightButton = styled(Button)`
  background-color: ${props => props.eight ? '#1995AD' : '#A1D6E2'};
`;

export const NineButton = styled(Button)`
  background-color: ${props => props.nine ? '#1995AD' : '#A1D6E2'};
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

  handleClick(event) {
    this.setState(state => ({ click: !state.click}));
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
