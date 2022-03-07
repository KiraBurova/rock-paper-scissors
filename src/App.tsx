import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GameStatus from './components/gameStatus';
import Header from './components/header';

import Position from './components/position';
import { POSITIONS } from './constants';

import { decreaseBalance, increaseBalance, resetBets, RootState } from './store';
import { getNumberOfBets, getNotZeroBets, getTotalValueOfBets } from './store/selectors';

import styles from './styles.module.scss';
import { IPosition } from './types';

function App() {
  const dispatch = useDispatch();
  const allBets = useSelector((state: RootState) => state.allBets);
  const wonValue = useSelector((state: RootState) => state.wonValue);
  const totalValueOfBets = useSelector((state: RootState) => getTotalValueOfBets(state));
  const numberOfBets = useSelector((state: RootState) => getNumberOfBets(state));
  const notZeroBets = useSelector((state: RootState) => getNotZeroBets(state));

  const [computerChoice, setComputerChoice] = useState<IPosition | null>(null);
  const [winnerChoice, setWinnerChoice] = useState<IPosition[] | null>(null);
  const [lost, setLost] = useState(false);
  const [balanceOverflow, setBalanceOverflow] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleStartGame = () => {
    const randomNumber = Math.floor(Math.random() * allBets.length);

    setComputerChoice(allBets[randomNumber]);

    setLoading(true);

    if (notZeroBets.includes(allBets[randomNumber])) {
      handleWin();
    } else {
      handleLoss();
    }
  };

  const handleWin = () => {
    setTimeout(() => {
      dispatch(increaseBalance({ numberOfBets, totalValueOfBets }));
      setWinnerChoice(notZeroBets);
      setLoading(false);
      setLost(false);
      dispatch(resetBets());
    }, 1000);
  };

  const handleLoss = () => {
    setTimeout(() => {
      dispatch(decreaseBalance(totalValueOfBets));
      setLost(true);
      setLoading(false);
      dispatch(resetBets());
    }, 1000);
  };

  const handleBalanceOverflow = () => {
    setBalanceOverflow(true);
  };

  return (
    <div className={styles.field}>
      <Header totalValueOfBets={totalValueOfBets} wonValue={wonValue} />
      <div className={styles.fieldInner}>
        <GameStatus computerChoice={computerChoice} winnerChoice={winnerChoice} wonValue={wonValue} lost={lost} notZeroBets={notZeroBets} balanceOverflow={balanceOverflow} />
        <div className={styles.positions}>
          {allBets.map((position) => (
            <Position key={position.id} position={position} totalValueOfBets={totalValueOfBets} onBalanceOverflow={handleBalanceOverflow} />
          ))}
        </div>
        <button disabled={loading} className={styles.button} onClick={handleStartGame}>
          Play
        </button>
      </div>
    </div>
  );
}

export default App;
