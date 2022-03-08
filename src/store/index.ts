import { createSlice, configureStore } from '@reduxjs/toolkit'
import { BET, BET_ODDS, BET_VARIANT_ONE, BET_VARIANT_TWO, FULL_BALANCE, POSITIONS } from '../constants'

const betSlice = createSlice({
    name: 'bets',
    initialState: {
        balance: FULL_BALANCE,
        allBets: POSITIONS,
        totalBet: 0,
        wonValue: 0,
    },
    reducers: {
        addBet: (state, { payload }: { payload: number }) => {
            state.allBets = state.allBets.map(currentBet => {
                if (currentBet.id === payload) {
                    currentBet.bet += BET
                }

                return currentBet
            })
        },
        decreaseBalance: (state, { payload }: { payload: number }) => {
            if (state.balance > 0) {
                state.balance -= payload
            }
        },
        increaseBalance: (state, { payload }: { payload: { numberOfBets: number; totalValueOfBets: number } }) => {
            // if user picked one choice - 14 * bet
            if (payload.numberOfBets === BET_VARIANT_ONE) {
                state.wonValue = payload.totalValueOfBets * BET_ODDS
                state.balance = state.balance + payload.totalValueOfBets * BET_ODDS
            }
            // if user picked two - 2:1 * bet
            if (payload.numberOfBets === BET_VARIANT_TWO) {
                state.wonValue = payload.totalValueOfBets * 2 + payload.totalValueOfBets
                state.balance = state.balance + payload.totalValueOfBets * 2 + payload.totalValueOfBets
            }
        },
        resetBets: state => {
            state.allBets = POSITIONS
        },
        resetWonValue: state => {
            state.wonValue = 0
        },
    },
})

export const { addBet, decreaseBalance, increaseBalance, resetBets, resetWonValue } = betSlice.actions

export const store = configureStore({
    reducer: betSlice.reducer,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
