import React from 'react';
import { IPosition } from '../../types';

import styles from './styles.module.scss';

interface IGameStatus {
  winnerChoice: IPosition[] | null;
  wonAmount: number;
  computerChoice: IPosition | null;
  notZeroBets: IPosition[];
  lost: boolean;
}

function GameStatus({ winnerChoice, computerChoice, wonAmount, notZeroBets, lost }: IGameStatus) {
  if (lost) {
    return (
      <div className={styles.lossText}>
        <div>You lost</div>
      </div>
    );
  }

  if (winnerChoice) {
    return (
      <div className={styles.winText}>
        <>
          <div className={styles.winnerChoice}>{winnerChoice.map((choice) => choice.name)} won</div>
          <div>You win: {wonAmount}</div>
        </>
      </div>
    );
  }

  if (computerChoice) {
    <div>
      <div>
        <span className={styles.choice}>{computerChoice.name}</span> vs&nbsp;
        {notZeroBets.map((bets) => (
          <>
            <span className={styles.choice}>{bets.name}</span>&nbsp;
          </>
        ))}
      </div>
    </div>;
  }

  return <p>Pick your positions</p>;
}

export default GameStatus;
