import React from 'react';
import styled from 'styled-components';

import { Narration } from '../wrappers';

const Container = styled.div`
  margin-top: 1em;
`;

class Base extends React.Component {
  render() {
    const { name } = this.props;

    let base;
    switch (name) {
    case "Matt":
      base = "";
      break;
    case "Tim":
      base = (
        <div>
          <Narration>Tim is pacing back and forth in the foyer.</Narration>
          <br />
          Hmm, where could it be?
        </div>
      );
      break;
    case "Jay":
      base = (
        <div>
          <Narration>You can&apos;t seem to find Jay...until you exit the country club and see him outside.</Narration>
          <p>
            Did I drop it somewhere here? I can&apos;t see anything without light...
          </p>
        </div>
      );
      break;
    case "Ryan":
      base = (
        <div>
          <Narration>Ryan is wandering from table to table.</Narration>
        </div>
      );
      break;
    case "Kristi":
      base = (
        <div>
          <Narration>Kristi is at the welcome table to make sure no one steals the wedding gifts.</Narration>
        </div>
      );
      break;
    case "Erica":
      base = (
        <div>
          <Narration>Erica seems concerned around the tea favor table.</Narration>
          <br />
          Let me think...I was setting up these bowls and then filling them with tea. What did I do next? All I can remember is what Chris kept saying about his tea favor idea...
        </div>
      );
      break;
    case "Mary Ann":
      base = (
        <Narration>You find MaryAnn around the cornhole games.</Narration>
      );
      break;
    case "Helena":
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
