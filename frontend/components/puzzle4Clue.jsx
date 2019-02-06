import React from 'react';
import styled from 'styled-components';

import { Narration } from '../wrappers';

const Chinese = styled.div`
  font-size: 2em;
`;

class Puzzle4Clue extends React.Component {
  render() {
    return (
      <div>
        <Narration>You ask Tim about the safe.</Narration>
        <p>
          Oh, that thing? Chris has a weird way of thinking. It&apos;s almost as weird as his Cantonese, since he&apos;s always pronouncing things incorrectly. All I know is that the code has something to do with Matt&apos;s Chinese name.
        </p>
        <Chinese>蔡述聰</Chinese>
      </div>
    );
  }
}

export default Puzzle4Clue;
