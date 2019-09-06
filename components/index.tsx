import React from 'react';
import PropTypes from 'prop-types';

import css from '../styles.scss';
import { getWeekday, getDateTimeStr } from '../utils/datetime';

interface Employee {
  surname: string;
  forename: string;
  _id: string;
  startDate: string;
  admin: boolean,
  position: string,
  department: string;
}

interface Props {
  data: Employee;
}

const Index = ({ data }: Props) => (
  <div className={css['widget-container']}>
    <div className={css.widget}>
      <h2>{data.forename} {data.surname}</h2>
      {
        data.admin && (
          <span>Admin</span>
        )
      }
      <div>{data.position}</div>
      <div>{data.department}</div>
      <div>Start Date: {data.startDate}</div>
    </div>
  </div>
);

Index.defaultProps = {
  data: [],
  city: {},
};

export default Index;
