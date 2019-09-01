import types from './types';
import { post } from '../utils/request';

const API_PATH = '/v1/private/fetch-feedback-data';

export const fetchFeedbackData = postData => async (dispatch) => {
  dispatch({ type: types.FETCH_FEEDBACK_DATA });
  // const data = await post(API_PATH, postData);
  const res = {
    data: [
      {
        feedbackStatus: 'NEW',
        assigner: '0300',
        assignee: '0301',
        target: '0302',
        rating: 0,
        comment: '',
      },
      {
        feedbackStatus: 'COMPLETED',
        assigner: '0300',
        assignee: '0302',
        target: '0301',
        rating: 5,
        comment: 'Yey',
      },
    ],
    status: '200',
  };
  if (res.status === '200') {
    dispatch({ data: res.data, type: types.FETCH_FEEDBACK_DATA_SUCCESS });
  } else {
    dispatch({ type: types.FETCH_FEEDBACK_DATA_FAILED });
  }
};

export const addFeedback = postData => async (dispatch, getState) => {
  dispatch({ type: types.ADD_FEEDBACK });
  // const data = await post(API_PATH, postData);
  // const { feedbackData: { data: currentData } } = getState();
  const { assignee, assigner, target } = postData;
  const newFeedback = {
    feedbackStatus: 'NEW',
    assignee,
    assigner,
    target,
    rating: 0,
    comment: '',
  };

  dispatch({ data: newFeedback, type: types.ADD_FEEDBACK_SUCCESS });
};

export default {};
