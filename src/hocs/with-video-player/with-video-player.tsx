import * as React from 'react';
import {Subtract} from 'utility-types';


interface InjectedProps {
  isCardActive: boolean,
}

interface State {
  isVideoPlaying: boolean,
  timeoutID: any, // TODO: remove any, because it can be number | null | function that returns number (?)
}

const withVideoPlayer = (WrappedComponent) => {
  type P = React.ComponentProps<typeof WrappedComponent>;
  type T = Subtract<P, InjectedProps>;

  class WithVideoPlayer extends React.PureComponent<T, State> {
    constructor(props) {
      super(props);
      this.state = {
        isVideoPlaying: false,
        timeoutID: null,
      };
    }

    componentDidUpdate(prevProps) {
      const {isCardActive} = this.props;

      if (isCardActive !== prevProps.isCardActive) {
        if (isCardActive) {
          this.activatePlayer();
        } else {
          this.deactivatePlayer();
        }
      }
    }

    activatePlayer() {
      const timerDelay = 1000;

      const timeout = setTimeout(() => {
        this.setState({isVideoPlaying: true});
      }, timerDelay);

      this.setState({
        timeoutID: timeout
      });

    }

    deactivatePlayer() {
      clearTimeout(this.state.timeoutID);
      this.setState({
        isVideoPlaying: false,
        timeoutID: null
      });
    }

    render() {
      return <WrappedComponent
        {...this.props}
        isVideoPlaying={this.state.isVideoPlaying}
      />;
    }
  }

  return WithVideoPlayer;
};

export default withVideoPlayer;
