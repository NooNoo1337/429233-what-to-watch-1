import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import FilmCard from '../../components/film-card/film-card.jsx';
import withVideoPlayer from '../../hocs/with-video-player/with-video-player.js';

const FilCardWithVideoPlayer = withVideoPlayer(FilmCard);

export default class FilmsList extends PureComponent {
  render() {
    const {films, activeCardId, onMouseEnter, onMouseLeave, onCardTitleClick} = this.props;
    return (
      <div className="catalog__movies-list">
        {films.map((film) =>
          <FilCardWithVideoPlayer
            film={film}
            key={film.id}
            onCardTitleClick={onCardTitleClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            isCardActive={activeCardId === film.id}
          />)}
      </div>
    );
  }
}

FilmsList.propTypes = {
  films: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    preview: PropTypes.string
  })).isRequired,
  activeCardId: PropTypes.number,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  onCardTitleClick: PropTypes.func,
};
