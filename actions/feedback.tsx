import types from './types';
import { get, post } from '../utils/request';
import apiPaths from './api';

export const fetchFeedbackData = () => async (dispatch: Function) => {
  dispatch({ type: types.FETCH_FEEDBACK_DATA });
  const data = await get(apiPaths.FETCH_FEEDBACKS);
  const res = {
    data,
    status: '200',
  };
  if (res.status === '200') {
    dispatch({ data: res.data, type: types.FETCH_FEEDBACK_DATA_SUCCESS });
  } else {
    dispatch({ type: types.FETCH_FEEDBACK_DATA_FAILED });
  }
};

export const addFeedback = postData => async (dispatch: Function) => {
  dispatch({ type: types.ADD_FEEDBACK });
  const res = await post(apiPaths.ADD_FEEDBACK, postData);
  dispatch({ data: res, type: types.ADD_FEEDBACK_SUCCESS });
};

export const updateFeedback = postData => async (dispatch: Function) => {
  dispatch({ type: types.UPDATE_FEEDBACK });
  const res = await post(apiPaths.UPDATE_FEEDBACK, postData);
  dispatch({ data: res, type: types.UPDATE_FEEDBACK_SUCCESS });
};

export default {};
