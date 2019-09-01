import React from 'react';
import Link from 'next/link';
import { connect } from 'react-redux';

import css from '../styles.scss';
import { fetchEmployeeData as fetchEmployeeDataAction } from '../actions/employee';
import EmployeeInfo from '../components/index';

interface Employee {
  surname: string;
  forename: string;
  id: string;
  startDate: string;
  admin: boolean,
}

interface Props {
  fetchEmployeeData: Function,
  employeeData: Employee,
}

class Index extends React.Component<Props> {
  static defaultProps = {
    employeeData: [],
    fetchEmployeeData: () => {},
  }

  state = {
    selectedFilter: '3h',
    fetching: true,
  }

  componentDidMount() {
    this.fetch();
  }

  async fetch() {
    const { fetchEmployeeData } = this.props;
    this.setState({ fetching: true });
    await fetchEmployeeData();
    this.setState({ fetching: false });
  }

  render() {
    const { employeeData } = this.props;
    const { selectedFilter, fetching } = this.state;
    return (
      <main className={css['main-container']}>
        {
          (fetching || !employeeData) ? (
            <h1 className={css.loading}>
              Loading employee data...
            </h1>
          ) : (
            <React.Fragment>
              <EmployeeInfo
                data={employeeData}
              />
              {
                employeeData.admin && (
                  <Link href="/admin">
                    <a>
                      Switch to Admin
                    </a>
                  </Link>
                )
              }
            </React.Fragment>
          )
        }
      </main>
    );
  }
}

export default connect(({ employeeData }) => ({
  employeeData,
}), {
  fetchEmployeeData: fetchEmployeeDataAction,
})(Index);
