import * as React from 'react';
import {Subtract} from 'utility-types';
import {SignInData} from "../../types";

interface InjectedProps {
  handleFieldChange: (evt) => void,
  formReset: (evt) => void,
  data: Object,
}

interface State {
  data: SignInData
  initialState: any
}

const withFormData = (initialState) => (WrappedComponent) => {
  type P = React.ComponentProps<typeof WrappedComponent>;
  type T = Subtract<P, InjectedProps>;

  class WithFormData extends React.PureComponent<T, State> {
    constructor(props) {
      super(props);
      this.state = {
        data: initialState,
        initialState: initialState,
      };

      this.handleFieldChange = this.handleFieldChange.bind(this);
      this.formReset = this.formReset.bind(this);
    }

    handleFieldChange(evt) {
      const {name, value} = evt.currentTarget;
      this.setState(({data}) => ({
        data: Object.assign({}, data, {
          [name]: value
        })
      }));
    }

    formReset() {
      this.setState({
        data: this.state.initialState
      });
    }


    render() {
      return <WrappedComponent
        {...this.props}
        handleFieldChange={this.handleFieldChange}
        formReset={this.formReset}
        fetchData={this.state.data}
      />;
    }
  }

  return WithFormData;
};

export default withFormData;
