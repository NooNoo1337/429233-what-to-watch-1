import * as React from 'react';
import {Subtract} from 'utility-types';


interface InjectedProps {
  isPlayerActive: boolean
  toggleFullPlayer: () => void,

}

interface State {
  isPlayerActive: boolean
}

const withFullPlayer = (WrappedComponent) => {
  type P = React.ComponentProps<typeof WrappedComponent>;
  type T = Subtract<P, InjectedProps>;

  class WithFullPlayer extends React.PureComponent<T, State> {
    constructor(props) {
      super(props);
      this.state = {
        isPlayerActive: false
      };

      this.toggleFullPlayer = this.toggleFullPlayer.bind(this);
    }

    toggleFullPlayer() {
      this.setState({
        isPlayerActive: !this.state.isPlayerActive
      });
    }

    render() {
      const {isPlayerActive} = this.state;
      return <WrappedComponent
        {...this.props}
        isPlayerActive={isPlayerActive}
        onPlayerButtonClick={this.toggleFullPlayer}
      />;
    }
  }

  return WithFullPlayer;
};

export default withFullPlayer;
