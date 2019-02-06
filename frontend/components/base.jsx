import React from 'react';
import styled from 'styled-components';

import { PEOPLE } from '../helpers';

const Container = styled.div`
  margin-top: 1em;
`;

const SmallItalics = styled.div`
  font-style: italic;
  font-size: 0.8em;
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
          <SmallItalics>Tim is pacing back and forth in the foyer.</SmallItalics>
          <br />
          Hmm, where could it be?
        </div>
      );
      break;
    case "Jay":
      base = (
        <div>
          <SmallItalics>You can't seem to find Jay...until you exit the country club and see him outside.</SmallItalics>
          <br />
          Did I drop it somewhere here? I can't see anything without light...
        </div>
      );
      break;
    case "Ryan":
      base = (
        <div>
          <SmallItalics>Ryan is wandering from table to table.</SmallItalics>
        </div>
      );
      break;
    case "Kristi":
      base = (
        <div>
          <SmallItalics>Kristi is at the welcome table to make sure no one steals the wedding gifts.</SmallItalics>
        </div>
      );
      break;
    case "Erica":
      base = (
        <div>
          <SmallItalics>Erica seems concerned around the tea favor table.</SmallItalics>
          <br />
          Let me think...I was setting up these bowls and then filling them with tea. What did I do next? All I can remember is what Chris kept saying about his tea favor idea...
        </div>
      );
      break;
    case "MaryAnn":
      base = (
        <SmallItalics>You find MaryAnn around the cornhole games.</SmallItalics>
      );
      break;
    case "Helena":
      base = (
        <SmallItalics>Helena is looking through some boxes on the side of the room.</SmallItalics>
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
