import * as React from 'react';

interface Props {
  posterSrc: string
  videoSrc: string,
  videoFormat: string,
  isSoundOff: boolean,
  isVideoPlaying: boolean,
}

export default class VideoPlayer extends React.PureComponent<Props, null> {
  private videoRef: React.RefObject<HTMLVideoElement>;

  constructor(props) {
    super(props);
    this.videoRef = React.createRef();
  }

  componentDidUpdate() {
    const video = this.videoRef.current;
    const playPromise = video.play();

    if (playPromise !== undefined && playPromise !== null) {
      playPromise
        .then(() => {
          if (!this.props.isVideoPlaying) {
            video.load();
          }
        });
    }
  }

  render() {
    const {
      posterSrc,
      videoSrc,
      videoFormat = `video/mp4`,
      isSoundOff = true,
    } = this.props;
    return (
      <video
        className="small-movie-card__image"
        poster={posterSrc}
        muted={isSoundOff}
        ref={this.videoRef}
        width="280"
        height="175"
      >
        <source src={videoSrc} type={videoFormat}/>
      </video>
    );
  }
}
