import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { xsSpacing } from '../constants';
import WelcomeHeader from './welcomeHeader';

const tableSize = 300;
const lockSize = 40;
const middleLockSize = 60;

const Table = styled.div`
  position: relative;
  width: ${tableSize}px;
  height: ${tableSize}px;
  margin: auto;
`;

const PersonContainer = styled.div`
  padding: ${xsSpacing}px;
`;

const Person = styled.img.attrs(props => ({
  src: props.src,
}))`
  height: ${lockSize}px;
  width: ${lockSize}px;
  border-radius: ${lockSize / 2}px;
  transform: rotate(${props => (props.rotate ? -props.rotate : 0)}deg);
`;

const MiddlePerson = styled(Person)`
  height: ${middleLockSize}px;
  width: ${middleLockSize}px;
  border-radius: ${middleLockSize / 2}px;
`;

const MiddleLink = styled(Link)`
  position: absolute;
  top: ${(tableSize / 2) - (middleLockSize / 2) - (xsSpacing / 2)}px;
  left: ${(tableSize / 2) - (middleLockSize / 2) - (xsSpacing / 2)}px;
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
  border: 1px solid black;
  width: ${(tableSize / 2) - lockSize - (xsSpacing * 2) - (middleLockSize / 2) - (xsSpacing * 2)}px;
  pointer-events: none;
`;

export default class Main extends React.Component {
  render() {
    const items = [
      { to: "/tim", key: 1, src: 'images/placeholder.jpg' },
      { to: "/jay", key: 2, src: 'images/placeholder.jpg' },
      { to: "/ryan", key: 3, src: 'images/placeholder.jpg' },
      { to: "/kristi", key: 4, src: 'images/placeholder.jpg' },
      { to: "/erica", key: 5, src: 'images/placeholder.jpg' },
      { to: "/mary ann", key: 6, src: 'images/placeholder.jpg' },
      { to: "/helena", key: 7, src: 'images/placeholder.jpg' },
    ];
    const middlePerson = <MiddlePerson src='images/placeholder.jpg' />;

    return (
      <div>
        <WelcomeHeader {...this.props} />
        <Table>
          {
            items.map((item, index) => {
              const rotation = index * (360 / items.length);
              return (
                <Container key={item.key} rotation={rotation}>
                  <Content>
                    <Line />
                    <Link to={item.to}>
                      <PersonContainer>
                        <Person src={item.src} rotate={rotation} />
                      </PersonContainer>
                    </Link>
                  </Content>
                </Container>
              );
            })
          }
          <MiddleLink to={"/matt"}>
            <PersonContainer>
              {middlePerson}
            </PersonContainer>
          </MiddleLink>
        </Table>
      </div>
    );
  }
}
