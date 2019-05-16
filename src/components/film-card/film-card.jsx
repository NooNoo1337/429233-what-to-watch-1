import React, {Component} from 'react';
import PropTypes from 'prop-types';

import VideoPlayer from '../video-player/video-player.jsx';

export default class FilmCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVideoPlaying: false,
      timeoutID: null,
    };
  }

  render() {
    const {film, onMouseEnter, onMouseLeave, onCardTitleClick} = this.props;
    const defaultPoster = `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`;

    return (
      <article className="small-movie-card catalog__movies-card" data-film-id={film.id} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        <VideoPlayer
          posterSrc={defaultPoster}
          videoSrc={film.preview}
          isVideoPlaying={this.state.isVideoPlaying}
        />
        <h3 className="small-movie-card__title">
          <a className="small-movie-card__link" onClick={onCardTitleClick}>
            {film.title}
          </a>
        </h3>
      </article>
    );
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
  isCardActive: PropTypes.bool
};

