import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import FilmCard from '../../components/film-card/film-card.jsx';

export default class FilmsList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activeFilmCard: ``,
    };
    this.handleCardMouseEnter = this.handleCardMouseEnter.bind(this);
  }

  render() {
    const {films, onCardTitleClick} = this.props;
    return (
      <div className="catalog__movies-list">
        {films.map((film) =>
          <FilmCard
            film={film}
            key={film.id}
            onCardTitleClick={onCardTitleClick}
            onCardMouseEnter={this.handleCardMouseEnter}
          />)}
      </div>
    );
  }

  handleCardMouseEnter(evt) {
    return evt.target.dataset.filmId;
  }
}

FilmsList.propTypes = {
  films: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    preview: PropTypes.string
  })).isRequired,
  onCardTitleClick: PropTypes.func,
};
