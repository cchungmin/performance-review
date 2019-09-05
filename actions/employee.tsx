import types from './types';
import { get, post } from '../utils/request';
import apiPaths from './api';

export const fetchEmployeeData = postData => async (dispatch) => {
  dispatch({ type: types.FETCH_EMPLOYEE_DATA });
  const data = await get(apiPaths.FETCH_ALL_EMPLOYEES);
  const res = {
    data,
    status: '200',
  };
  const picked = res.data[0];
  if (res.status === '200') {
    dispatch({ data: { ...picked, admin: true }, type: types.FETCH_EMPLOYEE_DATA_SUCCESS });
  } else {
    dispatch({ type: types.FETCH_EMPLOYEE_DATA_FAILED });
  }
};

export const fetchAllEmployeeData = () => async (dispatch) => {
  dispatch({ type: types.FETCH_ALL_EMPLOYEE_DATA });
  const data = await get(apiPaths.FETCH_ALL_EMPLOYEES);
  const res = {
    data,
    status: '200',
  };
  if (res.status === '200') {
    dispatch({ data: res.data, type: types.FETCH_ALL_EMPLOYEE_DATA_SUCCESS });
  } else {
    dispatch({ type: types.FETCH_ALL_EMPLOYEE_DATA_FAILED });
  }
};

export const addEmployee = postData => async (dispatch: Function) => {
  dispatch({ type: types.ADD_EMPLOYEE_DATA });
  const res = await post(apiPaths.ADD_EMPLOYEE, postData);
  dispatch({ data: res, type: types.ADD_EMPLOYEE_DATA_SUCCESS });
};

export const deleteEmployee = employeeId => async (dispatch: Function) => {
  dispatch({ type: types.DELETE_EMPLOYEE_DATA });
  const res = await post(apiPaths.DELETE_EMPLOYEE, { _id: employeeId });
  dispatch({ data: res, type: types.DELETE_EMPLOYEE_DATA_SUCCESS });
};

export const updateEmployee = postData => async (dispatch: Function) => {
  dispatch({ type: types.UPDATE_EMPLOYEE_DATA });
  const res = await post(apiPaths.UPDATE_EMPLOYEE, postData);
  dispatch({ data: res, type: types.UPDATE_EMPLOYEE_DATA_SUCCESS });
};

export default {};
