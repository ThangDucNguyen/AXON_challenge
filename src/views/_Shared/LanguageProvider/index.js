import React, { PureComponent } from 'react';
import { IntlProvider } from 'react-intl';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { localeSelector } from 'reduxResources/locale';
import Proptypes from 'prop-types';

class LanguageProvider extends PureComponent {
  static propTypes = {
    children: Proptypes.object.isRequired,
    locale: Proptypes.object.isRequired,
  }
  render() {
    const { locale, children } = this.props;
    return (
      <IntlProvider
        locale={locale}
        key={locale}
      >
        {React.Children.only(children)}
      </IntlProvider>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  locale: localeSelector,
});
export default connect(mapStateToProps)(LanguageProvider);
