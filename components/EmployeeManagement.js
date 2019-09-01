
import * as React from 'react';
import css from '../styles.scss';

export default ({
  allEmployeeData,
  assignFeedback,
  onSelectReviewerChange,
  updateEmployee,
  deleteEmployee,
  addEmployee,
  updating,
  adding,
}) => (
  <>
    <h1>Employee Management</h1>
    <div className={css['widget-container']}>
      <div className className={css['widget']}>
        <table>
          <thead>
            <tr>
              <td>Name</td>
              <td>Position</td>
              <td>Dept</td>
              <td>Start From</td>
              <td>Request feedback</td>
              <td></td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {
              allEmployeeData.map(el => (
                <tr className={css['widget-inner']}>
                  <td>{el.forename} {el.surname}</td>
                  <td>{el.position}</td>
                  <td>{el.department}</td>
                  <td>{el.startDate}</td>
                  <td>
                    <select onChange={onSelectReviewerChange}>
                      {
                        allEmployeeData.filter(filterEl =>
                          filterEl.id !== el.id
                        ).map(innerEl => (
                          <option value={innerEl.id}>{innerEl.forename} {innerEl.surname}</option>
                        ))
                      }
                    </select>
                    <button onClick={assignFeedback}>
                      Assign
                    </button>
                  </td>
                  <td>
                    <button value={el.id} onClick={updateEmployee} disabled={adding}>
                      {updating ? 'Cancel update' : 'Update'}
                    </button>
                  </td>
                  <td>
                    <button value={el.id} onClick={deleteEmployee}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
        <div className={css['add-employee-cta-container']}>
          <button disabled={updating} onClick={addEmployee}>{adding ? 'Cancel the add' : 'Add employee'}</button>
        </div>
      </div>
    </div>
  </>
)
