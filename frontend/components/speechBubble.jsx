import React from 'react';
import styled from 'styled-components';

import { white } from '../constants';
import { PEOPLE } from '../helpers';

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 4px 0px;
`;

const Profile = styled.img`
  width: 2em;
  height: 2em;
  border-radius: 50%;
  padding: 0px 8px;
`;

const SpeechContainer = styled.div`
  background-color: ${white};
  position: relative;
  border-radius: 5px;
  border-top-left-radius: 0px;
  text-align: left;
  padding: 10px;
`;

const SpeechArrowContainer = styled.div`
  overflow: hidden;
  height: 10px;
  width: 11px;
  position: absolute;
  top: 0px;
  left: -11px;
  bottom: auto;
`;

const SpeechArrow = styled.div`
  border-radius: 50%;
  border: 8px solid ${white};
  width: 2em;
  height: 2em;
  position: absolute;
  top: -9px;
  right: -9px;
`;

class SpeechBubble extends React.Component {
  render() {
    const { children, personId } = this.props;

    return (
      <Container>
        {PEOPLE[personId] && <Profile src={PEOPLE[personId].src} />}
        <SpeechContainer>
          <SpeechArrowContainer>
            <SpeechArrow />
          </SpeechArrowContainer>
          {children}
        </SpeechContainer>
      </Container>
    );
  }
}

export default SpeechBubble;
