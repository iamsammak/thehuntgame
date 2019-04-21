import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Narration } from '../wrappers';

import { PEOPLE, hintAvailable } from '../helpers';
import { gray, tamarind, whiteLilac } from '../constants';
import WelcomeHeader from './welcomeHeader';
import { HintIcon } from './hint';

const Table = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  padding: 5px 0;
  margin: auto;
`;

const Name = styled.div`
  color: ${tamarind};
  font-size: 20px;
  margin-left: 20px;
`;

const StyleLink = styled(Link)`
  text-decoration: none;
  width: 80%;
`;

const Person = styled.img.attrs(props => ({
  src: props.src,
}))`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  margin: 0 15px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  height: 80px;
  background-color: ${whiteLilac};
  border-radius: 5px;
  margin: 5px;
  border-left: 10px solid ${whiteLilac};
`;

const HintContainer = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: 0.5em;
  right: 0.5em;
`;

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.renderPerson = this.renderPerson.bind(this);
  }

  renderPerson(item) {
    const { gameState } = this.props;
    const isHintAvailable = hintAvailable(gameState);

    return (
      <StyleLink to={item.to} key={item.key}>
        <Container>
          <Person src={item.src} />
          <Name>{item.name}</Name>
          {
            item.hint && isHintAvailable && (
              <HintContainer>
                <HintIcon color={gray} />
              </HintContainer>
            )
          }
        </Container>
      </StyleLink>
    );
  }

  render() {
    const everyone = [
      { name: PEOPLE['matt'].displayName, to: PEOPLE['matt'].path, key: 4, src: PEOPLE['matt'].src, hint: true },
      { name: PEOPLE['kristi'].displayName, to: PEOPLE['kristi'].path, key: 5, src: PEOPLE['kristi'].src },
      { name: PEOPLE['tim'].displayName, to: PEOPLE['tim'].path, key: 1, src: PEOPLE['tim'].src },
      { name: PEOPLE['erica'].displayName, to: PEOPLE['erica'].path, key: 6, src: PEOPLE['erica'].src },
      { name: PEOPLE['jay'].displayName, to: PEOPLE['jay'].path, key: 2, src: PEOPLE['jay'].src },
      { name: PEOPLE['maryann'].displayName, to: PEOPLE['maryann'].path, key: 7, src: PEOPLE['maryann'].src },
      { name: PEOPLE['ryan'].displayName, to: PEOPLE['ryan'].path, key: 3, src: PEOPLE['ryan'].src },
      { name: PEOPLE['helena'].displayName, to: PEOPLE['helena'].path, key: 8, src: PEOPLE['helena'].src },
    ];

    return (
      <div>
        <WelcomeHeader {...this.props} />
        <Narration>Who do you want to talk to?</Narration>
        <Table>
          {everyone.map(this.renderPerson)}
        </Table>
      </div>
    );
  }
}
