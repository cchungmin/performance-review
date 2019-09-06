import * as React from 'react';
import AutoForm from 'react-auto-form';
import css from '../styles.scss';

const EmployeeForm = ({
  onReviewFormChange,
  onReviewFormSubmit,
  selectedFeedback,
}) => (
  <AutoForm onChange={onReviewFormChange} onSubmit={onReviewFormSubmit} className={css['widget-container']}>
    <div className={css['widget']}>
      <h2>{selectedFeedback ? 'Update Feedback Information' : 'Finish Feedback'}</h2>
      <div className={css['employee-form']}>
        <label htmlFor="forename" className={css['employee-form-label']}>
          Rating
          <input name="rating" required defaultValue={selectedFeedback && selectedFeedback.rating} />
        </label>
        <label htmlFor="surname" className={css['employee-form-label']}>
          Comment
          <input name="comment" required defaultValue={selectedFeedback && selectedFeedback.comment} />
        </label>
        <button type="submit">Submit</button>
      </div>
    </div>
  </AutoForm>
);

export default EmployeeForm;
