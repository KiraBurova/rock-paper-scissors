import React from 'react';
import { IPosition } from '../../types';

import styles from './styles.module.scss';

interface IGameStatus {
  winnerChoice: IPosition[] | null;
  wonValue: number;
  computerChoice: IPosition | null;
  notZeroBets: IPosition[];
  lost: boolean;
  balanceOverflow: boolean;
  loading: boolean;
}

function GameStatus({ winnerChoice, computerChoice, wonValue, notZeroBets, lost, balanceOverflow, loading }: IGameStatus) {
  if (loading) {
    return <p>Calculating...</p>;
  }

  if (lost) {
    return (
      <div className={styles.lossText}>
        <div>You lost</div>
      </div>
    );
  }

  if (balanceOverflow) {
    return (
      <div className={styles.lossText}>
        <div>Can not add more than balance</div>
      </div>
    );
  }

  if (winnerChoice) {
    return (
      <div className={styles.winText}>
        <>
          <div className={styles.winnerChoice}>
            {winnerChoice.map((choice) => (
              <span key={choice.name}>{choice.name}</span>
            ))}
            &nbsp;won
          </div>
          <div>You win: {wonValue}</div>
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
            <span key={bets.id} className={styles.choice}>
              {bets.name}
            </span>
            &nbsp;
          </>
        ))}
      </div>
    </div>;
  }

  return <p>Pick your positions</p>;
}

export default GameStatus;
