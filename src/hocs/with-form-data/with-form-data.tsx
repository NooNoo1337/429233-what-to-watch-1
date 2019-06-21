import * as React from 'react';
import {Subtract} from 'utility-types';
import {SignInData} from "../../types";

interface InjectedProps {
  handleFieldChange: (evt) => void,
  data: Object,
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

      this.handleFieldChange = this.handleFieldChange.bind(this);
    }

    handleFieldChange(evt){
      const {name, value} = evt.currentTarget;
      this.setState(({data}) => ({
        data: Object.assign({}, data, {
          [name]: value
        })
      }));
    }

    render() {
      return <WrappedComponent
        {...this.props}
        handleFieldChange={this.handleFieldChange}
        fetchData={this.state.data}
      />;
    }
  }

  return WithFormData;
};

export default withFormData;
