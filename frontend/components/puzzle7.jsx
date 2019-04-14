import React from 'react';
import styled from 'styled-components';

import { CenteredRow, Narration, MdSpacing, SpeechBubbleSpacing } from '../wrappers';
import { isSolved } from '../helpers';
import { smSpacing } from '../constants';
import SpeechBubble from './speechBubble';
import Switch from './switch';
import Puzzle7Clue from './puzzle7Clue';
import { Button } from './buttons';

const SwitchContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin: ${smSpacing}px 0;
`;

const THRESHOLD = 60000; // 1 minute
const INITIAL_SWITCH_STATE = [false, false, false, false, false, false, false, false, false, false];

class Puzzle7 extends React.Component {
  constructor(props) {
    super(props);
    this.onToggleSwitch = this.onToggleSwitch.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.lastAttempt = this.lastAttempt.bind(this);
    this.isWaiting = this.isWaiting.bind(this);
    this.setWaitingTimeout = this.setWaitingTimeout.bind(this);
    this.clearWaitingTimeout = this.clearWaitingTimeout.bind(this);
    const waiting = this.isWaiting(props);
    this.state = {
      switchState: INITIAL_SWITCH_STATE,
      waiting: waiting,
    };
    if (waiting) {
      this.setWaitingTimeout(props);
    }
  }

  componentWillReceiveProps(nextProps) {
    // Recalculate everything when new props come in
    const waiting = this.isWaiting(nextProps);

    this.setState({ waiting: waiting });
    this.clearWaitingTimeout();
    if (waiting) {
      this.setWaitingTimeout(nextProps);
    }
  }

  componentWillUnmount() {
    this.clearWaitingTimeout();
  }

  clearWaitingTimeout() {
    if (this.waiter) {
      clearTimeout(this.waiter);
    }
  }

  setWaitingTimeout(props) {
    this.waiter = setTimeout(() => {
      this.setState({ waiting: false });
    }, this.lastAttempt(props).valueOf() + THRESHOLD - Date.now());
  }

  lastAttempt(props) {
    const { gameState } = props;
    return (gameState['7'] && gameState['7'].last_attempt && new Date(gameState['7'].last_attempt)) || new Date(0);
  }

  isWaiting(props) {
    return Date.now() - this.lastAttempt(props) < THRESHOLD;
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
    const { switchState, waiting } = this.state;
    const { gameState, personId } = this.props;
    const solved = isSolved(gameState, '7');

    const switchLayout = [
      [0, 5],
      [1, 6],
      [2, 7],
      [3, 8],
      [4, 9],
    ];

    return (
      <div>
        <Narration>You find Ryan at a panel with ten switches.</Narration>
        <SpeechBubble personId={personId}>
          The venue manager told us to open this panel in case of an emergency. Given that it&apos;s almost time for their getaway and we still don&apos;t have the key, I think this is an emergency. Only thing is that the manager gave each member of the bridal party one part of the directions for how to open it. Can you help us figure this out?
        </SpeechBubble>
        <Puzzle7Clue personId={personId} />
        {
          switchLayout.map((row, i) => {
            return (
              <SwitchContainer key={i}>
                {
                  row.map((index) => {
                    const on = switchState[index];
                    return (
                      <Switch
                        key={index}
                        disabled={waiting || solved}
                        on={on}
                        onToggleSwitch={this.onToggleSwitch(index)}
                        switchNumber={index + 1}
                      />
                    );
                  })
                }
              </SwitchContainer>
            );
          })
        }
        {
          waiting && (
            <Narration danger>
              The panel&apos;s security has been activated, which locks you out! You need to wait a minute before trying again.
            </Narration>
          )
        }
        <CenteredRow>
          <Button onClick={this.handleSubmit} disabled={solved || waiting}>Connect</Button>
        </CenteredRow>
        {
          solved ? (
            <div>
              <SpeechBubble personId={personId}>
                Finally! Let&apos;s see what&apos;s in here...A flashlight? All that for a flashlight?! Unbelievable...
              </SpeechBubble>
              <Narration>You found a flashlight.</Narration>
            </div>
          ) : (
            <div>
              <SpeechBubbleSpacing lines={5} />
              <MdSpacing />
            </div>
          )
        }
      </div>
    );
  }
}

export default Puzzle7;
