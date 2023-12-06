// store.js
import { configureStore } from '@reduxjs/toolkit';
import { medicineReducer, cartReducer } from './reducers';

const store = configureStore({
  reducer: {
    medicine: medicineReducer,
    cart: cartReducer,
    // ... other reducers if you have them
  },
});

export default store;
