import styled from 'styled-components';

import { gray, whiteLilac, juniper } from '../constants';

export const Button = styled.button`
  padding: 5px;
  margin: 5px;
  border: 0px;
  &:focus {
    outline: 0;
  }
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  box-shadow: 0px 3px 1px -2px rgba(51, 18, 37, 0.2), 0px 2px 2px 0px rgba(51, 18, 37, 0.14), 0px 1px 5px 0px rgba(51, 18, 37, 0.12);
  min-width: 88px;
  color: ${whiteLilac};
  border-radius: 5px;
  background-color: ${props => (props.disabled ? gray : juniper)};
`;

