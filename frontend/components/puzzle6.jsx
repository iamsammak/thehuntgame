import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { isSolved } from '../helpers';

const border = '2px solid black';
const START_ICON = 'star';
const END_ICON = 'gem';

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
  ${props => {
    switch (props.icon) {
    case 'arrow-up':
    case START_ICON:
      return 'align-items: flex-start; justify-content: center';
    case 'arrow-down':
    case END_ICON:
      return 'align-items: flex-end; justify-content: center';
    case 'arrow-left':
      return 'align-items: center; justify-content: flex-start;';
    case 'arrow-right':
      return 'align-items: center; justify-content: flex-end;';
    }
  }}
`;

const Arrow = styled(FontAwesomeIcon).attrs(props => ({
  icon: props.icon,
}))`
  font-size: 32px;
  cursor: ${props => (props.icon === START_ICON ? 'auto' : 'pointer')};
`;

const maze = [
  [
    { top: true, bottom: true, left: true, right: false, icon: null },
    { top: true, bottom: true, left: false, right: false, icon: null },
    { top: true, bottom: false, left: false, right: true, icon: null },
    { top: true, bottom: false, left: true, right: false, icon: null },
    { top: false, bottom: true, left: false, right: false, icon: START_ICON },
    { top: true, bottom: true, left: false, right: false, icon: 'arrow-right' },
    { top: true, bottom: true, left: false, right: false, icon: 'arrow-left' },
    { top: true, bottom: false, left: false, right: true, icon: null },
    { top: true, bottom: false, left: true, right: true, icon: null },
  ],
  [
    { top: true, bottom: false, left: true, right: false, icon: null },
    { top: true, bottom: false, left: false, right: true, icon: null },
    { top: false, bottom: true, left: true, right: false, icon: 'arrow-right' },
    { top: false, bottom: false, left: false, right: false, icon: 'arrow-left' },
    { top: true, bottom: false, left: false, right: true, icon: null },
    { top: true, bottom: false, left: true, right: false, icon: 'arrow-right' },
    { top: true, bottom: false, left: false, right: true, icon: 'arrow-left' },
    { top: false, bottom: true, left: true, right: false, icon: null },
    { top: false, bottom: false, left: false, right: true, icon: null },
  ],
  [
    { top: false, bottom: false, left: true, right: true, icon: 'arrow-down' },
    { top: false, bottom: false, left: true, right: false, icon: 'arrow-down' },
    { top: true, bottom: true, left: false, right: true, icon: null },
    { top: false, bottom: true, left: true, right: true, icon: null },
    { top: false, bottom: true, left: true, right: false, icon: null },
    { top: false, bottom: true, left: false, right: true, icon: null },
    { top: false, bottom: true, left: true, right: false, icon: null },
    { top: true, bottom: false, left: false, right: true, icon: 'arrow-down' },
    { top: false, bottom: false, left: true, right: true, icon: 'arrow-down' },
  ],
  [
    { top: false, bottom: false, left: true, right: true, icon: 'arrow-up' },
    { top: false, bottom: true, left: true, right: false, icon: 'arrow-up' },
    { top: true, bottom: true, left: false, right: false, icon: 'arrow-right' },
    { top: true, bottom: true, left: false, right: false, icon: 'arrow-left' },
    { top: true, bottom: false, left: false, right: false, icon: null },
    { top: true, bottom: true, left: false, right: false, icon: 'arrow-right' },
    { top: true, bottom: false, left: false, right: false, icon: 'arrow-left' },
    { top: false, bottom: true, left: false, right: true, icon: 'arrow-up' },
    { top: false, bottom: false, left: true, right: true, icon: 'arrow-up' },
  ],
  [
    { top: false, bottom: false, left: true, right: false, icon: null },
    { top: true, bottom: false, left: false, right: true, icon: null },
    { top: true, bottom: false, left: true, right: false, icon: 'arrow-right' },
    { top: true, bottom: false, left: false, right: true, icon: 'arrow-left' },
    { top: false, bottom: true, left: true, right: true, icon: null },
    { top: true, bottom: true, left: true, right: false, icon: 'arrow-right' },
    { top: false, bottom: true, left: false, right: true, icon: 'arrow-left' },
    { top: true, bottom: true, left: true, right: false, icon: null },
    { top: false, bottom: false, left: false, right: true, icon: null },
  ],
  [
    { top: false, bottom: true, left: true, right: true, icon: null },
    { top: false, bottom: true, left: true, right: false, icon: null },
    { top: false, bottom: true, left: false, right: true, icon: null },
    { top: false, bottom: true, left: true, right: false, icon: null },
    { top: true, bottom: false, left: false, right: true, icon: END_ICON },
    { top: true, bottom: true, left: true, right: false, icon: 'arrow-right' },
    { top: true, bottom: true, left: false, right: false, icon: 'arrow-left' },
    { top: true, bottom: true, left: false, right: false, icon: null },
    { top: false, bottom: true, left: false, right: true, icon: null },
  ],
];

class Puzzle6 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      position: [0, 4],
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
    return adjacentCells[this.adjacentKey(x1, y1)].includes(this.adjacentKey(x2, y2));
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
      case END_ICON:
        if (adjacent) {
          this.finishPuzzle();
        }
      }
    };
    const showIcon = adjacent || [START_ICON, END_ICON].includes(options.icon);
    return (
      <Cell {...options}>
        { options.icon && showIcon && <Arrow icon={options.icon} onClick={onClick} /> }
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
    const { gameState } = this.props;
    const solved = isSolved(gameState, 6);

    const [currentX, currentY] = position;
    const anchorX = Math.floor(currentX / 3) * 3;
    const anchorY = Math.floor(currentY / 3) * 3;
    const adjacentCells = this.calculateAdjacent(anchorX, anchorY);

    return (
      <div>
        <p>
          Maybe we should check the basement. I think I saw Ryan headed that way, but he hasn&apos;t come back in a while.
        </p>
        <div>
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
        </div>
        {
          solved && (
            <p>
              Ryan, there you are! What kind of crazy basement maze was that?
            </p>
          )
        }
      </div>
    );
  }
}

export default Puzzle6;
