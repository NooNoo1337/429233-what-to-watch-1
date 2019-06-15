import * as React from 'react';
import {Subtract} from 'utility-types';

interface InjectedProps {
  activeTab: number,
}

interface State {
  activeTab: number,
}

const withActiveTab = (WrappedComponent) => {
  type P = React.ComponentProps<typeof WrappedComponent>;
  type T = Subtract<P, InjectedProps>;

  class WithActiveTab extends React.PureComponent<T, State> {
    constructor(props) {
      super(props);
      this.state = {
        activeTab: 1,
      };
      this.handleTabClick = this.handleTabClick.bind(this);
    }

    handleTabClick(evt, tabId: number): void {
      evt.preventDefault();

      if (tabId !== this.state.activeTab) {
        this.setState({
          activeTab: tabId,
        });
      }
    }


    render() {
      return <WrappedComponent
        {...this.props}
        activeTab={this.state.activeTab}
        onTabClick={this.handleTabClick}
      />;
    }
  }

  return WithActiveTab;
};

export default withActiveTab;
