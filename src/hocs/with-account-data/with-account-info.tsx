import * as React from 'react';
import {connect} from 'react-redux';
import {Subtract} from 'utility-types';
import {accountData} from '../../types';

interface InjectedProps {
  accountData: accountData,
}

const withAccountInfo = (WrappedComponent) => {
  type P = React.ComponentProps<typeof WrappedComponent>;
  type T = Subtract<P, InjectedProps>;

  class WithAccountInfo extends React.PureComponent<T, null> {
    constructor(props) {
      super(props);
    }

    render() {
      const {accountData} = this.props;

      return <WrappedComponent
        {...this.props}
        accountData={accountData}
      />;
    }
  }

  const mapStateToProps = (state, ownProps) => {
    return Object.assign({}, ownProps, {
      accountData: state[`USER`].accountData,
    });
  };

  return connect(mapStateToProps, null)(WithAccountInfo);
};

export default withAccountInfo;
