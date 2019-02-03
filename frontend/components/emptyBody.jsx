import React from 'react';
import styled from 'styled-components';

import { PEOPLE } from '../helpers';

const EmptyContainer = styled.div`
  margin-top: 1em;
`;

class EmptyBody extends React.Component {
  render() {
    const { name } = this.props;
    const { gender } = PEOPLE[name];

    return (
      <EmptyContainer>
        {
          gender === 'male' ?
            'He looks busy right now, best not to bother him...' :
            'She looks busy right now, best not to bother her...'
        }
      </EmptyContainer>
    );
  }
}

export default EmptyBody;
