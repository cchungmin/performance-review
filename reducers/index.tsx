import types from '../actions/types';

export const INITIAL_STATE = {
  employeeData: {},
  allEmployeeData: [],
  feedbackData: [],
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.FETCH_EMPLOYEE_DATA_SUCCESS:
      return {
        ...state,
        employeeData: action.data,
      };
    case types.FETCH_ALL_EMPLOYEE_DATA_SUCCESS:
      return {
        ...state,
        allEmployeeData: action.data,
      };
    case types.ADD_EMPLOYEE_DATA_SUCCESS:
      return {
        ...state,
        allEmployeeData: [...state.allEmployeeData, action.data],
      };
    case types.DELETE_EMPLOYEE_DATA_SUCCESS:
      return {
        ...state,
        allEmployeeData: action.data.filter(el => !el.deleted),
      };
    case types.UPDATE_EMPLOYEE_DATA_SUCCESS:
      return {
        ...state,
        allEmployeeData: action.data,
      };
    case types.ADD_FEEDBACK_SUCCESS:
      return {
        ...state,
        feedbackData: [...state.feedbackData, action.data],
      };
    case types.FETCH_FEEDBACK_DATA_SUCCESS:
      return {
        ...state,
        feedbackData: action.data,
      };
    default:
      return state;
  }
};

export default reducer;
