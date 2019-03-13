import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { PEOPLE } from '../helpers';
import { xsSpacing } from '../constants';
import WelcomeHeader from './welcomeHeader';

const tableSize = 350;
const lockSize = 70;
const middleLockSize = 80;

// const Table = styled.div`
//   position: relative;
//   width: ${tableSize}px;
//   height: ${tableSize}px;
//   margin: auto;
// `;

const Table = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  width: ${tableSize}px;
  margin: auto;
`;

const MiddleTable = styled(Table)`
  justify-content: space-evenly;
`;

// const Sam = styled.img.attrs(props => ({
//   src: props.src,
// }))`
//   height: 70px;
//   width: 70px;
//   border-radius: 35px;
// `;
//
// const SamPersonContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
// `

const Name = styled.div`
  color: black;
  font-size: 16px;
`

const StyleLink = styled(Link)`
  text-decoration: none;
`;

// const PersonContainer = styled.div`
//   padding: ${xsSpacing}px;
// `;

// const Person = styled.img.attrs(props => ({
//   src: props.src,
// }))`
//   height: ${lockSize}px;
//   width: ${lockSize}px;
//   border-radius: ${lockSize / 2}px;
//   transform: rotate(${props => (props.rotate ? -props.rotate : 0)}deg);
// `;

const Person = styled.img.attrs(props => ({
  src: props.src,
}))`
  width: ${lockSize}px;
  height: ${lockSize}px;
  border: 2px solid black;
  border-radius: 50%;
`;

// const MiddlePerson = styled(Person)`
//   height: ${middleLockSize}px;
//   width: ${middleLockSize}px;
//   border-radius: ${middleLockSize / 2}px;
// `;

// const MiddleLink = styled(Link)`
//   position: absolute;
//   top: ${(tableSize / 2) - (middleLockSize / 2) - (xsSpacing / 2)}px;
//   left: ${(tableSize / 2) - (middleLockSize / 2) - (xsSpacing / 2)}px;
// `;

// const Container = styled.div`
//   position: absolute;
//   width: 50%;
//   top: ${(tableSize / 2) - (lockSize / 2)}px;
//   right: 0;
//   text-align: right;
//   transform: rotate(${props => props.rotation}deg);
//   transform-origin: left;
// `;

const Container = styled.div`
  height: 150px;
  width: 100px;
  border: 1px solid blue;
  margin: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  border-radius: 10px;
`;

// const Content = styled.div`
//   display: flex;
//   flex-direction: row;
//   justify-content: flex-end;
//   align-items: center;
// `;

// const Line = styled.div`
//   border: 1px solid black;
//   width: ${(tableSize / 2) - lockSize - (xsSpacing * 2) - (middleLockSize / 2) - (xsSpacing * 2)}px;
//   pointer-events: none;
// `;

export default class Main extends React.Component {
  render() {
    const firstRow = [
      { name: PEOPLE['tim'].displayName, to: PEOPLE['tim'].path, key: 1, src: PEOPLE['tim'].src },
      { name: PEOPLE['jay'].displayName, to: PEOPLE['jay'].path, key: 2, src: PEOPLE['jay'].src },
      { name: PEOPLE['ryan'].displayName, to: PEOPLE['ryan'].path, key: 3, src: PEOPLE['ryan'].src },
    ];

    const secondRow = [
      { name: PEOPLE['matt'].displayName, to: PEOPLE['matt'].path, key: 4, src: PEOPLE['matt'].src },
      { name: PEOPLE['kristi'].displayName, to: PEOPLE['kristi'].path, key: 5, src: PEOPLE['kristi'].src },
    ];

    const thirdRow = [
      { name: PEOPLE['erica'].displayName, to: PEOPLE['erica'].path, key: 6, src: PEOPLE['erica'].src },
      { name: PEOPLE['maryann'].displayName, to: PEOPLE['maryann'].path, key: 7, src: PEOPLE['maryann'].src },
      { name: PEOPLE['helena'].displayName, to: PEOPLE['helena'].path, key: 8, src: PEOPLE['helena'].src },
    ];

    return (
      <div>
        <WelcomeHeader {...this.props} />
        <Table>
          {
            firstRow.map((item, index) => {
              return (
                <StyleLink to={item.to}>
                  <Container key={item.key} >
                    <Person src={item.src}  />
                    <Name>{item.name}</Name>
                  </Container>
                </StyleLink>
              );
            })
          }
        </Table>
        <MiddleTable>
          {
            secondRow.map((item, index) => {
              return (
                <StyleLink to={item.to}>
                  <Container key={item.key} >
                    <Person src={item.src}  />
                    <Name>{item.name}</Name>
                  </Container>
                </StyleLink>
              );
            })
          }
        </MiddleTable>
        <Table>
          {
            thirdRow.map((item, index) => {
              return (
                <StyleLink to={item.to}>
                  <Container key={item.key} >
                    <Person src={item.src}  />
                    <Name>{item.name}</Name>
                  </Container>
                </StyleLink>
              );
            })
          }
        </Table>
      </div>
    );
  }
}

// export default class Main extends React.Component {
//   render() {
//     const items = [
//       { to: PEOPLE['tim'].path, key: 1, src: PEOPLE['tim'].src },
//       { to: PEOPLE['jay'].path, key: 2, src: PEOPLE['jay'].src },
//       { to: PEOPLE['ryan'].path, key: 3, src: PEOPLE['ryan'].src },
//       { to: PEOPLE['kristi'].path, key: 4, src: PEOPLE['kristi'].src },
//       { to: PEOPLE['erica'].path, key: 5, src: PEOPLE['erica'].src },
//       { to: PEOPLE['maryann'].path, key: 6, src: PEOPLE['maryann'].src },
//       { to: PEOPLE['helena'].path, key: 7, src: PEOPLE['helena'].src },
//     ];
//
//     return (
//       <div>
//         <WelcomeHeader {...this.props} />
//         <Table>
//           {
//             items.map((item, index) => {
//               const rotation = index * (360 / items.length);
//               return (
//                 <Container key={item.key} rotation={rotation}>
//                   <Content>
//                     <Line />
//                     <Link to={item.to}>
//                       <PersonContainer>
//                         <Person src={item.src} rotate={rotation} />
//                       </PersonContainer>
//                     </Link>
//                   </Content>
//                 </Container>
//               );
//             })
//           }
//           <MiddleLink to={PEOPLE['matt'].path}>
//             <PersonContainer>
//               <MiddlePerson src={PEOPLE['matt'].src} />
//             </PersonContainer>
//           </MiddleLink>
//         </Table>
//       </div>
//     );
//   }
// }
