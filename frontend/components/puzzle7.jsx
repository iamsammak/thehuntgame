import React from 'react';
import styled from 'styled-components';

import { Narration } from '../wrappers';
import { isSolved } from '../helpers';
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
    const { gameState } = this.props;
    const solved = isSolved(gameState, '7');

    const chunkSize = 5;
    const startIndices = [];
    for (let i = 0; i < switchState.length; i += chunkSize) {
      startIndices.push(i);
    }

    return (
      <div>
        <Narration>You find Ryan at a panel with ten switches.</Narration>
        <p>
          The venue manager told us to open this panel in case of emergency. Given that it&apos;s almost time for their getaway and we still don&apos;t have the key, I think this is an emergency. Only thing is that the manager told each of us how to open it, but we each only have part of the code. Can you figure this out?
        </p>
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
        <SubmitButton onClick={this.handleSubmit} disabled={solved}>
          Connect
        </SubmitButton>
        {
          solved && (
            <div>
              <p>
                Finally! Let&apos;s see what&apos;s in here...A flashlight? All that for a flashlight?! Unbelievable...
              </p>
              <Narration>You found a flashlight.</Narration>
            </div>
          )
        }
      </div>
    );
  }
}

export default Puzzle7;
