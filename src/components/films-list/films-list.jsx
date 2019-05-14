import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import FilmCard from '../../components/film-card/film-card.jsx';

export default class FilmsList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activeFilmCard: ``,
    };

    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  render() {
    const {films, onCardTitleClick} = this.props;
    const filmElement = films.map((film) =>
      <FilmCard
        film={film}
        key={film.id}
        onCardTitleClick={onCardTitleClick}
        onPlayButtonClick={this.handlePlayButtonClick}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      />);

    return (
      <div className="catalog__movies-list">
        {filmElement}
      </div>
    );
  }

  handleMouseEnter(evt) {
    this.setState({
      activeFilmCard: evt.target.dataset.filmId
    });
  }

  handleMouseLeave() {
    this.setState({
      activeFilmCard: ``
    });
  }

  handlePlayButtonClick(evt) {
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
