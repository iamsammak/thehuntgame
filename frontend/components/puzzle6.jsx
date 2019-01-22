import React from 'react';
import styled from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const border = '2px solid black';

const Container = styled.div`
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
  ${props => {
    switch (props.move) {
    case 'up':
      return 'align-items: flex-start; justify-content: center';
    case 'down':
      return 'align-items: flex-end; justify-content: center';
    case 'left':
      return 'align-items: center; justify-content: flex-start;';
    case 'right':
      return 'align-items: center; justify-content: flex-end;';
    }
  }}
`;

const Arrow = styled(FontAwesomeIcon).attrs(props => ({
  icon: `arrow-${props.move}`,
}))`
  font-size: 32px;
  cursor: pointer;
`;

const maze = [
  [
    { top: true, bottom: true, left: true, right: false, move: null },
    { top: true, bottom: true, left: false, right: false, move: null },
    { top: true, bottom: false, left: false, right: true, move: null },
    { top: true, bottom: false, left: true, right: false, move: null },
    { top: false, bottom: true, left: false, right: false, move: null },
    { top: true, bottom: true, left: false, right: false, move: 'right' },
    { top: true, bottom: true, left: false, right: false, move: 'left' },
    { top: true, bottom: false, left: false, right: true, move: null },
    { top: true, bottom: false, left: true, right: true, move: null },
  ],
  [
    { top: true, bottom: false, left: true, right: false, move: null },
    { top: true, bottom: false, left: false, right: true, move: null },
    { top: false, bottom: true, left: true, right: false, move: 'right' },
    { top: false, bottom: false, left: false, right: false, move: 'left' },
    { top: true, bottom: false, left: false, right: true, move: null },
    { top: true, bottom: false, left: true, right: false, move: 'right' },
    { top: true, bottom: false, left: false, right: true, move: 'left' },
    { top: false, bottom: true, left: true, right: false, move: null },
    { top: false, bottom: false, left: false, right: true, move: null },
  ],
  [
    { top: false, bottom: false, left: true, right: true, move: 'down' },
    { top: false, bottom: false, left: true, right: false, move: 'down' },
    { top: true, bottom: true, left: false, right: true, move: null },
    { top: false, bottom: true, left: true, right: true, move: null },
    { top: false, bottom: true, left: true, right: false, move: null },
    { top: false, bottom: true, left: false, right: true, move: null },
    { top: false, bottom: true, left: true, right: false, move: null },
    { top: true, bottom: false, left: false, right: true, move: 'down' },
    { top: false, bottom: false, left: true, right: true, move: 'down' },
  ],
  [
    { top: false, bottom: false, left: true, right: true, move: 'up' },
    { top: false, bottom: true, left: true, right: false, move: 'up' },
    { top: true, bottom: true, left: false, right: false, move: 'right' },
    { top: true, bottom: true, left: false, right: false, move: 'left' },
    { top: true, bottom: false, left: false, right: false, move: null },
    { top: true, bottom: true, left: false, right: false, move: 'right' },
    { top: true, bottom: false, left: false, right: false, move: 'left' },
    { top: false, bottom: true, left: false, right: true, move: 'up' },
    { top: false, bottom: false, left: true, right: true, move: 'up' },
  ],
  [
    { top: false, bottom: false, left: true, right: false, move: null },
    { top: true, bottom: false, left: false, right: true, move: null },
    { top: true, bottom: false, left: true, right: false, move: 'right' },
    { top: true, bottom: false, left: false, right: true, move: 'left' },
    { top: false, bottom: true, left: true, right: true, move: null },
    { top: true, bottom: true, left: true, right: false, move: 'right' },
    { top: false, bottom: true, left: false, right: true, move: 'left' },
    { top: true, bottom: true, left: true, right: false, move: null },
    { top: false, bottom: false, left: false, right: true, move: null },
  ],
  [
    { top: false, bottom: true, left: true, right: true, move: null },
    { top: false, bottom: true, left: true, right: false, move: null },
    { top: false, bottom: true, left: false, right: true, move: null },
    { top: false, bottom: true, left: true, right: false, move: null },
    { top: true, bottom: false, left: false, right: true, move: null },
    { top: true, bottom: true, left: true, right: false, move: 'right' },
    { top: true, bottom: true, left: false, right: false, move: 'left' },
    { top: true, bottom: true, left: false, right: false, move: null },
    { top: false, bottom: true, left: false, right: true, move: null },
  ],
];

class Puzzle6 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      position: [0, 0],
    };

    this.move = this.move.bind(this);
    this.renderCell = this.renderCell.bind(this);
    this.calculateAdjacent = this.calculateAdjacent.bind(this);
    this.adjacentKey = this.adjacentKey.bind(this);
    this.isAdjacent = this.isAdjacent.bind(this);
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

  renderCell(x, y, adjacent) {
    const options = maze[x][y];
    const onClick = () => {
      switch (options.move) {
      case 'up':
        this.move(x - 1, y); break;
      case 'down':
        this.move(x + 1, y); break;
      case 'left':
        this.move(x, y - 1); break;
      case 'right':
        this.move(x, y + 1); break;
      }
    };
    return (
      <Cell {...options}>
        { options.move && adjacent && <Arrow move={options.move} onClick={onClick} /> }
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

    const [currentX, currentY] = position;
    const anchorX = Math.floor(currentX / 3) * 3;
    const anchorY = Math.floor(currentY / 3) * 3;
    const adjacentCells = this.calculateAdjacent(anchorX, anchorY);

    return (
      <Container>
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
      </Container>
    );
  }
}

export default Puzzle6;
