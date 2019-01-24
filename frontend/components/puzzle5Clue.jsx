import React from 'react';
import styled from 'styled-components';
import { Text } from '../wrappers';

const Clue = styled.img.attrs(props => ({
  src: props.src,
}))`
  width: 100%;
`;

class Puzzle5Clue extends React.Component {
  render() {
    const { src } = this.props;
    return (
      <div>
        <Text>I found this piece of paper earlier. It looks like there are other parts to it. Do you know what it means?</Text>
        <Clue src={src} />
      </div>
    );
  }
}

export default Puzzle5Clue;
