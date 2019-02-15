import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { smSpacing, lgSpacing } from '../constants';

const hintContainerWidth = 250;

const HintContainer = styled.div`
  position: absolute;
  top: calc(50% - ${hintContainerWidth / 2}px);
  left: calc(50% - ${hintContainerWidth / 2}px);
  width: ${hintContainerWidth}px;
  border: 1px solid black;
  background-color: white;
  box-shadow: 3px 5px 10px grey;
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
    socket.emit('hint_ping', { 'puzzle' : hint });
  }

  hideHint() {
    this.setState({ show: false });
  }

  render() {
    const { hint } = this.props;
    const { show } = this.state;

    let hintText;
    switch (hint) {
    case 1: hintText = "Each table has a unique set of letters. It seems odd that there isn't a table 26 though."; break;
    case 2: hintText = "If it's not written in ink...then maybe it's white space?"; break;
    case 3: hintText = "Erica's looking for a clue with nine letters? Aren't there nine ingredients, each with their own description?"; break;
    case 4: hintText = "My Chinese name? How in the world does it have anything to do with these icons? Maybe if get the tones all wrong..."; break;
    case 5: hintText = "The paper looks oddly familiar. Did we take a picture with it at the photobooth?"; break;
    case 8: hintText = "Jay probably would've taken the shortest path possible from his car to the sweetheart table."; break;
    }

    return (
      <div ref={this.setRef}>
        <button onClick={this.showHint}>
          Need a hint?
        </button>
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
}

export default Hint;
