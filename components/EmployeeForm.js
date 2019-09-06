import * as React from 'react';
import AutoForm from 'react-auto-form';
import css from '../styles.scss';

const EmployeeForm = ({
  onFormChange,
  onFormSubmit,
  selectedTarget,
}) => (
  <AutoForm onChange={onFormChange} onSubmit={onFormSubmit} className={css['widget-container']}>
    <div className={css['widget']}>
      <h2>{selectedTarget ? 'Update Employee Information' : 'Add New Employee'}</h2>
      <div className={css['employee-form']}>
        <label htmlFor="forename" className={css['employee-form-label']}>
          Forename
          <input name="forename" required defaultValue={selectedTarget && selectedTarget.forename} />
        </label>
        <label htmlFor="surname" className={css['employee-form-label']}>
          Surname
          <input name="surname" required defaultValue={selectedTarget && selectedTarget.surname} />
        </label>
        <label htmlFor="position" className={css['employee-form-label']}>
          Position
          <input name="position" required defaultValue={selectedTarget && selectedTarget.position} />
        </label>
        <label htmlFor="department" className={css['employee-form-label']}>
          Department
          <input name="department" required defaultValue={selectedTarget && selectedTarget.department} />
        </label>
        <label htmlFor="startDate" className={css['employee-form-label']}>
          Start Date
          <input name="startDate" required defaultValue={selectedTarget && selectedTarget.startDate} placeholder="YYYY/MM/DD" />
        </label>
        <button type="submit">Submit</button>
      </div>
    </div>
  </AutoForm>
);

export default EmployeeForm;
