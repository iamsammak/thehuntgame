import React from 'react';
import styled from 'styled-components';

import { isSolved } from '../helpers';
import { SpeechBubbleSpacing } from '../wrappers';
import SpeechBubble from './speechBubble';
import Submit from './submit';

const CipherContainer = styled.p`
  font-family: monospace;
  font-size: 2em;
  letter-spacing: 5px;
`;

class Puzzle1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cipher: "",
    };

    const { socket } = props;
    socket.on('cipher_return', (data) => {
      this.setState({ cipher: data });
    });
    this.cipherPing();
  }

  cipherPing() {
    const { send } = this.props;

    send('cipher_ping', {});
  }

  render() {
    const { cipher } = this.state;
    const { gameState, personId } = this.props;
    const solved = isSolved(gameState, '1');

    return (
      <div>
        <SpeechBubble personId={personId}>
          Thanks so much for helping us find the key! I had it with me when I was setting up these guest tables, but I must have misplaced it when I was grabbing all these letters. It was hard to keep track of everything when I was numbering each guest table. If I could only remember what these letters meant, then maybe I could remember where I placed the keys. Do you know what these letters mean?
        </SpeechBubble>
        <CipherContainer>
          {cipher}
        </CipherContainer>
        <p>
          <Submit {...this.props} puzzleNumber="1" disabled={solved} />
        </p>
        {
          solved ? (
            <SpeechBubble personId={personId}>
              Ah, that&apos;s right! That&apos;s why we had these letters. I remember that I finished setting up all the tables and then gave the key to Matt. He has a personal safe that Chris gave him, so it might be in there.
            </SpeechBubble>
          ) : (
            <SpeechBubbleSpacing lines={5} />
          )
        }
      </div>
    );
  }
}

export default Puzzle1;
