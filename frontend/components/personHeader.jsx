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
  align-items: center;
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

const NameContainer = styled.div`
  font-size: 1em;
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
    const { name, src } = this.props;
    return (
      <Header>
        <TitleContainer>
          <BackIconContainer>
            <Link to="/main">
              <BackIcon />
            </Link>
          </BackIconContainer>
          <NameContainer>{name}</NameContainer>
          <Profile src={src} />
        </TitleContainer>
        <hr />
      </Header>
    );
  }
}

export default PersonHeader;
