import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { isSolved } from '../helpers';
import SpeechBubble from './speechBubble';

const border = '2px solid black';
const START_POSITION = [0, 5];
const END_POSITION = [11, 6];
const START_ICON = 'star';
const END_ICON = 'gem';

const MazeContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Maze = styled.div`
  position: relative;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.3);
`;

const Row = styled.div`
  display: flex;
`;

const Cell = styled.div`
  box-sizing: border-box;
  ${props => props.top && `border-top: ${border};`}
  ${props => props.bottom && `border-bottom: ${border};`}
  ${props => props.left && `border-left: ${border};`}
  ${props => props.right && `border-right: ${border};`}
  height: 100px;
  width: 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const IconRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Placeholder = styled.div`
  height: 32px;
  width: 32px;
`;

const Arrow = styled(FontAwesomeIcon).attrs(props => ({
  icon: props.icon,
}))`
  font-size: 32px;
  cursor: ${props => (props.icon === START_ICON ? 'auto' : 'pointer')};
`;

const maze = [
  [
    { top: true, bottom: false, left: true, right: false, icon: null },
    { top: true, bottom: true, left: false, right: false, icon: null },
    { top: true, bottom: true, left: false, right: false, icon: 'arrow-right' },
    { top: true, bottom: true, left: false, right: false, icon: 'arrow-left' },
    { top: true, bottom: false, left: false, right: true, icon: null },
    { top: false, bottom: false, left: true, right: false, icon: 'arrow-right' },
    { top: true, bottom: true, left: false, right: false, icon: 'arrow-left' },
    { top: true, bottom: true, left: false, right: false, icon: null },
    { top: true, bottom: true, left: false, right: false, icon: 'arrow-right' },
    { top: true, bottom: false, left: false, right: false, icon: 'arrow-left' },
    { top: true, bottom: true, left: false, right: false, icon: null },
    { top: true, bottom: false, left: false, right: true, icon: null },
  ],
  [
    { top: false, bottom: false, left: true, right: true, icon: null },
    { top: true, bottom: false, left: true, right: false, icon: null },
    { top: true, bottom: true, left: false, right: false, icon: 'arrow-right' },
    { top: true, bottom: true, left: false, right: false, icon: 'arrow-left' },
    { top: false, bottom: true, left: false, right: true, icon: null },
    { top: false, bottom: false, left: true, right: true, icon: null },
    { top: true, bottom: false, left: true, right: false, icon: null },
    { top: true, bottom: false, left: false, right: true, icon: null },
    { top: true, bottom: false, left: true, right: false, icon: 'arrow-right' },
    { top: false, bottom: true, left: false, right: true, icon: 'arrow-left' },
    { top: true, bottom: false, left: true, right: true, icon: null },
    { top: false, bottom: false, left: true, right: true, icon: null },
  ],
  [
    { top: false, bottom: false, left: true, right: true, icon: 'arrow-down' },
    { top: false, bottom: false, left: true, right: true, icon: 'arrow-down' },
    { top: true, bottom: true, left: true, right: false, icon: null },
    { top: true, bottom: true, left: false, right: true, icon: null },
    { top: true, bottom: false, left: true, right: false, icon: 'arrow-down' },
    { top: false, bottom: true, left: false, right: true, icon: null },
    { top: false, bottom: true, left: true, right: true, icon: null },
    { top: false, bottom: false, left: true, right: true, icon: 'arrow-down' },
    { top: false, bottom: false, left: true, right: true, icon: 'arrow-down' },
    { top: true, bottom: false, left: true, right: true, icon: 'arrow-down' },
    { top: false, bottom: false, left: true, right: true, icon: 'arrow-down' },
    { top: false, bottom: false, left: true, right: true, icon: 'arrow-down' },
  ],
  [
    { top: false, bottom: false, left: true, right: true, icon: 'arrow-up' },
    { top: false, bottom: false, left: true, right: false, icon: 'arrow-up' },
    { top: true, bottom: true, left: false, right: false, icon: 'arrow-right' },
    { top: true, bottom: true, left: false, right: false, icon: 'arrow-left' },
    { top: false, bottom: true, left: false, right: true, icon: 'arrow-up' },
    { top: true, bottom: false, left: true, right: false, icon: 'arrow-right' },
    { top: true, bottom: true, left: false, right: false, icon: 'arrow-left' },
    { top: false, bottom: false, left: false, right: true, icon: 'arrow-up' },
    { top: false, bottom: false, left: true, right: true, icon: 'arrow-up' },
    { top: false, bottom: false, left: true, right: true, icon: 'arrow-up' },
    { top: false, bottom: false, left: true, right: true, icon: 'arrow-up' },
    { top: false, bottom: false, left: true, right: true, icon: 'arrow-up' },
  ],
  [
    { top: false, bottom: false, left: true, right: true, icon: null },
    { top: false, bottom: false, left: true, right: true, icon: null },
    { top: true, bottom: false, left: true, right: false, icon: 'arrow-right' },
    { top: true, bottom: true, left: false, right: false, icon: 'arrow-left' },
    { top: true, bottom: false, left: false, right: true, icon: null },
    { top: false, bottom: false, left: true, right: true, icon: null },
    { top: true, bottom: false, left: true, right: false, icon: null },
    { top: false, bottom: true, left: false, right: true, icon: null },
    { top: false, bottom: true, left: true, right: false, icon: 'arrow-right' },
    { top: false, bottom: true, left: false, right: true, icon: 'arrow-left' },
    { top: false, bottom: true, left: true, right: false, icon: null },
    { top: false, bottom: false, left: false, right: true, icon: null },
  ],
  [
    { top: false, bottom: false, left: true, right: true, icon: 'arrow-down' },
    { top: false, bottom: true, left: true, right: false, icon: null },
    { top: false, bottom: false, left: false, right: true, icon: 'arrow-down' },
    { top: true, bottom: false, left: true, right: true, icon: 'arrow-down' },
    { top: false, bottom: false, left: true, right: true, icon: 'arrow-down' },
    { top: false, bottom: false, left: true, right: true, icon: 'arrow-down' },
    { top: false, bottom: false, left: true, right: false, icon: 'arrow-down' },
    { top: true, bottom: true, left: false, right: false, icon: null },
    { top: true, bottom: true, left: false, right: false, icon: 'arrow-right' },
    { top: true, bottom: true, left: false, right: false, icon: 'arrow-left' },
    { top: true, bottom: false, left: false, right: true, icon: 'arrow-down' },
    { top: false, bottom: false, left: true, right: true, icon: 'arrow-down' },
  ],
  [
    { top: false, bottom: true, left: true, right: false, icon: 'arrow-up' },
    { top: true, bottom: false, left: false, right: true, icon: null },
    { top: false, bottom: false, left: true, right: true, icon: 'arrow-up' },
    { top: false, bottom: false, left: true, right: true, icon: 'arrow-up' },
    { top: false, bottom: true, left: true, right: false, icon: 'arrow-up' },
    { top: false, bottom: true, left: false, right: true, icon: 'arrow-up' },
    { top: false, bottom: false, left: true, right: true, icon: 'arrow-up' },
    { top: true, bottom: true, left: true, right: false, icon: null },
    { top: true, bottom: false, left: false, right: true, icon: null },
    { top: true, bottom: false, left: true, right: false, icon: null },
    { top: false, bottom: true, left: false, right: true, icon: 'arrow-up' },
    { top: false, bottom: false, left: true, right: true, icon: 'arrow-up' },
  ],
  [
    { top: true, bottom: true, left: true, right: false, icon: null },
    { top: false, bottom: true, left: false, right: true, icon: null },
    { top: false, bottom: true, left: true, right: false, icon: 'arrow-right' },
    { top: false, bottom: false, left: false, right: true, icon: 'arrow-left' },
    { top: true, bottom: false, left: true, right: false, icon: null },
    { top: true, bottom: true, left: false, right: true, icon: null },
    { top: false, bottom: true, left: true, right: false, icon: null },
    { top: true, bottom: false, left: false, right: true, icon: null },
    { top: false, bottom: false, left: true, right: true, icon: null },
    { top: false, bottom: false, left: true, right: true, icon: null },
    { top: true, bottom: false, left: true, right: true, icon: null },
    { top: false, bottom: false, left: true, right: true, icon: null },
  ],
  [
    { top: true, bottom: false, left: true, right: false, icon: 'arrow-down' },
    { top: true, bottom: true, left: false, right: false, icon: null },
    { top: true, bottom: false, left: false, right: true, icon: 'arrow-down' },
    { top: false, bottom: false, left: true, right: true, icon: 'arrow-down' },
    { top: false, bottom: false, left: true, right: true, icon: 'arrow-down' },
    { top: true, bottom: true, left: true, right: false, icon: 'arrow-right' },
    { top: true, bottom: true, left: false, right: false, icon: 'arrow-left' },
    { top: false, bottom: true, left: false, right: true, icon: null },
    { top: false, bottom: false, left: true, right: true, icon: 'arrow-down' },
    { top: false, bottom: false, left: true, right: true, icon: 'arrow-down' },
    { top: false, bottom: true, left: true, right: false, icon: null },
    { top: false, bottom: true, left: false, right: true, icon: null },
  ],
  [
    { top: false, bottom: true, left: true, right: false, icon: 'arrow-up' },
    { top: true, bottom: false, left: false, right: true, icon: null },
    { top: false, bottom: false, left: true, right: true, icon: 'arrow-up' },
    { top: false, bottom: false, left: true, right: false, icon: 'arrow-up' },
    { top: false, bottom: true, left: false, right: false, icon: 'arrow-up' },
    { top: true, bottom: true, left: false, right: false, icon: 'arrow-right' },
    { top: true, bottom: true, left: false, right: false, icon: 'arrow-left' },
    { top: true, bottom: true, left: false, right: true, icon: null },
    { top: false, bottom: false, left: true, right: true, icon: 'arrow-up' },
    { top: false, bottom: true, left: true, right: false, icon: 'arrow-up' },
    { top: true, bottom: false, left: false, right: false, icon: null },
    { top: true, bottom: false, left: false, right: true, icon: null },
  ],
  [
    { top: true, bottom: false, left: true, right: false, icon: null },
    { top: false, bottom: true, left: false, right: true, icon: null },
    { top: false, bottom: true, left: true, right: false, icon: 'arrow-right' },
    { top: false, bottom: true, left: false, right: true, icon: 'arrow-left' },
    { top: true, bottom: false, left: true, right: true, icon: null },
    { top: true, bottom: false, left: true, right: false, icon: 'arrow-right' },
    { top: true, bottom: true, left: false, right: false, icon: 'arrow-left' },
    { top: true, bottom: false, left: false, right: true, icon: null },
    { top: false, bottom: true, left: true, right: false, icon: 'arrow-right' },
    { top: true, bottom: true, left: false, right: false, icon: 'arrow-left' },
    { top: false, bottom: true, left: false, right: true, icon: null },
    { top: false, bottom: false, left: true, right: true, icon: null },
  ],
  [
    { top: false, bottom: true, left: true, right: false, icon: null },
    { top: true, bottom: true, left: false, right: false, icon: null },
    { top: true, bottom: true, left: false, right: false, icon: 'arrow-right' },
    { top: true, bottom: true, left: false, right: false, icon: 'arrow-left' },
    { top: false, bottom: true, left: false, right: true, icon: null },
    { top: false, bottom: true, left: true, right: false, icon: 'arrow-right' },
    { top: true, bottom: false, left: false, right: true, icon: 'arrow-left' },
    { top: false, bottom: true, left: true, right: false, icon: null },
    { top: true, bottom: true, left: false, right: false, icon: 'arrow-right' },
    { top: true, bottom: true, left: false, right: false, icon: 'arrow-left' },
    { top: true, bottom: true, left: false, right: false, icon: null },
    { top: false, bottom: true, left: false, right: true, icon: null },
  ],
];

class Puzzle6 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      position: START_POSITION,
    };

    this.move = this.move.bind(this);
    this.renderCell = this.renderCell.bind(this);
    this.calculateAdjacent = this.calculateAdjacent.bind(this);
    this.adjacentKey = this.adjacentKey.bind(this);
    this.isAdjacent = this.isAdjacent.bind(this);
    this.finishPuzzle = this.finishPuzzle.bind(this);
  }

  move(x, y) {
    this.setState({ position: [x, y] });
  }

  adjacentKey(x, y) {
    return `${x},${y}`;
  }

  isAdjacent(x1, y1, x2, y2, adjacentCells) {
    return (adjacentCells[this.adjacentKey(x1, y1)] || []).includes(this.adjacentKey(x2, y2));
  }

  finishPuzzle() {
    const { send } = this.props;
    send('submit', { puzzle: '6', answer: '' });
  }

  renderCell(x, y, adjacent) {
    const options = maze[x][y];
    const onClick = () => {
      switch (options.icon) {
      case 'arrow-up':
        this.move(x - 1, y); break;
      case 'arrow-down':
        this.move(x + 1, y); break;
      case 'arrow-left':
        this.move(x, y - 1); break;
      case 'arrow-right':
        this.move(x, y + 1); break;
      }
    };
    const isStartPosition = x === START_POSITION[0] && y === START_POSITION[1];
    const isEndPosition = x === END_POSITION[0] && y === END_POSITION[1];
    let up = <Placeholder />;
    let left = <Placeholder />;
    let right = <Placeholder />;
    let down = <Placeholder />;
    if (adjacent) {
      switch (options.icon) {
      case 'arrow-up':
        up = <Arrow icon={options.icon} onClick={onClick} />; break;
      case 'arrow-left':
        left = <Arrow icon={options.icon} onClick={onClick} />; break;
      case 'arrow-right':
        right = <Arrow icon={options.icon} onClick={onClick} />; break;
      case 'arrow-down':
        down = <Arrow icon={options.icon} onClick={onClick} />; break;
      default:
      }
    }
    // Assumptions are being made here about where start and end icons are
    // and that they don't overlap with any arrows.
    if (isStartPosition) {
      up = <Arrow icon={START_ICON} onClick={onClick} />;
    }
    if (isEndPosition) {
      down = (
        <Arrow
          icon={END_ICON}
          onClick={() => {
            if (adjacent) {
              this.finishPuzzle();
            }
          }}
        />
      );
    }

    return (
      <Cell {...options}>
        <IconRow>
          <Placeholder />
          {up}
          <Placeholder />
        </IconRow>
        <IconRow>
          {left}
          <Placeholder />
          {right}
        </IconRow>
        <IconRow>
          <Placeholder />
          {down}
          <Placeholder />
        </IconRow>
      </Cell>
    );
  }

  calculateAdjacent(anchorX, anchorY) {
    const adjacent = {};
    function addAdjacent(key1, key2) {
      if (!adjacent[key1] && !adjacent[key2]) {
        const combine = [key1, key2];
        adjacent[key1] = combine;
        adjacent[key2] = combine;
      } else if (!adjacent[key1] && adjacent[key2]) {
        adjacent[key2].push(key1);
        adjacent[key1] = adjacent[key2];
      } else if (adjacent[key1] && !adjacent[key2]) {
        adjacent[key1].push(key2);
        adjacent[key2] = adjacent[key1];
      } else if (adjacent[key1] && adjacent[key2]) {
        adjacent[key1].push(...adjacent[key2]);
        adjacent[key2].forEach((key) => {
          adjacent[key] = adjacent[key1];
        });
      }
    }
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const options = maze[anchorX + i][anchorY + j];
        const key = this.adjacentKey(anchorX + i, anchorY + j);
        if (!options.top) {
          addAdjacent(key, this.adjacentKey(anchorX + i - 1, anchorY + j));
        }
        if (!options.bottom) {
          addAdjacent(key, this.adjacentKey(anchorX + i + 1, anchorY + j));
        }
        if (!options.left) {
          addAdjacent(key, this.adjacentKey(anchorX + i, anchorY + j - 1));
        }
        if (!options.right) {
          addAdjacent(key, this.adjacentKey(anchorX + i, anchorY + j + 1));
        }
      }
    }
    return adjacent;
  }

  render() {
    const { position } = this.state;
    const { gameState, personId } = this.props;
    const solved = isSolved(gameState, '6');

    const [currentX, currentY] = solved ? END_POSITION : position;
    const anchorX = Math.floor(currentX / 3) * 3;
    const anchorY = Math.floor(currentY / 3) * 3;
    const adjacentCells = this.calculateAdjacent(anchorX, anchorY);

    return (
      <div>
        <SpeechBubble personId={personId}>
          Maybe we should check the basement. I think I saw Ryan headed that way, but he hasn&apos;t come back in a while.
        </SpeechBubble>
        <br />
        <MazeContainer>
          <Maze>
            {solved && <Overlay />}
            {
              [...Array(3).keys()].map((i) => {
                return (
                  <Row key={i}>
                    {
                      [...Array(3).keys()].map((j) => {
                        const x = anchorX + i;
                        const y = anchorY + j;
                        return (
                          <div key={j}>
                            {this.renderCell(x, y, this.isAdjacent(x, y, currentX, currentY, adjacentCells))}
                          </div>
                        );
                      })
                    }
                  </Row>
                );
              })
            }
          </Maze>
        </MazeContainer>
        <br />
        {
          solved && (
            <SpeechBubble personId={personId}>
              Ryan, there you are! What kind of crazy basement maze was that?
            </SpeechBubble>
          )
        }
      </div>
    );
  }
}

export default Puzzle6;
