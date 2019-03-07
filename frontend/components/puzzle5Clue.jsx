import React from 'react';
import styled from 'styled-components';

import { PEOPLE } from '../helpers';
import { Narration } from '../wrappers';

const Clue = styled.img`
  width: 100%;
`;

class Puzzle5Clue extends React.Component {
  render() {
    const { clue, personId } = this.props;
    const { displayName, gender } = PEOPLE[personId];

    let src = "";
    switch (clue) {
    case "clue0":
      src = "images/puzzle5/clue0.png"; break;
    case "clue1":
      src = "images/puzzle5/clue1.png"; break;
    case "clue2":
      src = "images/puzzle5/clue2.png"; break;
    case "clue3":
      src = "images/puzzle5/clue3.png"; break;
    case "clue4":
      src = "images/puzzle5/clue4.png"; break;
    case "clue5":
      src = "images/puzzle5/clue5.png"; break;
    case "clue6":
      src = "images/puzzle5/clue6.png"; break;
    case "clue7":
      src = "images/puzzle5/clue7.png"; break;
    }

    return (
      <div>
        <Narration>{displayName} shows you {gender === 'male' ? 'his' : 'her'} piece of paper.</Narration>
        <Clue src={src} />
      </div>
    );
  }
}

export default Puzzle5Clue;
