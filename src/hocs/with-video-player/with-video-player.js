import React, {Component} from 'react';
import PropTypes from 'prop-types';

const withVideoPlayer = (WrappedComponent) => {
  class WithVideoPlayer extends Component {
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

      const timeoutId = setTimeout(() => {
        this.setState({
          isVideoPlaying: true,
        });
      }, timerDelay);
      this.setState({
        timeoutID: timeoutId
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

  WithVideoPlayer.propTypes = {
    isCardActive: PropTypes.bool,
  };

  return WithVideoPlayer;
};

export default withVideoPlayer;
