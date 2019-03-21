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

// each line is 20 pixels,
// plus 10px padding within the speech bubble
// plus 4px padding outside of the speech bubble
// times 2 for top and bottom
export const SpeechBubbleSpacing = styled.div`
  width: ${props => (props.lines * 20) + ((10 + 4) * 2) };
  height: ${props => (props.lines * 20) + ((10 + 4) * 2) };
`;

export const Narration = styled.p`
  font-style: italic;
  font-size: 0.8em;
  ${props => props.danger && `color: ${red};`}
`;

