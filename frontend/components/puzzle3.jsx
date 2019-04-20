import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { white } from '../constants';
import { isSolved } from '../helpers';
import { SpeechBubbleSpacing } from '../wrappers';
import SpeechBubble from './speechBubble';
import Submit from './submit';

const PuzzleContainer = styled.div`
  background-color: ${white};
  padding: 1em;
  border-radius: 4px;
  margin: 1em;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const Puzzle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  font-family: monospace;
  font-size: 2em;
`;

const PuzzleIcon = styled(FontAwesomeIcon)`
  font-size: 0.75em;
`;

class Puzzle3 extends React.Component {
  render() {
    const { gameState, personId } = this.props;
    const solved = isSolved(gameState, '3');

    return (
      <div>
        <SpeechBubble personId={personId}>
          I found this paper with these numbers on it when I was unpacking the tea. Maybe if I can make sense of these numbers, I can remember what I did next. I might have misplaced the key somewhere here.
        </SpeechBubble>
        <PuzzleContainer>
          <Puzzle>
            <PuzzleIcon icon="star" />
            5
          </Puzzle>
          <Puzzle>
            <PuzzleIcon icon="star" />
            8
          </Puzzle>
          <Puzzle>
            <PuzzleIcon icon="star" />
            3
          </Puzzle>
          <Puzzle>
            <PuzzleIcon icon="star" />
            5
          </Puzzle>
          <Puzzle>
            <PuzzleIcon icon="star" />
            7
          </Puzzle>
          <Puzzle>
            <PuzzleIcon icon="star" />
            5
          </Puzzle>
          <Puzzle>
            <PuzzleIcon icon="star" />
            6
          </Puzzle>
          <Puzzle>
            <PuzzleIcon icon="star" />
            1
          </Puzzle>
          <Puzzle>
            <PuzzleIcon icon="star" />
            2
          </Puzzle>
        </PuzzleContainer>
        <Submit {...this.props} puzzleNumber="3" disabled={solved} />
        {
          solved ? (
            <SpeechBubble personId={personId}>
              I guess they&apos;re looking forward to their honeymoon as much as they&apos;re looking forward to starting a tea favor business! Everything&apos;s in order here now, but it doesn&apos;t look like the key is here.
            </SpeechBubble>
          ) : (
            <SpeechBubbleSpacing lines={2} />
          )
        }
      </div>
    );
  }
}

export default Puzzle3;
