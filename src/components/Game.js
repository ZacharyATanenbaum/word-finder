import React, { Component } from 'react';
import Board from './Board';
import ScoreTable from './ScoreTable';
import { getLetterFrequency, performRotation } from '../assets/utils';
import { DoubleAgent } from '../assets/agents';
import letterValues from '../assets/data/letterValues.json';
import alphabetBoard from '../assets/data/alphabetBoard.json';

type Player = {
  name: string,
  score: number
};

type Props = {
  addBot: boolean,
  boardSize: number,
  numPlayers: number,
  numRounds: number,
  returnToHome: () => void
};

type State = {
  letters: Array<Array<string>>,
  mode: 'action' | 'swap' | 'word',
  players: Array<Player>,
  roundNumber: number,
  swapIdxs: Array<number>,
  turnIdx: number
};

class Game extends Component<Props, State> {
  state: State = {
    letters: [...Array(this.props.boardSize).keys()].map(() => (
      [...Array(this.props.boardSize).keys()].map(() => this.generateRandomLetter())
    )),
    mode: 'action',
    players: [...Array(this.props.numPlayers).keys()].map(idx => {
      return { name: `P${idx}`, score: 0 };
    }).concat(this.props.addBot ? [{ name: 'Bot', score: 0 }] : []),
    roundNumber: 1,
    swapIdxs: [],
    turnIdx: 0
  }

  constructor(props: Props) {
    super(props);
    this.fillLetters = this.fillLetters.bind(this);
    this.performAction = this.performAction.bind(this);
    this.returnToAction = this.returnToAction.bind(this);
    this.swapLetters = this.swapLetters.bind(this);
  }

  generateRandomLetter() {
    const alphabet = getLetterFrequency();
    return alphabet[Math.floor(Math.random() * alphabet.length)]
  }

  fillLetters(selectedLetters: Array<Array<number>>) {
    const { letters } = this.state;
    selectedLetters.forEach(idxs => {
      letters[idxs[0]][idxs[1]] = this.generateRandomLetter();
    });
    this.setState({ letters });
  }

  exit() {
    const { players } = this.state;
    let winningPlayer = players[0];

    for (let i = 1; i < players.length; i++) {
      if (winningPlayer.score < players[i].score) {
        winningPlayer = players[i];
      }
    }

    alert(`Congratulations, ${winningPlayer.name} won with ${winningPlayer.score} points!`);
    this.props.returnToHome();
  }

  botMove() {
    const { boardSize } = this.props;
    const { letters } = this.state;
    const agent = new DoubleAgent();
    const move = agent.getMove(letters);
    const word = move.word
      ? letters[move.word[0][0]][move.word[0][1]]
        + letters[move.word[1][0]][move.word[1][1]]
      : null;

    if (move.action === 'swap') {
      letters[move.idx1][move.idx2] = move.swap;
    } else {
      performRotation(move.action, move.idx1, move.idx2, letters, boardSize);
    }
    this.setState({ letters });

    let score = 0;
    move.word.forEach(idxs => score += letterValues[letters[idxs[0]][idxs[1]]]);
    this.fillLetters(move.word);
    return {word, score};
  }

  returnToAction(points: number) {
    const { numRounds } = this.props;
    let { turnIdx, roundNumber, players } = this.state;
    let results = null;
    players[turnIdx].score += points;

    if (turnIdx + 1 === players.length) {
      turnIdx = 0;
      roundNumber++;
    } else if (players[turnIdx + 1].name === 'Bot') {
      results = this.botMove();
      players[turnIdx + 1].score += results.score;
      turnIdx = 0;
      roundNumber++;
    } else {
      turnIdx++;
    }

    if (roundNumber > numRounds) {
      this.exit();
      return;
    }

    this.setState({ mode: 'action', turnIdx, roundNumber, players });
    if (results !== null && results.word !== null) {
      alert(`Bot found word ${results.word} for ${results.score} points`);
    } else if (results !== null) {
      alert(`Bot skipped word submission`);
    }
  }

  performAction(currentAction: string, idx1: number, idx2: number) {
    const { letters } = this.state;
    const { boardSize } = this.props;

    if (currentAction === 'swap') {
      this.setState({ mode: 'swap', swapIdxs: [idx1, idx2] });
      return;
    }

    performRotation(currentAction, idx1, idx2, letters, boardSize);
    this.setState({ letters: letters, mode: 'word' });
  }

  swapLetters(currentAction: string, idx1: number, idx2: number) {
    const { letters, swapIdxs } = this.state;
    letters[swapIdxs[0]][swapIdxs[1]] = alphabetBoard[idx1][idx2];
    this.setState({ letters: letters, mode: 'word', swapIdxs: [] });
  }

  render() {
    const { boardSize, numRounds } = this.props;
    const { mode, players, roundNumber, turnIdx } = this.state;

    return (
      <div>
        <ScoreTable
          players={players}
          numRounds={numRounds}
          roundNumber={roundNumber}
          turnIdx={turnIdx}
        />
        <Board
          boardSize={boardSize}
          fillLetters={this.fillLetters}
          letters={mode === 'swap' ? alphabetBoard : this.state.letters}
          mode={mode}
          performAction={mode === 'swap' ? this.swapLetters : this.performAction}
          returnToAction={this.returnToAction}
        />
      </div>
    );
  }
}

export default Game;
