import React from 'react';
import styled from 'styled-components';

const Header = styled.div`
  margin-top: 1em;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

class WelcomeHeader extends React.Component {
  render() {
    return (
      <Header>
        <TitleContainer>
          <h1>Welcome to The Hunt v2</h1>
        </TitleContainer>
        <hr />
      </Header>
    );
  }
}

export default WelcomeHeader;
