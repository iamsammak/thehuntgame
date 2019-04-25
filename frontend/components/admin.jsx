import React, { Fragment } from 'react';
import io from 'socket.io-client';
import styled from 'styled-components';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck';
import { faEye } from '@fortawesome/free-solid-svg-icons/faEye';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons/faQuestionCircle';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons/faThumbsUp';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';

import { SmSpacing } from '../wrappers';
import { Button } from './buttons';
import { green, red, white } from '../constants';

library.add(
  faCheck,
  faEye,
  faQuestionCircle,
  faThumbsUp,
  faTimes,
);

const Action = styled.div`
  margin: 1em;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ActionButton = styled(Button)`
  color: ${white};
  background-color: ${props => (props.danger ? red : green)};
`;

const CheckIcon = styled(Icon)`
  color: ${props => (props.checked ? 'green' : 'red')};
`;

const Table = styled.table`
  border-collapse: collapse;
`;

const TableHeaderCell = styled.th`
  ${props => (props.left ? 'border-left: 1px solid black;' : null)}
  ${props => (props.right ? 'border-right: 1px solid black;' : null)}
`;

const TableCell = styled.td`
  ${props => (props.left ? 'border-left: 1px solid black;' : null)}
  ${props => (props.right ? 'border-right: 1px solid black;' : null)}
`;

const SmallText = styled.span`
  font-size: 0.75em;
  font-weight: normal;
`;

class Admin extends React.Component {
  constructor(props) {
    super(props);

    const socket = io(SOCKET_URL);
    socket.on('admin_data', (data) => {
      this.setState({
        puzzleData: data['puzzleData'],
        answersShown: data['answersShown'],
        gameStarted: data['gameStarted'],
      });
    });
    socket.on('game_started', (data) => {
      this.setState({ gameStarted: data['gameStarted'] });
    });
    socket.on('answers_shown', (data) => {
      this.setState({ answersShown: data['answersShown'] });
    });

    this.state = {
      socket: socket,
      puzzleData: null,
      answersShown: null,
      gameStarted: null,
    };

    this.adminPing('load');
    this.timeFilter = this.timeFilter.bind(this);
    this.renderHeaders = this.renderHeaders.bind(this);
    this.renderTable = this.renderTable.bind(this);
    this.renderPuzzleData = this.renderPuzzleData.bind(this);
  }

  adminPing(trigger) {
    const { socket } = this.state;
    socket.emit('load_admin_data', { 'trigger': trigger });
  }

  startGame() {
    this.adminPing('start_game');
  }

  stopGame() {
    this.adminPing('stop_game');
  }

  showAnswers() {
    this.adminPing('show_answers');
  }

  hideAnswers() {
    this.adminPing('hide_answers');
  }

  timeFilter(dataEntry) {
    return !['start_time', 'end_time'].includes(dataEntry[0]);
  }

  renderTable(data, table) {
    return (
      <tr key={table}>
        <TableCell right>
          Table {table}
        </TableCell>
        {
          data.map((dataEntry, i) => {
            const [, tableData] = dataEntry;
            const { started, solved, hint_count } = tableData[table];
            return (
              <Fragment key={i}>
                <TableCell left>
                  <CheckIcon icon={started ? 'check' : 'times'} checked={started} />
                </TableCell>
                <TableCell>
                  <CheckIcon icon={solved ? 'check' : 'times'} checked={solved} />
                </TableCell>
                <TableCell right>
                  {hint_count}
                </TableCell>
              </Fragment>
            );
          })
        }
      </tr>
    );
  }

  renderHeaders(dataEntry) {
    const [puzzle, tableData] = dataEntry;
    const numTables = Object.keys(tableData).length;
    const numSolved = Object.values(tableData).reduce((sum, info) => {
      const { solved } = info;
      return sum + (solved ? 1 : 0);
    }, 0);
    return (
      <TableHeaderCell colSpan={3} left right key={puzzle}>
        {puzzle} <SmallText>({numSolved}/{numTables})</SmallText>
      </TableHeaderCell>
    );
  }

  renderPuzzleData(data) {
    const sortedData = Object.entries(data)
      .filter(this.timeFilter)
      .sort((a, b) => {
        let aCode = a[0].charCodeAt(0);
        // ASCII code for letters is all >= 65
        if (aCode < 65) {
          aCode += 127;
        }
        // ASCII code for letters is all >= 65
        let bCode = b[0].charCodeAt(0);
        if (bCode < 65) {
          bCode += 127;
        }
        return aCode - bCode;
      });
    const tables = Object.keys(data[Object.keys(data)[0]])
      .map((table) => parseInt(table))
      .sort((a, b) => a - b)
      .map((table) => table.toString());

    return (
      <Table>
        <tbody>
          <tr>
            <TableHeaderCell />
            {sortedData.map(this.renderHeaders)}
          </tr>
          <tr>
            <th />
            {
              sortedData.map((_, i) => {
                return (
                  <Fragment key={i}>
                    <TableHeaderCell left><Icon icon="eye" /></TableHeaderCell>
                    <TableHeaderCell><Icon icon="thumbs-up" /></TableHeaderCell>
                    <TableHeaderCell right><Icon icon="question-circle" /></TableHeaderCell>
                  </Fragment>
                );
              })
            }
          </tr>
          {tables.map((table) => this.renderTable(sortedData, table))}
        </tbody>
      </Table>
    );
  }

  render() {
    const { answersShown, gameStarted, puzzleData } = this.state;

    return (
      <div>
        <Action>
          {
            gameStarted === null ?
              '...' :
              (
                <Fragment>
                  <ActionButton
                    onClick={() => (gameStarted ? this.stopGame() : this.startGame())}
                    danger={gameStarted}
                  >
                    {gameStarted ? 'Stop Game' : 'Start Game'}
                  </ActionButton>
                  <SmSpacing />
                  Game has {gameStarted ? '' : 'not '}started!
                </Fragment>
              )
          }
        </Action>
        <Action>
          {
            answersShown === null ?
              '...' :
              (
                <Fragment>
                  <ActionButton
                    onClick={() => (answersShown ? this.hideAnswers() : this.showAnswers())}
                    danger={answersShown}
                  >
                    {answersShown ? 'Hide' : 'Reveal'}
                  </ActionButton>
                  <SmSpacing />
                  Answers have {answersShown ? '' : 'not '}been revealed!
                </Fragment>
              )
          }
        </Action>
        <div>
          {puzzleData && Object.keys(puzzleData).length > 0 && this.renderPuzzleData(puzzleData)}
        </div>
      </div>
    );
  }
}

export default Admin;
