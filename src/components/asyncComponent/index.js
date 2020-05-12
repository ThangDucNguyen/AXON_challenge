import React, { PureComponent, Fragment } from 'react';
import LoadingPage from 'components/LoadingPage';

export default (loader, collection) => {
  return (
    class AsyncComponent extends PureComponent {
      constructor(props, context) {
        super(props, context);
        this.Component = null;
        this.state = {
          Component: AsyncComponent.Component,
        };
      }

      componentDidMount() {
        if (!this.state.Component) {
          loader().then((module) => {
            const Component = module.default;
            AsyncComponent.Component = Component;
            this.setState({ Component });
          });
        }
      }

      render() {
        const Component = this.state.Component
          ? (<this.state.Component {...this.props} {...collection} />)
          : (<LoadingPage />);

        return (
          <Fragment>
            {Component}
          </Fragment>
        );
      }
    }
  );
};
