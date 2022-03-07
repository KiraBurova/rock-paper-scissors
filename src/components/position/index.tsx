import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState, addBet } from '../../store';
import { IPosition } from '../../types';

import styles from './styles.module.scss';

export interface IPositionProps {
  position: IPosition;
  totalValueOfBets: number;
}

function Position({ position, totalValueOfBets }: IPositionProps) {
  const dispatch = useDispatch();
  const balance = useSelector((state: RootState) => state.balance);

  const handleAddBet = (id: number) => () => {
    if (totalValueOfBets < balance) {
      dispatch(addBet(id));
    }
  };
  return (
    <div className={`${styles.position} ${styles[position.name]}`} onClick={handleAddBet(position.id)}>
      {!!position.bet && <span className={styles.bet}>{position.bet}</span>}
      {position.name}
    </div>
  );
}

export default Position;
