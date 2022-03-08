import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import GameStatus from './components/gameStatus'
import Header from './components/header'

import Position from './components/position'

import { decreaseBalance, increaseBalance, resetBets, resetWonValue, RootState } from './store'
import { getNumberOfBets, getNotZeroBets, getTotalValueOfBets } from './store/selectors'

import { IPosition } from './types'
import styles from './styles.module.scss'

function App() {
    const dispatch = useDispatch()
    const allBets = useSelector((state: RootState) => state.allBets)
    const wonValue = useSelector((state: RootState) => state.wonValue)
    const totalValueOfBets = useSelector((state: RootState) => getTotalValueOfBets(state))
    const numberOfBets = useSelector((state: RootState) => getNumberOfBets(state))
    const notZeroBets = useSelector((state: RootState) => getNotZeroBets(state))

    const [computerChoice, setComputerChoice] = useState<IPosition | null>(null)
    const [winnerChoice, setWinnerChoice] = useState<IPosition[] | null>(null)
    const [lost, setLost] = useState(false)
    const [balanceOverflow, setBalanceOverflow] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleStartGame = () => {
        const randomNumber = Math.floor(Math.random() * allBets.length)

        setComputerChoice(allBets[randomNumber])

        setLoading(true)

        if (notZeroBets.includes(allBets[randomNumber])) {
            handleWin()
        } else {
            handleLoss()
        }
    }

    const handleWin = () => {
        setTimeout(() => {
            dispatch(increaseBalance({ numberOfBets, totalValueOfBets }))
            setWinnerChoice(notZeroBets)
            setLoading(false)
            setLost(false)
            handleResetGame()
        }, 1000)
    }

    const handleLoss = () => {
        setTimeout(() => {
            dispatch(decreaseBalance(totalValueOfBets))
            dispatch(resetWonValue())
            setLost(true)
            setLoading(false)
            handleResetGame()
        }, 1000)
    }

    const handleBalanceOverflow = () => {
        setBalanceOverflow(true)
    }

    const handleResetGame = () => {
        dispatch(resetBets())
        setBalanceOverflow(false)
    }

    return (
        <div className={styles.field}>
            <Header totalValueOfBets={totalValueOfBets} wonValue={wonValue} />
            <div className={styles.fieldInner}>
                <GameStatus
                    loading={loading}
                    computerChoice={computerChoice}
                    winnerChoice={winnerChoice}
                    wonValue={wonValue}
                    lost={lost}
                    notZeroBets={notZeroBets}
                    balanceOverflow={balanceOverflow}
                />
                <div className={styles.positions}>
                    {allBets.map(position => (
                        <Position
                            key={position.id}
                            position={position}
                            totalValueOfBets={totalValueOfBets}
                            onBalanceOverflow={handleBalanceOverflow}
                        />
                    ))}
                </div>
                <div className={styles.buttonsContainer}>
                    <button className={styles.playButton} disabled={loading || !numberOfBets} onClick={handleStartGame}>
                        Play
                    </button>
                    <button className={styles.resetButton} disabled={!numberOfBets} onClick={handleResetGame}>
                        Reset
                    </button>
                </div>
            </div>
        </div>
    )
}

export default App
