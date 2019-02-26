import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Narration, LgSpacing } from '../wrappers';
import { smSpacing } from '../constants';

const START_POSITION = [7, 8];

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
  ${props => (props.up ? 'border-top-width: 3px;' : null)}
  ${props => (props.left ? 'border-left-width: 3px;' : null)}
  ${props => (props.right ? 'border-right-width: 3px;' : null)}
  ${props => (props.down ? 'border-bottom-width: 3px;' : null)}
`;

const maze = [
  [
    ['right'],
    ['left', 'up', 'deviate'],
    ['up', 'deviate'],
    ['right', 'up', 'deviate'],
    ['left'],
    [],
    ['right'],
    ['left', 'up', 'deviate'],
    ['up', 'deviate'],
    ['right', 'up', 'deviate'],
    ['left'],
  ],
  [
    ['right', 'down'],
    ['left', 'deviate'],
    ['deviate'],
    ['right', 'deviate'],
    ['left', 'down'],
    ['down'],
    ['right', 'down'],
    ['left', 'deviate'],
    ['deviate'],
    ['right', 'deviate'],
    ['left'],
  ],
  [
    ['left', 'down', 'up', 'finish'],
    [],
    [],
    ['right'],
    ['left', 'up', 'deviate'],
    ['up', 'deviate'],
    ['up', 'deviate'],
    ['deviate'],
    ['deviate'],
    ['right', 'down', 'deviate'],
    ['left'],
  ],
  [
    ['right', 'up'],
    ['left'],
    [],
    ['right'],
    ['left', 'down'],
    [],
    ['down'],
    ['down'],
    ['right'],
    ['left', 'up'],
    [],
  ],
  [
    ['right', 'down'],
    ['left', 'down'],
    ['down'],
    ['right'],
    ['right', 'left', 'down', 'up'],
    ['right', 'left', 'checkpoint'],
    ['left', 'down', 'up'],
    ['right', 'up'],
    ['right', 'left', 'checkpoint'],
    ['left', 'down'],
    ['down'],
  ],
  [
    ['left', 'up', 'deviate'],
    ['up', 'deviate'],
    ['right', 'up', 'deviate'],
    ['right', 'left', 'checkpoint'],
    ['left', 'up'],
    [],
    ['right', 'up', 'deviate'],
    ['right', 'left'],
    ['left'],
    ['up', 'deviate'],
    ['right', 'up', 'deviate'],
  ],
  [
    ['left', 'deviate'],
    ['deviate'],
    ['deviate'],
    [],
    [],
    [],
    ['right', 'deviate'],
    ['right', 'left'],
    ['left'],
    ['deviate'],
    ['right', 'deviate'],
  ],
  [
    ['left', 'deviate'],
    ['deviate'],
    ['right', 'deviate'],
    ['left', 'deviate'],
    ['deviate'],
    ['deviate'],
    ['right', 'deviate'],
    ['right', 'left'],
    ['left', 'down', 'start'],
    ['down', 'deviate'],
    ['right', 'down', 'deviate'],
  ],
  [
    ['left', 'down', 'deviate'],
    ['down', 'deviate'],
    ['right', 'down', 'deviate'],
    ['left', 'down', 'deviate'],
    ['down', 'deviate'],
    ['down', 'deviate'],
    ['right', 'down', 'deviate'],
    ['left'],
    ['up'],
    ['up'],
    ['up'],
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
        if (maze[x][y].includes('deviate')) {
          deviate = true;
        }

        // Checkpoint is coming up
        if (maze[x][y].includes('checkpoint')) {
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

        if (maze[x][y].includes('finish')) {
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

    return maze[x][y].includes(prop);
  }

  renderCell() {
    return (
      <Cell
        up={this.hasProp('up')}
        left={this.hasProp('left')}
        right={this.hasProp('right')}
        down={this.hasProp('down')}
        deviate={this.hasProp('deviate')}
      >
        {this.hasProp('start') && <FontAwesomeIcon icon="car-side" size="3x" />}
        {this.hasProp('finish') && 'Finish!'}
      </Cell>
    );
  }

  render() {
    const { error } = this.state;
    return (
      <div>
        <Narration>You find Jay outside and hand him the flashlight.</Narration>
        <p>
          Ah, thanks for the flashlight! Help me retrace my steps and see if I dropped it anywhere. I was carrying in decorations for the sweetheart table from my car...
        </p>
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
          error && (
            <p>
              No, no...that&apos;s not where I went. Let&apos;s try again.
            </p>
          )
        }
        <LgSpacing />
      </div>
    );
  }
}

export default Puzzle8;
