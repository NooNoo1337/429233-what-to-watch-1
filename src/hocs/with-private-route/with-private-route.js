import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

const withPrivateRoute = (WrappedComponent) => {
  class WithPrivateRoute extends Component {
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

  WithPrivateRoute.propTypes = {
    accountData: PropTypes.object,
  };

  const mapStateToProps = (state) => {
    return {
      accountData: state[`USER`].accountData
    };
  };

  return connect(mapStateToProps)(WithPrivateRoute);
};

export default withPrivateRoute;
