import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'

import styles from './styles.module.scss'

export interface IHeader {
    totalValueOfBets: number
    wonValue: number
}

function Header({ totalValueOfBets, wonValue }: IHeader) {
    const balance = useSelector((state: RootState) => state.balance)

    return (
        <header className={styles.header}>
            <span>
                <span className={styles.indicator}>Balance:&nbsp;</span>
                {balance}
            </span>
            <span>
                <span className={styles.indicator}>Bet:&nbsp;</span> {totalValueOfBets}
            </span>
            <span>
                <span className={styles.indicator}>Win:&nbsp;</span> {wonValue}
            </span>
        </header>
    )
}

export default Header
