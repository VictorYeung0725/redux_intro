import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: '',
  isLoading: false,
};

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    deposit(state, action) {
      state.balance = state.balance + action.payload;
    },
    withdraw(state, action) {
      state.balnce -= action.payload;
    },

    requestloan: {
      prepare(amount, purpose) {
        return {
          payload: { amount, purpose },
        };
      },
      reducer(state, action) {
        if (state.loan > 0) return;

        state.loan = action.payload.amount;
        state.loanPurpose = action.payload.purpose;
        state.balance = state.balance + action.payload.amount;
      },
      payloan(state, action) {
        state.balance -= state.loan;
        state.loan = 0;
        state.loanPurpose = '';
      },
    },
  },
});
console.log(accountSlice);

export const { deposit, withdraw, requestloan, payloan } = accountSlice.actions;

console.log(requestloan(1000, 'car'));

export default accountSlice.reducer;

/*
const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: '',
  isLoading: false,
};

export default function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    case 'account/deposit':
      return {
        ...state,
        balance: state.balance + action.payload,
        isLoading: false,
      };

    case 'account/withdraw':
      return {
        ...state,
        balance: state.balance - action.payload,
      };

    case 'account/requestLoan':
      if (state.loan > 0) return state;
      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
        balance: state.balance + action.payload.amount,
      };

    case 'account/payloan':
      return {
        ...state,
        loan: 0,
        loanPurpose: '',
        balance: state.balance - state.loan,
      };

    case 'account/convertingCurrency':
      return {
        ...state,
        isLoading: true,
      };
    default:
      return state;
  }
}

export function deposit(amount, currency) {
  if (currency === 'USD') return { type: 'account/deposit', payload: amount };

  //redux will know this is a asynchronous action tha we want to execute before dispatching anything to the store
  //
  return async function (dispatch, getState) {
    dispatch({ type: 'account/convertingCurrency' });
    //API call
    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
    );
    const data = await res.json();
    const convertedUSD = data.rates.USD;
    console.log(data);
    console.log(convertedUSD);

    //return action
    dispatch({
      type: 'account/deposit',
      payload: convertedUSD,
    });
  };
}

export function withdraw(amount) {
  return { type: 'account/withdraw', payload: amount };
}

export function requestloan(amount, purpose) {
  return {
    type: 'account/requestLoan',
    payload: { amount, purpose },
  };
}

export function payloan() {
  return { type: 'account/payloan' };
}
*/
