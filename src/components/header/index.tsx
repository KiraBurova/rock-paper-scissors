import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

import styles from './styles.module.scss';

export interface IHeader {
  totalValueOfBets: number;
}

function Header({ totalValueOfBets }: IHeader) {
  const balance = useSelector((state: RootState) => state.balance);

  return (
    <header className={styles.header}>
      <div>
        <span>Balance: {balance}</span>
      </div>
      <div>
        <span>Bet: {totalValueOfBets}</span>
      </div>
    </header>
  );
}

export default Header;
