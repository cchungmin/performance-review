import * as React from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';

import css from '../styles.scss';
import {
  fetchEmployeeData as fetchEmployeeDataAction,
  fetchAllEmployeeData as fetchAllEmployeeDataAction,
  addEmployee as addEmployeeAction,
  deleteEmployee as deleteEmployeeAction,
  updateEmployee as updateEmployeeAction,
} from '../actions/employee';
import {
  addFeedback as addFeedbackAction,
  updateFeedback as updateFeedbackAction,
  fetchFeedbackData as fetchFeedbackDataAction,
} from '../actions/feedback';
import EmployeeInfo from '../components/index';
import EmployeeForm from '../components/EmployeeForm';
import ReviewForm from '../components/ReviewForm';
import EmployeeManagement from '../components/EmployeeManagement';
import ReviewManagement from '../components/ReviewManagement';

interface Employee {
  surname: string;
  forename: string;
  _id: string;
  startDate: string;
  admin: boolean,
  position: string,
  department: string,
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
  employeeData: Employee,
  feedbackData: Array<Feedback>,
  fetchEmployeeData: Function,
  fetchAllEmployeeData: Function,
  fetchFeedbackData: Function,
  addFeedback: Function,
  updateFeedback: Function,
  addEmployee: Function,
  deleteEmployee: Function,
  updateEmployee: Function,
}

class Index extends React.Component<Props> {
  static defaultProps = {
    allEmployeeData: [],
    fetchEmployeeData: () => {},
    fetchAllEmployeeData: () => {},
    fetchFeedbackData: () => {},
    addFeedback: () => {},
    updateFeedback: () => {},
    addEmployee: () => {},
    deleteEmployee: () => {},
    updateEmployee: () => {},
  }

  state = {
    selectedFilter: '',
    selectedTarget: null,
    selectedFeedback: null,
    fetching: true,
    selectedEmployee: '',
    employeePanel: false,
    feedbackPanel: false,
    newEmployee: {},
    newFeedback: {},
    adding: false,
    updating: false,
    updatingFeedback: false,
  }

  componentDidMount() {
    this.fetch();
  }

  onRadioInputChange = (ev: MouseEvent) => {
    if (!(ev.target instanceof HTMLInputElement)) return;
    this.setState({ selectedFilter: ev.target.value });
  }

  onSelectReviewerChange = (ev: React.ChangeEvent<HTMLSelectElement>) => {
    if (!(ev.target instanceof HTMLSelectElement)) return;
    this.setState({ selectedEmployee: ev.target.value });
  }

  reset = () => {
    this.setState({
      selectedTarget: null,
      newEmployee: {},
    });
  }

  resetFeedback = () => {
    this.setState({
      selectedFeedback: null,
      newFeedback: {},
    });
  }

  onAddEmployeeClick = (ev: any) => {
    if (!(ev.target instanceof HTMLButtonElement)) return;
    const { adding } = this.state;
    this.reset();
    this.setState({ adding: !adding });
    this.toggleEmployeePanel();
  }

  toggleEmployeePanel = () => {
    const { employeePanel } = this.state;
    this.setState({ employeePanel: !employeePanel });
  }

  toggleFeedbackPanel = () => {
    const { feedbackPanel } = this.state;
    this.setState({ feedbackPanel: !feedbackPanel });
  }

