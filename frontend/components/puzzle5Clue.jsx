import React from 'react';
import styled from 'styled-components';

const Clue = styled.img.attrs(props => ({
  src: props.src,
}))`
  width: 100%;
`;

class Puzzle5Clue extends React.Component {
  render() {
    const { clue } = this.props;

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
        I found this piece of paper earlier. It looks like there are other parts to it. Do you know what it means?
        <Clue src={src} />
      </div>
    );
  }
}

export default Puzzle5Clue;
