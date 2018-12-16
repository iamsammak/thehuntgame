import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { faLock, faUnlock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { green, red, xsSpacing } from '../constants';

const tableSize = 200;
const lockSize = 20;
const middleLockSize = 30;

const Table = styled.div`
  position: relative;
  width: ${tableSize}px;
  height: ${tableSize}px;
`;

const LockContainer = styled.div`
  padding: ${xsSpacing}px;
`;

const Lock = styled(FontAwesomeIcon).attrs(props => ({
  icon: props.open ? faUnlock : faLock,
}))`
  font-size: ${lockSize}px;
  transform: rotate(${props => -props.rotate}deg);
  color: ${props => props.open ? green : red};
`;

const MiddleLock = styled(FontAwesomeIcon).attrs(props => ({
  icon: props.open ? faUnlock : faLock,
}))`
  font-size: ${middleLockSize}px;
  color: ${red};
`;

const MiddleLink = styled(Link)`
  position: absolute;
  top: ${(tableSize / 2) - (middleLockSize / 2) - (xsSpacing / 2)}px;
  left: ${(tableSize / 2) - (middleLockSize / 2) - (xsSpacing / 2)}px;
  pointer-events: ${props => props.allOpened ? 'auto' : 'none'};
`;

const Container = styled.div`
  position: absolute;
  width: 50%;
  top: ${(tableSize / 2) - (lockSize / 2)}px;
  right: 0;
  text-align: right;
  transform: rotate(${props => props.rotation}deg);
  transform-origin: left;
`;

const Content = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;

const Line = styled.div`
  border: 1px solid ${props => props.open ? green : red};
  width: ${(tableSize / 2) - lockSize - (xsSpacing * 2) - (middleLockSize / 2) - (xsSpacing * 2)}px;
  pointer-events: none;
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

    const allOpened = items.every(i => i.open);
    return (
      <Table>
        {
          items.map((item, index) => {
            const rotation = index * (360 / items.length);
            return (
              <Container key={item.key} rotation={rotation}>
                <Content>
                  <Line open={item.open} />
                  <Link to={item.to}>
                    <LockContainer>
                      <Lock open={item.open} rotate={rotation} />
                    </LockContainer>
                  </Link>
                </Content>
              </Container>
            );
          })
        }
        <MiddleLink to={"/main"} allOpened={allOpened}>
          <LockContainer>
            <MiddleLock />
          </LockContainer>
        </MiddleLink>
      </Table>
    );
  }
}