  assignFeedback = (ev: MouseEvent) => {
    const { selectedEmployee } = this.state;
    if (
      !(ev.target instanceof HTMLButtonElement) ||
      selectedEmployee === ''
    ) return;
    const { value } = ev.target;
    const { addFeedback, employeeData } = this.props;
    addFeedback({
      assigner: employeeData._id,
      assignee: selectedEmployee,
      target: value,
    });
    this.setState({ selectedEmployee: '' });
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

  updateEmployee = (ev: MouseEvent) => {
    if (!(ev.target instanceof HTMLButtonElement)) return;
    const { value } = ev.target;
    const { allEmployeeData } = this.props;
    const { employeePanel, updating } = this.state;
    const selectedTarget = allEmployeeData.find(el => el._id === value);
    this.setState({
      selectedTarget: employeePanel ? null : selectedTarget,
      updating: !updating,
    });
    this.toggleEmployeePanel();
  }

  onReviewFormChange = (ev: MouseEvent, name: string, data: string) => {
    if (!(ev.target instanceof HTMLInputElement)) return;
    const { selectedFeedback } = this.state;
    this.setState({ selectedFeedback: { ...selectedFeedback, [name]: data, id: selectedFeedback._id }});
  }

  onReviewFormSubmit = (ev: MouseEvent) => {
    const { updateFeedback } = this.props;
    const { selectedFeedback } = this.state;
    updateFeedback(selectedFeedback);
    this.toggleFeedbackPanel();
    this.resetFeedback();
    this.setState({
      updatingFeedback: false,
    });
  }

  deleteEmployee = (ev: MouseEvent) => {
    if (!(ev.target instanceof HTMLButtonElement)) return;
    const { deleteEmployee } = this.props;
    const { value } = ev.target;
    deleteEmployee(value);
  }

  onFormChange = (ev: MouseEvent, name: string, data: string) => {
    if (!(ev.target instanceof HTMLInputElement)) return;
    const { newEmployee, updating, selectedTarget } = this.state;
    const target = updating ? selectedTarget : newEmployee;
    if (updating) {
      this.setState({ selectedTarget: { ...target, [name]: data, _id: selectedTarget._id }});
    } else {
      this.setState({ newEmployee: { ...target, [name]: data }});
    }
  }

  onFormSubmit = (ev: MouseEvent) => {
    const { addEmployee, updateEmployee } = this.props;
    const { newEmployee, updating, adding, selectedTarget } = this.state;
    if (adding) addEmployee(newEmployee);
    if (updating) updateEmployee(selectedTarget);
    this.toggleEmployeePanel();
    this.reset();
    this.setState({
      adding: false,
      updating: false,
    });
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
      allEmployeeData,
      feedbackData,
    } = this.props;
    const {
      selectedTarget,
      selectedFeedback,
      fetching,
      employeePanel,
      feedbackPanel,
      adding,
      updating,
      updatingFeedback,
    } = this.state;
    return (
      <main className={css['main-container']}>
        {
          (fetching || !allEmployeeData) ? (
            <h1 className={css.loading}>
              Loading admin data...
            </h1>
          ) : (
            <React.Fragment>
              <header>
                <Link href="/">
                  <a>
                    Employee view
                  </a>
                </Link>
              </header>
              <h1>Profile</h1>
              <EmployeeInfo
                data={employeeData}
              />
              <EmployeeManagement
                allEmployeeData={allEmployeeData}
                assignFeedback={this.assignFeedback}
                onSelectReviewerChange={this.onSelectReviewerChange}
                updateEmployee={this.updateEmployee}
                deleteEmployee={this.deleteEmployee}
                addEmployee={this.onAddEmployeeClick}
                updating={updating}
                adding={adding}
              />
              {
                employeePanel && (
                  <EmployeeForm
                    onFormChange={this.onFormChange}
                    onFormSubmit={this.onFormSubmit}
                    selectedTarget={selectedTarget}
                  />
                )
              }
              <ReviewManagement
                feedbackData={feedbackData}
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

export default connect(({
  employeeData,
  allEmployeeData,
  feedbackData,
}) => ({
  employeeData,
  allEmployeeData,
  feedbackData,
}), {
  fetchEmployeeData: fetchEmployeeDataAction,
  fetchAllEmployeeData: fetchAllEmployeeDataAction,
  fetchFeedbackData: fetchFeedbackDataAction,
  addFeedback: addFeedbackAction,
  updateFeedback: updateFeedbackAction,
  addEmployee: addEmployeeAction,
  deleteEmployee: deleteEmployeeAction,
  updateEmployee: updateEmployeeAction,
})(Index);
