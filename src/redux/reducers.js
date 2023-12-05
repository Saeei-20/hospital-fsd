// medicineReducer.js
import { createReducer } from '@reduxjs/toolkit';
import * as actions from './actions';

const initialState = {
    medicineList: [],
    cartItems: [],
    error: null,
  };
  
  export const medicineReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_MEDICINES_SUCCESS':
        return {
          ...state,
          medicineList: action.payload,
          error: null,
        };
  
      case 'FETCH_MEDICINES_FAILURE':
        return {
          ...state,
          error: action.payload,
        };
  
      // medicineReducer.js
      case 'UPDATE_MEDICINE_ACTION':
        const { index, newAction } = action.payload;
        return {
          ...state,
          medicineList: state.medicineList.map((medicine, i) =>
            i === index ? { ...medicine, action: newAction } : medicine
          ),
        };
  
      // ... existing cases
  
      default:
        return state;
    }
  };
  
  // cartReducer.js

 /* export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_TO_CART':
        return {
          ...state,
          cartItems: [...state.cartItems, action.payload],
        };
  
      // Other cases for modifying the cart if needed
  
      default:
        return state;
    }
  }; */
  export const cartReducer = createReducer(initialState, (builder) => {
    builder
      .addCase(actions.addToCart, (state, action) => {
        state.cartItems.push(action.payload);
      })
     
  });
  