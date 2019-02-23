import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { PEOPLE } from '../helpers';
import { xsSpacing } from '../constants';
import WelcomeHeader from './welcomeHeader';

const tableSize = 350;
const lockSize = 60;
const middleLockSize = 80;

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
      { to: PEOPLE['Tim'].path, key: 1, src: PEOPLE['Tim'].src },
      { to: PEOPLE['Jay'].path, key: 2, src: PEOPLE['Jay'].src },
      { to: PEOPLE['Ryan'].path, key: 3, src: PEOPLE['Ryan'].src },
      { to: PEOPLE['Kristi'].path, key: 4, src: PEOPLE['Kristi'].src },
      { to: PEOPLE['Erica'].path, key: 5, src: PEOPLE['Erica'].src },
      { to: PEOPLE['MaryAnn'].path, key: 6, src: PEOPLE['MaryAnn'].src },
      { to: PEOPLE['Helena'].path, key: 7, src: PEOPLE['Helena'].src },
    ];

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
          <MiddleLink to={PEOPLE['Matt'].path}>
            <PersonContainer>
              <MiddlePerson src={PEOPLE['Matt'].src} />
            </PersonContainer>
          </MiddleLink>
        </Table>
      </div>
    );
  }
}
