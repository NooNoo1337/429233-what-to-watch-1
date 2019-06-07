import * as React from 'react';
import {Subtract} from 'utility-types';
import {SignInData} from "../../types";

interface InjectedProps {
  handleInput: (evt) => void,
  handleSubmit: (evt) => void,
}

interface State {
  data: SignInData
}

const withFormData = (initialState) => (WrappedComponent) => {
  type P = React.ComponentProps<typeof WrappedComponent>;
  type T = Subtract<P, InjectedProps>;

  class WithFormData extends React.PureComponent<T, State> {
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

  return WithFormData;
};

export default withFormData;
