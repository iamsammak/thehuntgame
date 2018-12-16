import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { faLock, faUnlock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const tableSize = 200;
const lockSize = 20;

const Table = styled.div`
  position: relative;
  width: ${tableSize}px;
  height: ${tableSize}px;
`;

const Lock = styled(FontAwesomeIcon).attrs({
  icon: props => (props.open ? faUnlock : faLock),
})`
  width: ${lockSize}px;
  height: ${lockSize}px;
  transform: rotate(${props => -props.rotation}deg);
  color: ${props => props.open ? 'green' : 'red'};
`;

const LockContainer = styled.div`
  position: absolute;
  width: 100%;
  top: ${tableSize / 2};
  left: 0;
  text-align: right;
  transform: rotate(${props => props.rotation}deg);
`;

const Content = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;

const Line = styled.div`
  border: 1px solid ${props => props.open ? 'green' : 'red'};
  width: ${(tableSize / 2) - lockSize};
`;

export default class Main extends React.Component {
  render() {
    const items = [
      { to: "/puzzle1", key: 1, open: false },
      { to: "/puzzle2", key: 2, open: false },
      { to: "/puzzle3", key: 3, open: true },
      { to: "/puzzle4", key: 4, open: false },
      { to: "/puzzle5", key: 5, open: false },
      { to: "/puzzle6", key: 6, open: false },
      { to: "/puzzle7", key: 7, open: true },
      { to: "/puzzle8", key: 8, open: false },
      { to: "/puzzle9", key: 9, open: false },
      { to: "/puzzle10", key: 10, open: false },
    ];

    return (
      <Table>
        {
          items.map((item, index) => {
            const rotation = index * (360 / items.length);
            return (
              <LockContainer key={item.key} rotation={rotation}>
                <Content>
                  <Line open={item.open} />
                  <Link to={item.to}>
                    <Lock open={item.open} rotation={rotation} />
                  </Link>
                </Content>
              </LockContainer>
            );
          })
        }
      </Table>
    );
  }
}
