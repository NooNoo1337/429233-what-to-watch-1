import * as React from 'react';
import {Subtract} from 'utility-types';


interface InjectedProps {
  progressInPercents: number,
  onStartButtonClick: () => void,
  isPlaying: boolean,
}

interface State {
  progressInSecond: number,
  isPlaying: boolean,
  interval: null | number,
  percent: null | number,
  progressInPercents: null | number,
}

const withVideoProgress = (WrappedComponent) => {
  type P = React.ComponentProps<typeof WrappedComponent>;
  type T = Subtract<P, InjectedProps>;

  class WithVideoProgress extends React.PureComponent<T, State> {
    constructor(props) {
      super(props);
      this.state = {
        progressInSecond: 0,
        isPlaying: false,
        interval: null,
        percent: null,
        progressInPercents: null,
      };

      this.onStartButtonClick = this.onStartButtonClick.bind(this);
      this.activatePlayer = this.activatePlayer.bind(this);
      this.deactivatePlayer = this.deactivatePlayer.bind(this);
    }

    componentDidUpdate(prevProps, prevState): void {
      if(prevState.videoProgress >= 100) {
        this.deactivatePlayer();
      }

      this.setState({
        percent: 1 / ((this.props.runTime * 60) / 100),
      });
    }

    activatePlayer() {
      const intervalId = window.setInterval(() =>
        this.setState({
          progressInSecond: this.state.progressInSecond + 1,
          progressInPercents: this.state.progressInPercents + this.state.percent
        }), 1000);


      this.setState({
        interval: intervalId
      });
    }

    deactivatePlayer() {
      clearInterval(this.state.interval);
    }


    onStartButtonClick() {
      if (this.state.isPlaying) {
        this.deactivatePlayer();
      } else {
        this.activatePlayer();
      }

      this.setState({
        isPlaying: !this.state.isPlaying,
      });
    }

    render() {
      const {
        progressInPercents,
        progressInSecond,
        isPlaying
      } = this.state;

      return <WrappedComponent
        {...this.props}
        progressInPercents={progressInPercents}
        onStartButtonClick={this.onStartButtonClick}
        isPlaying={isPlaying}
        progressInSecond={progressInSecond}
      />;
    }
  }

  return WithVideoProgress;
};

export default withVideoProgress;
