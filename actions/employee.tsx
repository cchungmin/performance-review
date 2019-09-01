import types from './types';
import { post } from '../utils/request';

const API_PATH = '/v1/private/fetch-employee-data';

export const fetchEmployeeData = postData => async (dispatch) => {
  dispatch({ type: types.FETCH_EMPLOYEE_DATA });
  // const data = await post(API_PATH, postData);
  // console.log('data', data);
  const res = {
    data: {
      forename: 'Michael',
      surname: 'Jordan',
      startDate: '2016/04/01',
      admin: true,
      id: '0300',
      position: 'Engineering Manager',
      department: 'Tech',
      updating: false,
      deleted: false,
    },
    status: '200',
  };
  if (res.status === '200') {
    dispatch({ data: res.data, type: types.FETCH_EMPLOYEE_DATA_SUCCESS });
  } else {
    dispatch({ type: types.FETCH_EMPLOYEE_DATA_FAILED });
  }
};

export const fetchAllEmployeeData = postData => async (dispatch) => {
  dispatch({ type: types.FETCH_ALL_EMPLOYEE_DATA });
  // const data = await post(API_PATH, postData);
  const res = {
    data: [
      {
        forename: 'Michael',
        surname: 'Jordan',
        startDate: '2016/04/01',
        admin: true,
        id: '0300',
        position: 'Engineering Manager',
        department: 'Tech',
        updating: false,
        deleted: false,
      },
      {
        forename: 'Tony',
        surname: 'Allen',
        startDate: '2017/03/01',
        admin: false,
        id: '0301',
        position: 'Engineer',
        department: 'Tech',
        updating: false,
        deleted: false,
      },
    ],
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
  // const res = await post(API_PATH, postData);
  const newEmployee = {
    ...postData,
    admin: true,
    id: '0305',
  };

  dispatch({ data: newEmployee, type: types.ADD_EMPLOYEE_DATA_SUCCESS });
};

export const deleteEmployee = employeeId => async (dispatch: Function, getState: Function) => {
  dispatch({ type: types.DELETE_EMPLOYEE_DATA });
  const { allEmployeeData } = getState();
  const newData = allEmployeeData.map(el => {
    if (el.id === employeeId) {
      el.deleted = true;
    }
    return el;
  });
  dispatch({ data: newData, type: types.DELETE_EMPLOYEE_DATA_SUCCESS });
};

export const updateEmployee = postData => async (dispatch: Function, getState: Function) => {
  dispatch({ type: types.UPDATE_EMPLOYEE_DATA });
  const { allEmployeeData } = getState();
  const newData = allEmployeeData && allEmployeeData.map(el => {
    if (el.id === postData.id) {
      const newEl = {
        ...el,
        surname: postData.surname,
        forename: postData.forename,
        startDate: postData.startDate,
        admin: postData.admin,
        position: postData.position,
        department: postData.department,
      }
      return newEl;
    }
    return el;
  });
  dispatch({ data: newData, type: types.UPDATE_EMPLOYEE_DATA_SUCCESS });
};

export default {};
