import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { black, smSpacing } from '../constants';
import { PEOPLE } from '../helpers';

const Header = styled.div`
  margin-top: 4em;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const BackIconLink = styled(Link)`
  display: flex;
  align-items: center;
  padding: ${smSpacing};
`;

const BackIcon = styled(FontAwesomeIcon).attrs({
  icon: 'arrow-left',
})`
  flex: 1;
  font-size: 1.25em;
  color: ${black};
`;

const NameContainer = styled.div`
  font-size: 1.5em;
`;

const Profile = styled.img.attrs(props => ({
  src: props.src,
}))`
  width: 2em;
  height: 2em;
  border-radius: 1em;
`;

class PersonHeader extends React.Component {
  render() {
    const { personId } = this.props;
    const { displayName, src } = PEOPLE[personId];

    return (
      <Header>
        <TitleContainer>
          <BackIconLink to="/main">
            <BackIcon />
          </BackIconLink>
          <NameContainer>{displayName}</NameContainer>
          <Profile src={src} />
        </TitleContainer>
        <hr />
      </Header>
    );
  }
}

export default PersonHeader;
