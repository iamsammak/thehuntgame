import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { mdSpacing } from '../constants';
import { MdSpacing } from '../wrappers';

import PuzzleHeader from './puzzleHeader';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PanelContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const YourSwitchContainer = styled.button`
  padding: ${mdSpacing};
`;

class Puzzle5 extends React.Component {
  constructor(props) {
    super(props);

    const { send, socket } = props;
    socket.on('puzzle5_join_response', (data) => {
      this.setState({ index: data.index });
    });

    this.state = {
      index: null,
    };

    send('puzzle5_join', {});

    this.handleSwitch = this.handleSwitch.bind(this);
  }

  handleSwitch() {
    const { send } = this.props;
    send('puzzle5_toggle', {});
  }

  render() {
    const { gameState } = this.props;
    const { index } = this.state;

    if (gameState[5]) {
      const {
        switches,
      } = gameState[5];

      const panel = switches.map((swtch) => {
        const [icon, color] = swtch;
        return <FontAwesomeIcon key={icon} icon={icon} color={color} size="lg" />;
      });

      let yourSwitch;
      if (index !== null && switches[index]) {
        const [icon, color] = switches[index];
        yourSwitch = (
          <YourSwitchContainer onClick={this.handleSwitch}>
            <FontAwesomeIcon icon={icon} color={color} size="4x" />
          </YourSwitchContainer>
        );
      }

      return (
        <div>
          <PuzzleHeader title="Puzzle Five" />
          <Container>
            <PanelContainer>
              {panel}
            </PanelContainer>
            <MdSpacing />
            {yourSwitch}
          </Container>
        </div>
      );
    }

    return null;
  }
}

export default Puzzle5;
