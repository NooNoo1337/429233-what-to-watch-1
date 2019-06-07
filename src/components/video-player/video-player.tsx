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

  componentDidUpdate() {
    const video = this.videoRef.current;
    if (this.props.isVideoPlaying) {
      video.load();
      video.play();
    } else {
      video.load();
    }
  }
}
