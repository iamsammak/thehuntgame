import React from 'react';
import styled from 'styled-components';

import { PEOPLE } from '../helpers';

const EmptyContainer = styled.div`
  margin-top: 1em;
`;

class EmptyBody extends React.Component {
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
          Tim is pacing back and forth in the foyer.
          <br />
          <br />
          "Hmm, where could it be?"
        </div>
      );
      break;
    case "Jay":
      base = (
        <div>
          You can't seem to find Jay...until you exit the country club and see him outside.
          <br />
          <br />
          "Did I drop it somewhere here? I can't see anything without light..."
        </div>
      );
      break;
    case "Ryan":
      base = "Ryan is wandering from table to table.";
      break;
    case "Kristi":
      base = "Kristi is at the welcome table to make sure no one steals the wedding gifts.";
      break;
    case "Erica":
      base = (
        <div>
          Erica seems concerned around the tea favor table.
          <br />
          <br />
          "Let me think...I was setting up these bowls and then filling them with tea. What did I do next? All I can remember is what Chris kept saying about his tea favor idea..."
        </div>
      );
      break;
    case "MaryAnn":
      base = "You find MaryAnn around the cornhole games.";
      break;
    case "Helena":
      base = "Helena is looking through some boxes on the side of the room.";
      break;
    }

    return (
      <EmptyContainer>
        {base}
      </EmptyContainer>
    );
  }
}

export default EmptyBody;
