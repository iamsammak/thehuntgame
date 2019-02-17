import React from 'react';
import styled from 'styled-components';

import { Narration } from '../wrappers';

const Clue = styled.img`
  width: 100%;
`;

class Puzzle5Clue extends React.Component {
  render() {
    const { clue, name } = this.props;

    let src = "";
    switch (clue) {
    case "clue0":
      src = "images/puzzle5_clue1.jpg"; break;
    case "clue1":
      src = "images/puzzle5_clue2.jpg"; break;
    case "clue2":
      src = "images/puzzle5_clue3.jpg"; break;
    case "clue3":
      src = "images/puzzle5_clue4.jpg"; break;
    case "clue4":
      src = "images/puzzle5_clue5.jpg"; break;
    }

    return (
      <div>
        <Narration>{name} shows you her piece of paper.</Narration>
        <Clue src={src} />
      </div>
    );
  }
}

export default Puzzle5Clue;
