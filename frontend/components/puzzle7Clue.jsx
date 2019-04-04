import React from 'react';
import styled from 'styled-components';

import { PEOPLE } from '../helpers';
import { Narration } from '../wrappers';

const List = styled.ol`
  text-align: left;
`;

class Puzzle7Clue extends React.Component {
  render() {
    const { personId } = this.props;
    const { displayName, gender } = PEOPLE[personId];

    let clue = '';
    switch (personId) {
    case 'matt':
      clue = (
        <List>
          <li>The switch whose number is in the wedding hashtag should be turned off.</li>
          <li>Switch 1 should be on.</li>
        </List>
      );
      break;
    case 'tim':
      clue = (
        <List>
          <li>The sum of all the &apos;on&apos; switch numbers is less than 30. </li>
          <li>Switch 4 should be on.</li>
        </List>
      );
      break;
    case 'jay':
      clue = (
        <List>
          <li>Erica&apos;s first clue should read &apos;left&apos; instead of &apos;right&apos;.</li>
          <li>The sum of the lowest &apos;on&apos; switch number and the highest &apos;on&apos; switch number is less than 12.</li>
        </List>
      );
      break;
    case 'ryan':
      clue = (
        <List>
          <li>If today&apos;s date is an even number, then switch 7 should be on.</li>
          <li>Mary Ann&apos;s second clue should read &apos;on&apos; instead of &apos;off&apos;.</li>
        </List>
      );
      break;
    case 'kristi':
      clue = (
        <List>
          <li>Matt&apos;s second clue is incorrect.</li>
          <li>There are more odd numbered switches turned on than even numbered switches turned on.</li>
        </List>
      );
      break;
    case 'erica':
      clue = (
        <List>
          <li>The right column has an odd number of switches turned on.</li>
          <li>If today&apos;s date is an odd number, then switch 6 should be off.</li>
        </List>
      );
      break;
    case 'maryann':
      clue = (
        <List>
          <li>Tim&apos;s second clue should read &apos;off&apos; instead of &apos;on&apos;.</li>
          <li>The switch whose number equals the number of bridesmaids and groomsmen should be turned off. </li>
        </List>
      );
      break;
    case 'helena':
      clue = (
        <List>
          <li>Erica&apos;s second clue should read &apos;switch 7&apos; instead of &apos;switch 6&apos;.</li>
          <li>The sum of all the &apos;on&apos; switch numbers is more than 20.</li>
        </List>
      );
      break;
    }

    return (
      <div>
        <Narration>{displayName} recalls the instructions given to {gender === 'male' ? 'him' : 'her'}.</Narration>
        {clue}
      </div>
    );
  }
}

export default Puzzle7Clue;
