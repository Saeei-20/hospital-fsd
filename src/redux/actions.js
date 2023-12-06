// medicineActions.js
/* import axios from 'axios';

export const fetchMedicines = () => async (dispatch) => {
  try {
    const response = await axios.get('http://localhost:4000/api/medicines');
    dispatch({ type: 'FETCH_MEDICINES_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'FETCH_MEDICINES_FAILURE', payload: error.message });
  }
};
 */
// medicineActions.js
import axios from 'axios';
import { createAction } from '@reduxjs/toolkit';
export const fetchMedicinesSuccess = (medicines) => ({
  type: 'FETCH_MEDICINES_SUCCESS',
  payload: medicines,
});

export const fetchMedicinesFailure = (error) => ({
  type: 'FETCH_MEDICINES_FAILURE',
  payload: error,
});

export const fetchMedicines = () => async (dispatch) => {
  try {
    const response = await axios.get('http://localhost:4000/api/medicines');
    dispatch(fetchMedicinesSuccess(response.data));
  } catch (error) {
    dispatch(fetchMedicinesFailure(error.message));
  }
};
export const updateMedicineQuantity = (index, newQuantity) => ({
    type: 'UPDATE_MEDICINE_QUANTITY',
    payload: { index, newQuantity },
  });

  // medicineActions.js
export const updateMedicineAction = (index, newAction) => ({
    type: 'UPDATE_MEDICINE_ACTION',
    payload: { index, newAction },
  });


  export const addToCart = createAction('pages/addtocart', (item) => ({
    payload: item,
  }));

  