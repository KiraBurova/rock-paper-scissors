import { createSlice, configureStore } from '@reduxjs/toolkit';
import { BET, BET_ODDS, BET_ON_ONE, BET_ON_TWO, FULL_BALANCE, POSITIONS } from '../constants';

const betSlice = createSlice({
  name: 'bets',
  initialState: {
    balance: FULL_BALANCE,
    allBets: POSITIONS,
    totalBet: 0,
    wonAmount: 0,
  },
  reducers: {
    addBet: (state, { payload }: { payload: number }) => {
      state.allBets = state.allBets.map((currentBet) => {
        if (currentBet.id === payload) {
          currentBet.bet += BET;
        }

        return currentBet;
      });
    },
    decreaseBalance: (state, { payload }: { payload: number }) => {
      if (state.balance > 0) {
        state.balance -= payload;
      }
    },
    increaseBalance: (state, { payload }: { payload: { numberOfBets: number; totalValueOfBets: number } }) => {
      if (payload.numberOfBets === BET_ON_ONE) {
        state.wonAmount = payload.totalValueOfBets * BET_ODDS;
        state.balance = state.balance + payload.totalValueOfBets * BET_ODDS;
      }
      if (payload.numberOfBets === BET_ON_TWO) {
        state.wonAmount = payload.totalValueOfBets * 2 + payload.totalValueOfBets;
        state.balance = state.balance + payload.totalValueOfBets * 2 + payload.totalValueOfBets;
      }
    },
    resetBets: (state) => {
      state.allBets = POSITIONS;
    },
  },
});

export const { addBet, decreaseBalance, increaseBalance, resetBets } = betSlice.actions;

export const store = configureStore({
  reducer: betSlice.reducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
