import * as React from 'react';

interface Props {
  videoSrc: string,
  runTime: number,
  progressInSecond: number,
  progressInPercents: number,
  isPlaying: boolean,
  onStartButtonClick: () => void,
  onPlayerButtonClick: () => void,
}

export default class FullPlayer extends React.PureComponent<Props, null> {
  private videoRef: React.RefObject<HTMLVideoElement>;

  constructor(props) {
    super(props);
    this.videoRef = React.createRef();
    this.openFullScreenMode = this.openFullScreenMode.bind(this)
  }

  componentDidUpdate(prevProps, prevState) {
    const video = this.videoRef.current;

    if(this.props.isPlaying) {
      video.play()
    } else {
      video.pause();
    }
  }

  openFullScreenMode() {
    const video = this.videoRef.current;

    video.requestFullscreen()
  }


  convertTime(totalSeconds): string {
    let secondsNumber = parseInt(totalSeconds, 10);
    const hours   = Math.floor(secondsNumber / 3600);
    const minutes = Math.floor(secondsNumber / 60) % 60;
    const seconds = secondsNumber % 60;

    return [hours,minutes,seconds]
      .map(number => number < 10 ? `0${number}`: number)
      .filter((number, i) => number !== `00` || i > 0)
      .join(`:`)
  }

  render() {
    const {
      videoSrc,
      runTime,
      onStartButtonClick,
      onPlayerButtonClick,
      isPlaying,
      progressInPercents,
      progressInSecond
    } = this.props;


    return (
      <div className="player">
        <video
          src={videoSrc}
          className="player__video"
          ref={this.videoRef}
        >

        </video>

        <button className="player__exit"  type="button" onClick={onPlayerButtonClick}>
          Exit
        </button>

        <div className="player__controls">
          <div className="player__controls-row">
            <div className="player__time">

              <progress
                className="player__progress"
                value={progressInPercents}
                max="100">
                <span className="visually-hidden">Progress bar</span>
              </progress>

              <div className="player__toggler" style={{left: `${progressInPercents}%`}}>Toggler</div>
            </div>
            <div className="player__time-value">
              { this.convertTime((runTime * 60 - progressInSecond)) }
            </div>
          </div>

          <div className="player__controls-row">
            <button type="button" className="player__play" onClick={onStartButtonClick}>
              <svg viewBox="0 0 19 19" width="19" height="19">
                <use xlinkHref={isPlaying ? '#pause' : '#play-s'}></use>
              </svg>
              <span>Play</span>
            </button>
            <div className="player__name">Transpotting</div>

            <button type="button" className="player__full-screen" onClick={this.openFullScreenMode}>
              <svg viewBox="0 0 27 27" width="27" height="27">
                <use xlinkHref="#full-screen"></use>
              </svg>
              <span>Full screen</span>
            </button>
          </div>
        </div>
      </div>
    );
  }
}
