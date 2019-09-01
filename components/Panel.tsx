import React from 'react';
import PropTypes from 'prop-types';

import css from '../styles.scss';

const Panel = ({
  onRadioInputChange,
  selectedFilter,
  labels,
}) => (
  <div className={css['panel-container']}>
    <label className={css['panel-label']} htmlFor="three-hour">
      Every 3 hour
      <input
        type="radio"
        id="three-hour"
        name="drone"
        value="3h"
        onChange={onRadioInputChange}
        checked={selectedFilter === '3h'}
      />
    </label>
    {
      Object.keys(labels).map((el, index) => (
        <label
          className={css['panel-label']}
          htmlFor={`${el}-${index}`}
          key={el}
        >
          Every&nbsp;
          {labels[el]}
          <input
            type="radio"
            id={`${el}-${index}`}
            name="drone"
            value={el}
            onChange={onRadioInputChange}
            checked={selectedFilter === el}
          />
        </label>
      ))
    }
  </div>
);

Panel.propTypes = {
  onRadioInputChange: PropTypes.func,
  selectedFilter: PropTypes.string,
  labels: PropTypes.objectOf(
    PropTypes.string,
  ),
};

Panel.defaultProps = {
  onRadioInputChange: () => {},
  selectedFilter: '3h',
  labels: {},
};

export default Panel;
