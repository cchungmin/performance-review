import React from 'react';

import AdminContainer from '../containers/admin';

class Index extends React.Component {
  static async getInitialProps() {
    return {};
  }

  render() {
    return (
      <React.Fragment>
        <AdminContainer />
      </React.Fragment>
    );
  }
}

export default Index;
