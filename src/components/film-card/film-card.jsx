import React, {Component} from 'react';
import PropTypes from 'prop-types';

import VideoPlayer from '../video-player/video-player.jsx';

export default class FilmCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVideoPlaying: false,
      timeoutId: 0,
    };
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  render() {
    const {film, onCardMouseEnter, onCardTitleClick} = this.props;
    const defaultPoster = `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`;

    return (
      <article className="small-movie-card catalog__movies-card" data-film-id={film.id} onMouseEnter={onCardMouseEnter}>
        <VideoPlayer
          posterSrc={defaultPoster}
          videoSrc={film.preview}
          isVideoPlaying={this.state.isVideoPlaying}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
        />
        <h3 className="small-movie-card__title">
          <a className="small-movie-card__link" onClick={onCardTitleClick}>
            {film.title}
          </a>
        </h3>
      </article>
    );
  }

  handleMouseEnter() {
    const id = setTimeout(() => {
      this.setState({
        isVideoPlaying: true,
      });
    }, 1000);

    this.setState({
      timeoutId: id,
    });
  }

  handleMouseLeave() {
    this.setState({
      isVideoPlaying: false,
    });

    clearTimeout(this.state.timeoutId);
  }
}

FilmCard.propTypes = {
  film: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.oneOf([`Fantastic Beasts`, `Bohemian Rhapsody`, `Macbeth`, `Aviator`, `Filth`]),
    preview: PropTypes.string
  }),
  onCardMouseEnter: PropTypes.func,
  onCardTitleClick: PropTypes.func,
};

