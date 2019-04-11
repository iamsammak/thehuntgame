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
      src = "images/puzzle5/clue0.jpeg"; break;
    case "clue1":
      src = "images/puzzle5/clue1.jpeg"; break;
    case "clue2":
      src = "images/puzzle5/clue2.jpeg"; break;
    case "clue3":
      src = "images/puzzle5/clue3.jpeg"; break;
    case "clue4":
      src = "images/puzzle5/clue4.jpeg"; break;
    case "clue5":
      src = "images/puzzle5/clue5.jpeg"; break;
    case "clue6":
      src = "images/puzzle5/clue6.jpeg"; break;
    case "clue7":
      src = "images/puzzle5/clue7.jpeg"; break;
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
