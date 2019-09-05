import * as React from 'react';
import css from '../styles.scss';

const ReviewManagement = ({
  feedbackData,
  updateFeedback,
  updatingFeedback,
  getEmployeeName,
}) => (
  <>
    <h1>Incoming Reviews</h1>
    <div className={css['widget-container']}>
      <div className={css['widget']}>
        <table>
          <thead>
            <tr>
              <td>STATUS</td>
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
                    <td>{getEmployeeName(el.target)}</td>
                    <td>{el.rating}</td>
                    <td>{el.comment}</td>
                    {
                      el.status === 'NEW' ? (
                        <td>
                          <button value={el._id} onClick={updateFeedback}>
                            {updatingFeedback ? 'Cancel' : 'Start'}
                          </button>
                        </td>
                      ) : (<td></td>)
                    }
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
