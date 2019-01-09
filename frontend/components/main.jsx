import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { faLock, faUnlock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { green, red, xsSpacing } from '../constants';
import WelcomeHeader from './welcomeHeader';

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
  color: ${props => (props.open ? green : red)};
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
  pointer-events: ${props => (props.allOpened ? 'auto' : 'none')};
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
  border: 1px solid ${props => (props.open ? green : red)};
  width: ${(tableSize / 2) - lockSize - (xsSpacing * 2) - (middleLockSize / 2) - (xsSpacing * 2)}px;
  pointer-events: none;
`;

export default class Main extends React.Component {
  render() {
    const { gameState } = this.props;

    const items = [
      { to: "/puzzle1", key: 1, open: gameState[1] && gameState[1].solved },
      { to: "/puzzle2", key: 2, open: gameState[2] && gameState[2].solved },
      { to: "/puzzle3", key: 3, open: gameState[3] && gameState[3].solved },
      { to: "/puzzle4", key: 4, open: gameState[4] && gameState[4].solved },
      { to: "/puzzle5", key: 5, open: gameState[5] && gameState[5].solved },
      { to: "/puzzle6", key: 6, open: gameState[6] && gameState[6].solved },
      { to: "/puzzle7", key: 7, open: gameState[7] && gameState[7].solved },
      { to: "/puzzle8", key: 8, open: gameState[8] && gameState[8].solved },
      { to: "/puzzle9", key: 9, open: gameState[9] && gameState[9].solved },
      { to: "/puzzle10", key: 10, open: gameState[10] && gameState[10].solved },
    ];

    const allOpened = items.every(i => i.open);

    return (
      <div>
        <WelcomeHeader />
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
      </div>
    );
  }
}
