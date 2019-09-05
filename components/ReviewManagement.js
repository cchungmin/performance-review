import * as React from 'react';
import css from '../styles.scss';

const ReviewManagement = ({
  feedbackData,
  updateFeedback,
  updatingFeedback,
}) => (
  <>
    <h1>Review Management</h1>
    <div className={css['widget-container']}>
      <div className={css['widget']}>
        <table>
          <thead>
            <tr>
              <td>STATUS</td>
              <td>ASSIGNEE</td>
              <td>ASSIGNER</td>
              <td>REVIEWED TARGET</td>
              <td>RATING</td>
              <td>COMMENT</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
              {
                feedbackData.map(el => (
                  <tr className={css['widget-inner']} key={el._id}>
                    <td>{el.status}</td>
                    <td>{el.assignee}</td>
                    <td>{el.assigner}</td>
                    <td>{el.target}</td>
                    <td>{el.rating}</td>
                    <td>{el.comment}</td>
                    <td>
                      <button value={el._id} onClick={updateFeedback}>
                        {updatingFeedback ? 'Cancel update' : 'Update'}
                      </button>
                    </td>
                  </tr>
                ))
              }
          </tbody>
        </table>
      </div>
    </div>
  </>
)

export default ReviewManagement;
