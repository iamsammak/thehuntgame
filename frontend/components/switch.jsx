import React from 'react';
import styled, { css, keyframes } from 'styled-components';

const METAL_GRAY = '#A9A9A9';
const METAL_SILVER = '#C4CACE';
const RUBBER_RED = '#FF6F75';
const DARK_RUBBER_RED = '#BA4347';

const noop = () => {};

const handleAnimation = (props) => keyframes`
  from {
    transform: translate(0, 0) rotate(90deg);
    filter: drop-shadow(5px ${props.on ? 3 : -3}px 3px black);
  }
  to {
    transform: translate(${props.on ? 100 : -100}px, 0) rotate(90deg);
    filter: drop-shadow(5px ${props.on ? -3 : 3}px 3px black);
  }
`;

const armAnimation = (props) => keyframes`
  from {
    transform: rotateY(${props.on ? 0 : 180}deg);
  }
  to {
    transform: rotateY(${props.on ? 180 : 0}deg);
  }
`;

const Base = styled.div`
  background-color: ${METAL_GRAY};
  width: 100px;
  height: 60px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const Groove = styled.div`
  width: 75px;
  height: 6px;
  background-color: black;
  border-radius: 1px;
`;

const Labels = styled.div`
  position: absolute;
  width: 82%;
  top: 0;
  left: 8px;
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Off = styled.div`
  color: red;
  font-size: 12px;
`;

const On = styled.div`
  color: green;
  font-size: 12px;
`;

const Lever = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
`;

const LeverHandle = styled.div`
  width: 40px;
  height: 10px;
  transform: rotate(90deg);
  background-image: linear-gradient(to bottom, ${DARK_RUBBER_RED} 10%, ${RUBBER_RED} 80%, ${DARK_RUBBER_RED});
  position: absolute;
  ${props => (props.switching !== props.on ? 'right: -20px;' : 'left: -20px;')}
  animation: ${props => {
    return props.switching ?
      css`${handleAnimation(props)} 0.5s ease-in-out` :
      null;
  }};
  filter: drop-shadow(5px ${props => (props.switching !== props.on ? -3 : 3)}px 3px black);
`;

const LeverArm = styled.div`
  width: 50px;
  height: 5px;
  background-image: linear-gradient(to right, ${METAL_SILVER} 75%, black);
  transform-origin: ${props => (props.on ? '100% 50% 0' : '100% 50% 0')};
  transform: ${props => (props.switching !== props.on ? 'rotateY(180deg);' : 'rotateY(0deg);')}
  animation: ${props => {
    return props.switching ?
      css`${armAnimation(props)} 0.5s linear` :
      null;
  }};
  filter: drop-shadow(-5px 3px 4px black);
`;

class Switch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      switching: false,
    };
  }
  componentWillReceiveProps(nextProps) {
    const { on: currentOn } = this.props;
    const { on: nextOn } = nextProps;
    if (currentOn != nextOn) {
      this.setState({ switching: true });
      setTimeout(() => {
        this.setState({ switching: false });
      }, 500);
    }
  }

  render() {
    const {
      disabled,
      on,
      onToggleSwitch,
      switchNumber,
    } = this.props;
    const { switching } = this.state;

    return (
      <Base onClick={disabled ? noop : onToggleSwitch}>
        <Groove />
        <Labels>
          <Off>OFF</Off>
          {switchNumber}
          <On>ON</On>
        </Labels>
        <Groove />
        <Lever>
          <LeverArm on={on} switching={switching} />
          <LeverArm on={on} switching={switching} />
          <LeverHandle on={on} switching={switching} />
        </Lever>
      </Base>
    );
  }
}

export default Switch;
