import React from 'react';
import styled from 'styled-components';

import SpeechBubble from './speechBubble';
import { Narration } from '../wrappers';

const Container = styled.div`
  margin-top: 1em;
`;

class Base extends React.Component {
  render() {
    const { personId } = this.props;

    let base;
    switch (personId) {
    case "matt":
      base = (
        <div>
          <Narration>You find Matt with the groom&apos;s family, talking about the lost key.</Narration>
        </div>
      );
      break;
    case "tim":
      base = (
        <div>
          <Narration>Tim is pacing back and forth in the foyer.</Narration>
          <SpeechBubble personId={personId}>
            Hmm, where could it be?
          </SpeechBubble>
        </div>
      );
      break;
    case "jay":
      base = (
        <div>
          <Narration>You can&apos;t seem to find Jay...until you exit the country club and see him outside.</Narration>
          <SpeechBubble personId={personId}>
            Did I drop it somewhere here? I can&apos;t see anything without light...
          </SpeechBubble>
        </div>
      );
      break;
    case "ryan":
      base = (
        <div>
          <Narration>Ryan is looking from one table to the next.</Narration>
        </div>
      );
      break;
    case "kristi":
      base = (
        <div>
          <Narration>Kristi is at the welcome table to make sure no one steals the wedding gifts.</Narration>
        </div>
      );
      break;
    case "erica":
      base = (
        <div>
          <Narration>Erica seems concerned around the tea favor table.</Narration>
          <SpeechBubble personId={personId}>
            Let me think...I was setting up these bowls and then filling them with tea. What did I do next?
          </SpeechBubble>
        </div>
      );
      break;
    case "maryann":
      base = (
        <Narration>You find Mary Ann around the cornhole games.</Narration>
      );
      break;
    case "helena":
      base = (
        <Narration>Helena is looking through some boxes on the side of the room.</Narration>
      );
      break;
    }

    return (
      <Container>
        {base}
      </Container>
    );
  }
}

export default Base;
