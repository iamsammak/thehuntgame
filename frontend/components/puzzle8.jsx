import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { smSpacing } from '../constants';

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
  ${props => (props.deviate ? 'background-color: rgba(0, 0, 0, 0.1);' : null)}
`;

const maze = [
  [
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    ['right', 'left'],
    ['up', 'left', 'right', 'deviate'],
    ['left', 'down'],
    [],
  ],
  [
    [],
    [],
    [],
    [],
    ['down'],
    ['down'],
    ['right', 'down'],
    ['left', 'up', 'deviate'],
    ['deviate'],
    ['up', 'right', 'deviate'],
    ['left'],
  ],
  [
    [],
    [],
    [],
    ['right'],
    ['up', 'left', 'deviate'],
    ['up', 'deviate'],
    ['up', 'deviate'],
    ['deviate'],
    ['deviate'],
    ['right', 'down', 'deviate'],
    ['left'],
  ],
  [
    [],
    [],
    [],
    ['right'],
    ['left'],
    ['down'],
    ['down'],
    ['down'],
    ['right'],
    ['up', 'left'],
    [],
  ],
  [
    ['down'],
    ['down'],
    ['down'],
    ['right', 'down'],
    ['left', 'right', 'checkpoint'],
    ['up', 'left', 'down'],
    ['up', 'down'],
    ['up', 'right', 'down'],
    ['left', 'right', 'checkpoint'],
    ['left', 'down'],
    ['down'],
  ],
  [
    ['up', 'left', 'deviate'],
    ['up', 'deviate'],
    ['up', 'deviate'],
    ['up', 'right', 'deviate'],
    ['left', 'down'],
    ['up', 'down'],
    ['up'],
    ['up', 'right', 'deviate'],
    ['left'],
    ['up', 'deviate'],
    ['up', 'right', 'deviate'],
  ],
  [
    ['left', 'down', 'deviate'],
    [],
    ['down'],
    ['down'],
    ['up', 'down', 'checkpoint'],
    ['up', 'down'],
    [],
    ['right', 'deviate'],
    ['left'],
    ['deviate'],
    ['right', 'deviate'],
  ],
  [
    ['up', 'right'],
    ['left', 'right'],
    ['up', 'left'],
    ['up'],
    ['up'],
    ['up', 'right'],
    ['left', 'deviate'],
    ['right', 'deviate'],
    ['left', 'down', 'start'],
    ['down', 'deviate'],
    ['right', 'down', 'deviate'],
  ],
  [
    ['right'],
    ['left', 'right', 'down', 'finish'],
    ['left'],
    [],
    [],
    ['right'],
    ['left', 'down', 'deviate'],
    ['right', 'down', 'deviate'],
    ['up', 'left'],
    ['up'],
    ['up'],
  ],
];

class Puzzle8 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      position: [7, 8],
      deviated: false,
      checkpoint: [7, 8],
    };
    this.hasProp = this.hasProp.bind(this);
    this.renderCell = this.renderCell.bind(this);
    this.move = this.move.bind(this);
  }

  move(direction) {
    return () => {
      this.setState((state) => {
        let { position, deviate, checkpoint } = state;
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
            position = checkpoint;
            deviate = false;
          } else {
            // Player reached checkpoint without deviating, set new checkpoint
            checkpoint = position;
          }
        }

        return {
          position,
          deviate,
          checkpoint,
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
        {this.hasProp('start') && 'Start'}
        {this.hasProp('finish') && 'Finish!'}
      </Cell>
    );
  }

  render() {
    return (
      <MazeContainer>
        <Arrow direction="up" disabled={this.hasProp('up')} onClick={this.move('up')} />
        <MiddleContainer>
          <Arrow direction="left" disabled={this.hasProp('left')} onClick={this.move('left')} />
          {this.renderCell()}
          <Arrow direction="right" disabled={this.hasProp('right')} onClick={this.move('right')} />
        </MiddleContainer>
        <Arrow direction="down" disabled={this.hasProp('down')} onClick={this.move('down')} />
      </MazeContainer>
    );
  }
}

export default Puzzle8;
