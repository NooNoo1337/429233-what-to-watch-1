import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import FilmCard from '../../components/film-card/film-card.jsx';

export default class FilmsList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activeFilmCard: ``,
    };
  }

  render() {
    const {films, onCardTitleClick} = this.props;
    const filmElement = films.map((film) =>
      <FilmCard
        film={film}
        key={film.id}
        onCardTitleClick={onCardTitleClick}
        onPlayButtonClick={(evt) => this._handlePlayButtonClick(evt)}
        onCardHover={(evt) => this._handleCardHover(evt)}
      />);

    return (
      <div className="catalog__movies-list">
        {filmElement}
      </div>
    );
  }

  _handleCardHover(evt) {
    this.setState({
      activeFilmCard: evt.target.dataset.filmId
    });
  }

  _handlePlayButtonClick(evt) {
    return evt.target.dataset.filmId;
  }
}

FilmsList.propTypes = {
  films: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string
  })).isRequired,
  onCardTitleClick: PropTypes.func,
};
