import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Narration, LgSpacing, SpeechBubbleSpacing } from '../wrappers';
import { smSpacing, white } from '../constants';
import SpeechBubble from './speechBubble';

const START_POSITION = [7, 8];
const ROOM1_COLOR = '#E69288';
const ROOM2_COLOR = '#FEB68E';
const ROOM3_COLOR = '#FED797';
const ROOM4_COLOR = '#999999';
const ROOM5_COLOR = '#F1CDB0';

const MazeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MiddleContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Arrow = styled(FontAwesomeIcon).attrs(props => ({
  icon: `chevron-${props.direction}`,
}))`
  padding: ${smSpacing};
  font-size: 2em;
  ${props => (props.disabled ? 'color: #dddddd;' : null)}
  pointer-events: ${props => (props.disabled ? 'none' : 'auto')};
`;

const Cell = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 150px;
  width: 150px;
  box-sizing: border-box;
  border: 1px solid black;
  background-color: ${props => (props.color ? props.color : white)};
  opacity: ${props => props.opacity || 1};
  ${props => (props.up ? 'border-top-width: 3px;' : null)}
  ${props => (props.left ? 'border-left-width: 3px;' : null)}
  ${props => (props.right ? 'border-right-width: 3px;' : null)}
  ${props => (props.down ? 'border-bottom-width: 3px;' : null)}
