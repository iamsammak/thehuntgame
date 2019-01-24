import React from 'react';
import styled from 'styled-components';

const flipperShadow = 'rgba(0, 0, 0, 0.3)';
const flipperAccent = 'rgba(240, 240, 240)';
const flipperBottomShadow = 'rgba(0, 0, 0, 0.5)';
const switchContainerColor = 'rgba(200, 200, 200, 0.9)';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 90px;
  width: 50px;
  border: 2px solid ${switchContainerColor};
`;

const Screw = styled.div`
  border-radius: 3px;
  height: 6px;
  width: 6px;
  background-color: ${switchContainerColor};
`;

const FlipperContainer = styled.div`
  position: relative;
  border: 1px solid ${switchContainerColor};
  height: 40px;
  width: 20px;
`;

const FlipperShadow = styled.div`
  position: absolute;
  ${props => (props.on ? 'top: 0;' : 'bottom: 0;')}
  background-color: ${flipperShadow};
  height: ${props => (props.on ? 1 : 2)}px;
  width: 100%;
`;

const FlipperTop = styled.div`
  box-sizing: border-box;
  background-color: ${props => (props.on ? flipperAccent : 'white')};
  height: 20px;
  width: 100%;
`;

const FlipperBottom = styled.div`
  box-sizing: border-box;
  height: 20px;
  width: 100%;
  background-color: ${props => (props.on ? 'white' : flipperAccent)};
`;

const BottomFlipperShadow = styled.div`
  position: absolute;
  z-index: 1;
  transform: rotate(5deg) scale(0.9365) skew(10deg) translateX(1px) translateY(2px);
  bottom: 0;
  height: 20px;
  width: 100%;
  background-color: ${flipperBottomShadow};
`;

class Switch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      on: true,
    };
    this.toggleSwitch = this.toggleSwitch.bind(this);
  }

  toggleSwitch() {
    this.setState(state => { return { on: !state.on }; });
  }

  render() {
    const { on } = this.state;

    return (
      <Container>
        <Screw />
        <FlipperContainer>
          <FlipperShadow on={on} />
          <FlipperTop on={on} onClick={this.toggleSwitch} />
          <FlipperBottom on={on} onClick={this.toggleSwitch} />
          {!on && <BottomFlipperShadow />}
        </FlipperContainer>
        <Screw />
      </Container>
    );
  }
}

export default Switch;
