import styled from 'styled-components';

import { xxsSpacing, xsSpacing, smSpacing, mdSpacing, lgSpacing, xlSpacing, red } from './constants';

export const XxsSpacing = styled.div`
  width: ${xxsSpacing};
  height: ${xxsSpacing};
`;
export const XsSpacing = styled.div`
  width: ${xsSpacing};
  height: ${xsSpacing};
`;
export const SmSpacing = styled.div`
  width: ${smSpacing};
  height: ${smSpacing};
`;
export const MdSpacing = styled.div`
  width: ${mdSpacing};
  height: ${mdSpacing};
`;
export const LgSpacing = styled.div`
  width: ${lgSpacing};
  height: ${lgSpacing};
`;
export const XlSpacing = styled.div`
  width: ${xlSpacing};
  height: ${xlSpacing};
`;

export const Narration = styled.div`
  font-style: italic;
  font-size: 0.8em;
  ${props => props.danger && `color: ${red};`}
`;

