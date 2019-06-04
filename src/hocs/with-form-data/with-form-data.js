import React, {Component} from 'react';
import PropTypes from 'prop-types';

const withFormData = (initialState) => (WrappedComponent) => {
  class WithFormData extends Component {
    constructor(props) {
      super(props);

      this.state = {
        data: initialState,
      };

      this.handleInput = this.handleInput.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() {
      return <WrappedComponent
        {...this.props}
        handleInput={this.handleInput}
        handleSubmit={this.handleSubmit}
      />;
    }

    handleInput(evt) {
      const {type, value} = evt.currentTarget;
      this.setState(({data}) => ({
        data: Object.assign({}, data, {
          [type]: value
        })
      }));
    }

    handleSubmit(evt) {
      this.props.onSignInSubmit(evt, this.state.data);
    }
  }

  WithFormData.propTypes = {
    onSignInSubmit: PropTypes.func,
  };

  return WithFormData;
};

export default withFormData;
