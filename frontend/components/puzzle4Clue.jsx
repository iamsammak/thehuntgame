import React from 'react';
import styled from 'styled-components';

import { Narration } from '../wrappers';
import SpeechBubble from './speechBubble';

const Chinese = styled.div`
  font-size: 2em;
`;

class Puzzle4Clue extends React.Component {
  render() {
    const { personId } = this.props;

    return (
      <div>
        <Narration>You ask Tim about the safe.</Narration>
        <SpeechBubble personId={personId}>
          Oh, that thing? Chris has a weird way of thinking. It&apos;s almost as weird as his Chinese. All I know is that the code has something to do with Matt&apos;s Chinese name.
        </SpeechBubble>
        <Chinese>蔡述聰</Chinese>
      </div>
    );
  }
}

export default Puzzle4Clue;
