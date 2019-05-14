import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

export default class VideoPlayer extends PureComponent {
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
      onMouseEnter,
      onMouseLeave
    } = this.props;
    return (
      <video
        className="small-movie-card__image"
        poster={posterSrc}
        muted={isSoundOff}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
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


VideoPlayer.propTypes = {
  posterSrc: PropTypes.string,
  videoSrc: PropTypes.string,
  videoFormat: PropTypes.string,
  isSoundOff: PropTypes.bool,
  isVideoPlaying: PropTypes.bool,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func
};
