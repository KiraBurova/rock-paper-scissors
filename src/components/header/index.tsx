import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

import styles from './styles.module.scss';

export interface IHeader {
  totalValueOfBets: number;
  wonValue: number;
}

function Header({ totalValueOfBets, wonValue }: IHeader) {
  const balance = useSelector((state: RootState) => state.balance);

  return (
    <header className={styles.header}>
      <span>Balance: {balance}</span>
      <span>Bet: {totalValueOfBets}</span>
      <span>Win: {wonValue}</span>
    </header>
  );
}

export default Header;
