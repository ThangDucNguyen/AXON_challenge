import React, { PureComponent, Fragment } from 'react';
import Proptypes from 'prop-types';

class MainLayout extends PureComponent {
  static propTypes = {
    children: Proptypes.object.isRequired,
  }
  render() {
    return (
      <Fragment>
        {this.props.children}
      </Fragment>
    );
  }
}

export default MainLayout;
