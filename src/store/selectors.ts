import { RootState } from '.';

export function getTotalValueOfBets(state: RootState) {
  return state.allBets.reduce((partialSum, currentBet) => partialSum + currentBet.bet, 0);
}

export function getNumberOfBets(state: RootState) {
  return state.allBets.filter((currentBet) => currentBet.bet !== 0).length;
}

export function getNotZeroBets(state: RootState) {
  return state.allBets.filter((currentBet) => currentBet.bet !== 0);
}
