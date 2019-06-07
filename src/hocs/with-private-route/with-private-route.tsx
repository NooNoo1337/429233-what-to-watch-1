import * as React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {Subtract} from 'utility-types';
import {accountData} from '../../types';

interface InjectedProps {
  accountData: accountData
}

const withPrivateRoute = (WrappedComponent) => {
  type P = React.ComponentProps<typeof WrappedComponent>;
  type T = Subtract<P, InjectedProps>;

  class WithPrivateRoute extends React.PureComponent<T, null> {
    constructor(props) {
      super(props);
    }

    render() {
      if (this.props.accountData === null) {
        return <Redirect to="/login"/>;
      }

      return <WrappedComponent { ...this.props }/>;
    }
  }

  const mapStateToProps = (state) => {
    return {
      accountData: state[`USER`].accountData
    };
  };

  return connect(mapStateToProps)(WithPrivateRoute);
};

export default withPrivateRoute;
