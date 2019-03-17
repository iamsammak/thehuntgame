import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { PEOPLE } from '../helpers';
import { tamarind, whiteLilac } from '../constants';
import WelcomeHeader from './welcomeHeader';

const Table = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  width: 350px;
  padding: 5px 0;
  margin: auto;
`;

const Name = styled.div`
  color: ${tamarind};
  font-size: 16px;
`;

const StyleLink = styled(Link)`
  text-decoration: none;
`;

const Person = styled.img.attrs(props => ({
  src: props.src,
}))`
  width: 70px;
  height: 70px;
  border-radius: 50%;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  height: 130px;
  width: 100px;
  background-color: ${whiteLilac}
  border-radius: 5px;
  margin: 5px;
`;

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.renderPerson = this.renderPerson.bind(this);
  }

  renderPerson(item) {
    return (
      <StyleLink to={item.to} key={item.key}>
        <Container>
          <Person src={item.src} />
          <Name>{item.name}</Name>
        </Container>
      </StyleLink>
    );
  }

  render() {
    const firstRow = [
      { name: PEOPLE['tim'].displayName, to: PEOPLE['tim'].path, key: 1, src: PEOPLE['tim'].src },
      { name: PEOPLE['jay'].displayName, to: PEOPLE['jay'].path, key: 2, src: PEOPLE['jay'].src },
      { name: PEOPLE['ryan'].displayName, to: PEOPLE['ryan'].path, key: 3, src: PEOPLE['ryan'].src },
    ];

    const secondRow = [
      { name: PEOPLE['matt'].displayName, to: PEOPLE['matt'].path, key: 4, src: PEOPLE['matt'].src },
      { name: PEOPLE['kristi'].displayName, to: PEOPLE['kristi'].path, key: 5, src: PEOPLE['kristi'].src },
    ];

    const thirdRow = [
      { name: PEOPLE['erica'].displayName, to: PEOPLE['erica'].path, key: 6, src: PEOPLE['erica'].src },
      { name: PEOPLE['maryann'].displayName, to: PEOPLE['maryann'].path, key: 7, src: PEOPLE['maryann'].src },
      { name: PEOPLE['helena'].displayName, to: PEOPLE['helena'].path, key: 8, src: PEOPLE['helena'].src },
    ];

    return (
      <div>
        <WelcomeHeader {...this.props} />
        <Table>
          {firstRow.map(this.renderPerson)}
        </Table>
        <Table>
          {secondRow.map(this.renderPerson)}
        </Table>
        <Table>
          {thirdRow.map(this.renderPerson)}
        </Table>
      </div>
    );
  }
}
