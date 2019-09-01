import React from 'react';

import IndexContainer from '../containers/index';

class Index extends React.Component {
  static async getInitialProps() {
    return {};
  }

  render() {
    return (
      <React.Fragment>
        <IndexContainer />
      </React.Fragment>
    );
  }
}

export default Index;
