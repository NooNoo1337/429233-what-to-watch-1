import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import VideoPlayer from '../video-player/video-player.jsx';

export default class FilmCard extends PureComponent {
  render() {
    const {film, isVideoPlaying, onMouseEnter, onMouseLeave, onCardTitleClick} = this.props;
    const defaultPoster = `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`;

    return (
      <article className="small-movie-card catalog__movies-card" data-film-id={film.id} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        <VideoPlayer
          posterSrc={defaultPoster}
          videoSrc={film.preview}
          isVideoPlaying={isVideoPlaying}
        />
        <h3 className="small-movie-card__title">
          <a className="small-movie-card__link" onClick={onCardTitleClick}>
            {film.title}
          </a>
        </h3>
      </article>
    );
  }
}

FilmCard.propTypes = {
  film: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.oneOf([`Fantastic Beasts`, `Bohemian Rhapsody`, `Macbeth`, `Aviator`, `Filth`]),
    preview: PropTypes.string
  }),
  onCardTitleClick: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  isVideoPlaying: PropTypes.bool
};

