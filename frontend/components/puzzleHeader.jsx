import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { black } from '../constants';

const Header = styled.div`
  margin-top: 4em;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

const BackIconContainer = styled.div`
  display: flex;
  align-items: center;
`;

const BackIcon = styled(FontAwesomeIcon).attrs({
  icon: 'arrow-left',
})`
  flex: 1;
  font-size: 1.25em;
  color: ${black};
`;

class PuzzleHeader extends React.Component {
  render() {
    const { title } = this.props;

    return (
      <Header>
        <TitleContainer>
          <BackIconContainer>
            <Link to='/main'>
              <BackIcon />
            </Link>
          </BackIconContainer>
          <h1>{title}</h1>
          <div />
        </TitleContainer>
        <hr />
      </Header>
    );
  }
}

export default PuzzleHeader;
