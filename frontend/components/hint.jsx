import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { smSpacing, lgSpacing, whiteLilac } from '../constants';
import { CenteredRow, XsSpacing } from '../wrappers';
import { Button } from './buttons';

const hintContainerWidth = 250;

export const HintIcon = props => <FontAwesomeIcon icon="question-circle" {...props} />;

const HintContainer = styled.div`
  position: absolute;
  top: calc(50% - ${hintContainerWidth / 2}px);
  left: calc(50% - ${hintContainerWidth / 2}px);
  width: ${hintContainerWidth}px;
  border: 1px solid black;
  background-color: white;
  box-shadow: 3px 5px 10px grey;
  z-index: 999;
`;

const Close = styled(FontAwesomeIcon).attrs({
  icon: 'times',
})`
  position: absolute;
  top: 0;
  right: 0;
  padding: ${smSpacing}px;
`;

const TextContainer = styled.div`
  padding: ${lgSpacing}px;
`;

class Hint extends React.Component {
  constructor(props) {
    super(props);
    this.showHint = this.showHint.bind(this);
    this.hideHint = this.hideHint.bind(this);
    this.setRef = this.setRef.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
    this.state = {
      show: false,
    };
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleOutsideClick);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleOutsideClick);
  }

  handleOutsideClick(event) {
    event.stopPropagation();
    if (this.node && !this.node.contains(event.target)) {
      this.hideHint();
    }
  }

  setRef(node) {
    this.node = node;
  }

  showHint() {
    const { socket, hint } = this.props;
    this.setState({ show: true });
    socket.emit('hint_shown', { 'puzzle' : hint });
  }

  hideHint() {
    this.setState({ show: false });
  }

  render() {
    const { hint } = this.props;
    const { show } = this.state;

    let hintText;
    switch (hint) {
    case '1': hintText = "These letters don't make any sense like this. What if we move the letters along the alphabet like Ryan had moved?"; break;
    case '2': hintText = "You found a riddle after visiting Kristi? Hmm...if it's not written in ink, then maybe it's white space?"; break;
    case '3': hintText = "Erica's clue has nine numbers. Aren't there nine ingredients at the tea table? What if you take a letter from each ingredient?"; break;
    case '4': hintText = (
      <div>
        My Chinese name? Chris mispronounces it all the time! He should use an online dictionary like <a href="https://www.cantoneseclass101.com/cantonese-dictionary/">this one</a> to figure out how to pronounce words.

      </div>
    ); break;
    case '5': hintText = "The paper looks oddly familiar. Did we take a picture with it at the photobooth?"; break;
    case '8': hintText = "Jay would've taken the shortest path possible from his car to the sweetheart table. Retrace only his steps and nothing more, otherwise he'll restart from the beginning."; break;
    }
    if (hintText) {
      return (
        <div ref={this.setRef}>
          <CenteredRow>
            <Button onClick={this.showHint}>
              <CenteredRow>
                <HintIcon color={whiteLilac} />
                <XsSpacing />
                Need a hint?
              </CenteredRow>
            </Button>
          </CenteredRow>
          {
            show && (
              <HintContainer>
                <Close onClick={this.hideHint} />
                <TextContainer>
                  {hintText}
                </TextContainer>
              </HintContainer>
            )
          }
        </div>
      );
    }
    return null;
  }
}

export default Hint;
