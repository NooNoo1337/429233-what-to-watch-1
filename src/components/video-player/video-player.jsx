import React from 'react';
import PropTypes from 'prop-types';

const VideoPlayer = ({previewSrc, videoSrc, videoFormat = `video/mp4`, isSoundOff = false}) => {
  return (
    <video poster={{previewSrc}} muted={isSoundOff}>
      <source src={{videoSrc}} type={{videoFormat}} />
    </video>
  );
};

VideoPlayer.propTypes = {
  previewSrc: PropTypes.string,
  videoSrc: PropTypes.string,
  videoFormat: PropTypes.string,
  isSoundOff: PropTypes.bool
};

export default VideoPlayer;