`;

const maze = [
  [
    { right: true },
    { left: true, up: true, deviate: true, color: ROOM5_COLOR },
    { up: true, deviate: true, color: ROOM5_COLOR },
    { right: true, up: true, deviate: true, color: ROOM5_COLOR },
    { left: true },
    {},
    { right: true },
    { left: true, up: true, deviate: true, color: ROOM2_COLOR },
    { up: true, deviate: true, color: ROOM2_COLOR },
    { right: true, up: true, deviate: true, color: ROOM2_COLOR },
    { left: true },
  ],
  [
    { right: true, down: true },
    { left: true, deviate: true, color: ROOM5_COLOR },
    { deviate: true, color: ROOM5_COLOR },
    { right: true, deviate: true, color: ROOM5_COLOR },
    { left: true, down: true },
    { down: true },
    { right: true, down: true },
    { left: true, deviate: true, color: ROOM2_COLOR },
    { deviate: true, color: ROOM2_COLOR },
    { right: true, deviate: true, color: ROOM2_COLOR },
    { left: true },
  ],
  [
    { left: true, down: true, up: true, finish: true, color: ROOM5_COLOR },
    { checkpoint: true, color: ROOM5_COLOR },
    { color: ROOM5_COLOR },
    { right: true, color: ROOM5_COLOR },
    { left: true, up: true, deviate: true, color: ROOM2_COLOR },
    { up: true, deviate: true, color: ROOM2_COLOR },
    { up: true, deviate: true, color: ROOM2_COLOR },
    { deviate: true, color: ROOM2_COLOR },
    { deviate: true, color: ROOM2_COLOR },
    { right: true, down: true, deviate: true, color: ROOM2_COLOR },
    { left: true, color: ROOM2_COLOR },
  ],
  [
    { right: true, up: true },
    { left: true, color: ROOM5_COLOR },
    { color: ROOM5_COLOR },
    { right: true, color: ROOM5_COLOR },
    { left: true, down: true, deviate: true, color: ROOM2_COLOR },
    { color: ROOM2_COLOR },
    { down: true, color: ROOM2_COLOR },
    { down: true, color: ROOM2_COLOR },
    { right: true, color: ROOM2_COLOR },
    { left: true, up: true },
    {},
  ],
  [
    { right: true, down: true },
    { left: true, down: true, color: ROOM5_COLOR },
    { down: true, color: ROOM5_COLOR },
    { right: true, checkpoint: true, color: ROOM5_COLOR },
    { left: true, up: true, color: ROOM3_COLOR },
    { checkpoint: true, color: ROOM3_COLOR },
    { right: true, up: true, deviate: true, color: ROOM3_COLOR },
    { right: true, left: true, up: true },
    { right: true, left: true, checkpoint: true, color: ROOM1_COLOR },
    { left: true, down: true },
    { down: true },
  ],
  [
    { left: true, up: true, deviate: true, color: ROOM4_COLOR },
    { up: true, deviate: true, color: ROOM4_COLOR },
    { right: true, up: true, deviate: true, color: ROOM4_COLOR },
    { left: true, color: ROOM3_COLOR },
    { color: ROOM3_COLOR },
    { color: ROOM3_COLOR },
    { right: true, deviate: true, color: ROOM3_COLOR },
    { right: true, left: true },
    { left: true, color: ROOM1_COLOR },
    { up: true, deviate: true, color: ROOM1_COLOR },
    { right: true, up: true, deviate: true, color: ROOM1_COLOR },
  ],
  [
    { left: true, deviate: true, color: ROOM4_COLOR },
    { deviate: true, color: ROOM4_COLOR },
    { deviate: true, color: ROOM4_COLOR },
    { deviate: true, color: ROOM3_COLOR },
    { deviate: true, color: ROOM3_COLOR },
    { deviate: true, color: ROOM3_COLOR },
    { right: true, deviate: true, color: ROOM3_COLOR },
    { right: true, left: true },
    { left: true, color: ROOM1_COLOR },
    { deviate: true, color: ROOM1_COLOR },
    { right: true, deviate: true, color: ROOM1_COLOR },
  ],
  [
    { left: true, deviate: true, color: ROOM4_COLOR },
    { deviate: true, color: ROOM4_COLOR },
    { right: true, deviate: true, color: ROOM4_COLOR },
    { left: true, deviate: true, color: ROOM3_COLOR },
    { deviate: true, color: ROOM3_COLOR },
    { deviate: true, color: ROOM3_COLOR },
    { right: true, deviate: true, color: ROOM3_COLOR },
    { right: true, left: true },
    { left: true, down: true, start: true, color: ROOM1_COLOR },
    { down: true, deviate: true, color: ROOM1_COLOR },
    { right: true, down: true, deviate: true, color: ROOM1_COLOR },
  ],
  [
    { left: true, down: true, deviate: true, color: ROOM4_COLOR },
    { down: true, deviate: true, color: ROOM4_COLOR },
    { right: true, down: true, deviate: true, color: ROOM4_COLOR },
    { left: true, down: true, deviate: true, color: ROOM3_COLOR },
    { down: true, deviate: true, color: ROOM3_COLOR },
    { down: true, deviate: true, color: ROOM3_COLOR },
    { right: true, down: true, deviate: true, color: ROOM3_COLOR },
    { left: true },
    { up: true },
    { up: true },
    { up: true },
  ],
];

class Puzzle8 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      position: START_POSITION,
      deviated: false,
    }; this.hasProp = this.hasProp.bind(this);
    this.renderCell = this.renderCell.bind(this);
    this.move = this.move.bind(this);
  }

  move(direction) {
    return () => {
      this.setState((state) => {
        let { error, position, deviate } = state;
        switch (direction) {
        case 'up':
          position = [position[0] - 1, position[1]]; break;
        case 'left':
          position = [position[0], position[1] - 1]; break;
        case 'right':
          position = [position[0], position[1] + 1]; break;
        case 'down':
          position = [position[0] + 1, position[1]]; break;
        }

        const [x, y] = position;

        // New position has caused player to deviate, set that too
        if (maze[x][y].deviate) {
          deviate = true;
        }

        // Checkpoint is coming up
        if (maze[x][y].checkpoint) {
          if (deviate) {
            // Player has deviated, reset them to last checkpoint
            position = START_POSITION;
            deviate = false;
            error = true;
            setTimeout(() => {
              this.setState({ error: false });
            }, 3000);
          }
        }

        if (maze[x][y].finish) {
          // Give them some time to realize they finished.
          setTimeout(() => {
            const { send } = this.props;
            send('submit', { puzzle: 8, answer: '' });
          }, 1500);
        }

        return {
          error,
          position,
          deviate,
        };
      });
    };
  }

  hasProp(prop) {
    const { position } = this.state;
    const [x, y] = position;

    return !!maze[x][y][prop];
  }

  renderCell() {
    const { position } = this.state;
    const [x, y] = position;
    const opacity = (x + y) % 2 === 0 ? 0.9 : 1;

    return (
      <Cell {...maze[x][y]} opacity={opacity}>
        {this.hasProp('start') && <FontAwesomeIcon icon="car-side" size="3x" />}
        {this.hasProp('finish') && <FontAwesomeIcon icon="heart" size="3x" />}
      </Cell>
    );
  }

  render() {
    const { personId } = this.props;
    const { error } = this.state;

    return (
      <div>
        <Narration>You find Jay outside and hand him the flashlight.</Narration>
        <SpeechBubble personId={personId}>
          Ah, thanks for the flashlight! Help me retrace my steps and see if I dropped it anywhere. I was carrying in decorations for the sweetheart table from my car...
        </SpeechBubble>
        <MazeContainer>
          <Arrow direction="up" disabled={this.hasProp('up')} onClick={this.move('up')} />
          <MiddleContainer>
            <Arrow direction="left" disabled={this.hasProp('left')} onClick={this.move('left')} />
            {this.renderCell()}
            <Arrow direction="right" disabled={this.hasProp('right')} onClick={this.move('right')} />
          </MiddleContainer>
          <Arrow direction="down" disabled={this.hasProp('down')} onClick={this.move('down')} />
        </MazeContainer>
        {
          error ? (
            <SpeechBubble personId={personId}>
              That would take us to the next room, but we walked too much to get there. Let&apos;s try this again.
            </SpeechBubble>
          ) : (
            <SpeechBubbleSpacing lines={1} />
          )
        }
        <LgSpacing />
      </div>
    );
  }
}

export default Puzzle8;
