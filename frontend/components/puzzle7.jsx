import React from 'react';
import styled from 'styled-components';

import { smSpacing } from '../constants';
import Switch from './switch';

const SwitchContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin: ${smSpacing}px 0;
`;

const SubmitButton = styled.button`
`;

const INITIAL_SWITCH_STATE = [false, false, false, false, false, false, false, false, false, false];

class Puzzle7 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      switchState: INITIAL_SWITCH_STATE,
    };
    this.onToggleSwitch = this.onToggleSwitch.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onToggleSwitch(index) {
    return () => {
      this.setState((state) => {
        const newSwitchState = state.switchState.slice();
        newSwitchState[index] = !newSwitchState[index];
        return { switchState: newSwitchState };
      });
    };
  }

  handleSubmit() {
    const { send } = this.props;
    const { switchState } = this.state;

    send('submit', { puzzle: 7, answer: switchState });
    this.setState({ switchState: INITIAL_SWITCH_STATE });
  }

  render() {
    const { switchState } = this.state;

    const chunkSize = 5;
    const startIndices = [];
    for (let i = 0; i < switchState.length; i += chunkSize) {
      startIndices.push(i);
    }

    return (
      <div>
        {
          startIndices.map((i) => {
            return (
              <SwitchContainer key={i}>
                {
                  switchState.slice(i, i + chunkSize).map((ss, index) => {
                    const realIndex = i + index;
                    return <Switch key={realIndex} on={ss} onToggleSwitch={this.onToggleSwitch(realIndex)} />;
                  })
                }
              </SwitchContainer>
            );
          })
        }
        <SubmitButton onClick={this.handleSubmit}>
          Connect
        </SubmitButton>
      </div>
    );
  }
}

export default Puzzle7;
