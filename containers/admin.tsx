import * as React from 'react';
import { connect } from 'react-redux';

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
  fetchFeedbackData as fetchFeedbackDataAction,
} from '../actions/feedback';
import EmployeeInfo from '../components/index';
import EmployeeForm from '../components/EmployeeForm';
import EmployeeManagement from '../components/EmployeeManagement';

interface Employee {
  surname: string;
  forename: string;
  _id: string;
  startDate: string;
  admin: boolean,
  position: string,
  department: string,
  updating: false,
  deleted: false,
}

interface Props {
  allEmployeeData: Array<Employee>;
  employeeData: Employee,
  feedbackData: Array<Object>,
  fetchEmployeeData: Function,
  fetchAllEmployeeData: Function,
  fetchFeedbackData: Function,
  addFeedback: Function,
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
    addEmployee: () => {},
    deleteEmployee: () => {},
    updateEmployee: () => {},
  }

  state = {
    selectedFilter: '',
    selectedTarget: null,
    fetching: true,
    selectedEmployee: '',
    targetEmployee: '',
    employeePanel: false,
    newEmployee: {},
    adding: false,
    updating: false,
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

  onSelectTargetChange = (ev: React.ChangeEvent<HTMLSelectElement>) => {
    if (!(ev.target instanceof HTMLSelectElement)) return;
    this.setState({ targetEmployee: ev.target.value });
  }

  reset = () => {
    this.setState({
      selectedTarget: null,
      newEmployee: {},
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

  assignFeedback = () => {
    const { addFeedback, employeeData } = this.props;
    const { targetEmployee, selectedEmployee } = this.state;
    addFeedback({
      assigner: employeeData._id,
      assignee: selectedEmployee,
      target: targetEmployee,
    });
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
    this.setState({ newEmployee: { ...target, [name]: data, ...updating ? { id: selectedTarget.id } : null }});
  }

  onFormSubmit = (ev: MouseEvent) => {
    const { addEmployee, updateEmployee } = this.props;
    const { newEmployee, updating, adding } = this.state;
    if (adding) addEmployee(newEmployee);
    if (updating) updateEmployee(newEmployee);
    this.toggleEmployeePanel();
    this.reset();
    this.setState({
      adding: false,
      updating: false,
    });
  }

  async fetch() {
    const { fetchAllEmployeeData, fetchEmployeeData, fetchFeedbackData } = this.props;
    this.setState({ fetching: true });
    await fetchEmployeeData('0300');
    await fetchAllEmployeeData();
    await fetchFeedbackData();
    this.setState({ fetching: false });
  }

  render() {
    const { allEmployeeData, employeeData } = this.props;
    const {
      selectedTarget,
      fetching,
      employeePanel,
      adding,
      updating,
    } = this.state;
    return (
      <main className={css['main-container']}>
        {
          (fetching || !allEmployeeData) ? (
            <h1 className={css.loading}>
              Loading employee data...
            </h1>
          ) : (
            <React.Fragment>
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
  addEmployee: addEmployeeAction,
  deleteEmployee: deleteEmployeeAction,
  updateEmployee: updateEmployeeAction,
})(Index);
