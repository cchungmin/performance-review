import React from 'react';
import Link from 'next/link';
import { connect } from 'react-redux';

import css from '../styles.scss';
import {
  fetchEmployeeData as fetchEmployeeDataAction,
  fetchAllEmployeeData as fetchAllEmployeeDataAction,
} from '../actions/employee';
import {
  updateFeedback as updateFeedbackAction,
  fetchFeedbackData as fetchFeedbackDataAction,
} from '../actions/feedback';
import EmployeeInfo from '../components/index';
import ReviewForm from '../components/ReviewForm';
import ReviewBoard from '../components/ReviewBoard';

interface Employee {
  surname: string;
  forename: string;
  _id: string;
  startDate: string;
  admin: boolean,
}

interface Feedback {
  _id: string;
  status: string,
  assignee: string,
  assigner: string,
  target: string,
  rating: string,
  comment: string,
}

interface Props {
  allEmployeeData: Array<Employee>;
  fetchEmployeeData: Function,
  employeeData: Employee,
  feedbackData: Array<Feedback>,
  updateFeedback: Function,
  fetchAllEmployeeData: Function,
  fetchFeedbackData: Function,
}

class Index extends React.Component<Props> {
  static defaultProps = {
    employeeData: [],
    allEmployeeData: [],
    fetchEmployeeData: () => {},
    fetchAllEmployeeData: () => {},
    fetchFeedbackData: () => {},
    feedbackData: [],
    updateFeedback: () => {},
  }

  state = {
    fetching: true,
    feedbackPanel: false,
    selectedFeedback: null,
    updatingFeedback: false,
    newFeedback: {},
  }

  componentDidMount() {
    this.fetch();
  }

  toggleFeedbackPanel = () => {
    const { feedbackPanel } = this.state;
    this.setState({ feedbackPanel: !feedbackPanel });
  }

  updateFeedback = (ev: MouseEvent) => {
    if (!(ev.target instanceof HTMLButtonElement)) return;
    const { value } = ev.target;
    const { feedbackData } = this.props;
    const { feedbackPanel, updatingFeedback } = this.state;
    const selectedFeedback = feedbackData.find(el => el._id === value);
    this.setState({
      selectedFeedback: feedbackPanel ? null : selectedFeedback,
      updatingFeedback: !updatingFeedback,
    });
    this.toggleFeedbackPanel();
  }

  onReviewFormChange = (ev: MouseEvent, name: string, data: string) => {
    if (!(ev.target instanceof HTMLInputElement)) return;
    const { selectedFeedback } = this.state;
    this.setState({ selectedFeedback: { ...selectedFeedback, [name]: data, id: selectedFeedback._id }});
  }

  resetFeedback = () => {
    this.setState({
      selectedFeedback: null,
      newFeedback: {},
      updatingFeedback: false,
    });
  }

  onReviewFormSubmit = (ev: MouseEvent) => {
    const { updateFeedback } = this.props;
    const { selectedFeedback, updatingFeedback } = this.state;
    if (updatingFeedback) updateFeedback(selectedFeedback);
    this.toggleFeedbackPanel();
    this.resetFeedback();
  }

  getEmployeeName = (targetId: string) => {
    const { allEmployeeData } = this.props;
    const target = allEmployeeData.find(el => el._id === targetId);
    if (!target) return null;
    return `${target.forename} ${target.surname}`;
  }

  async fetch() {
    const { fetchAllEmployeeData, fetchEmployeeData, fetchFeedbackData } = this.props;
    this.setState({ fetching: true });
    await fetchEmployeeData();
    await fetchAllEmployeeData();
    await fetchFeedbackData();
    this.setState({ fetching: false });
  }

  render() {
    const {
      employeeData,
      feedbackData,
    } = this.props;
    const {
      selectedFeedback,
      fetching,
      feedbackPanel,
      updatingFeedback,
    } = this.state;
    return (
      <main className={css['main-container']}>
        {
          (fetching || !employeeData) ? (
            <h1 className={css.loading}>
              Loading employee data...
            </h1>
          ) : (
            <React.Fragment>
              {
                employeeData.admin && (
                  <header>
                    <Link href="/admin">
                      <a>
                        Admin view
                      </a>
                    </Link>
                  </header>
                )
              }
              <EmployeeInfo
                data={employeeData}
              />
              <ReviewBoard
                feedbackData={feedbackData.filter(el =>
                  el.target !== employeeData._id &&
                  el.assignee === employeeData._id
                )}
                updateFeedback={this.updateFeedback}
                updatingFeedback={updatingFeedback}
                getEmployeeName={this.getEmployeeName}
              />
              {
                feedbackPanel && (
                  <ReviewForm
                    onReviewFormChange={this.onReviewFormChange}
                    onReviewFormSubmit={this.onReviewFormSubmit}
                    selectedFeedback={selectedFeedback}
                  />
                )
              }
            </React.Fragment>
          )
        }
      </main>
    );
  }
}

export default connect(({ employeeData, allEmployeeData, feedbackData }) => ({
  employeeData,
  allEmployeeData,
  feedbackData,
}), {
  fetchEmployeeData: fetchEmployeeDataAction,
  fetchAllEmployeeData: fetchAllEmployeeDataAction,
  fetchFeedbackData: fetchFeedbackDataAction,
  updateFeedback: updateFeedbackAction,
})(Index);
