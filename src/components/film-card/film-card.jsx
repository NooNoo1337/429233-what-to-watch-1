import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import VideoPlayer from '../video-player/video-player.jsx';

export default class FilmCard extends PureComponent {
  render() {
    const {film, isVideoPlaying, onMouseEnter, onMouseLeave, onCardTitleClick} = this.props;
    return (
      <article className="small-movie-card catalog__movies-card" data-film-id={film.id} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        <VideoPlayer
          posterSrc={film.preview_image}
          videoSrc={film.preview_video_link}
          isVideoPlaying={isVideoPlaying}
        />
        <h3 className="small-movie-card__title">
          <a className="small-movie-card__link" onClick={onCardTitleClick}>
            {film.name}
          </a>
        </h3>
      </article>
    );
  }
}

FilmCard.propTypes = {
  film: PropTypes.shape({
    'id': PropTypes.number,
    'name': PropTypes.string,
    'preview_image': PropTypes.string,
    'preview_video_link': PropTypes.string,
  }).isRequired,
  onCardTitleClick: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  isVideoPlaying: PropTypes.bool
};

