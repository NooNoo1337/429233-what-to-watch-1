import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import FilmCard from '../../components/film-card/film-card.jsx';

export default class FilmsList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activeCardId: null,
    };
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
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
            onMouseEnter={this.handleMouseEnter.bind(this, film.id)}
            onMouseLeave={this.handleMouseLeave}
            isCardActive={this.state.activeCardId === film.id}
          />)}
      </div>
    );
  }

  handleMouseEnter(activeCardId) {
    this.setState({
      activeCardId: (this.state.activeCardId === activeCardId) ? null : activeCardId,
    });
    return activeCardId;
  }

  handleMouseLeave() {
    this.setState({
      activeCardId: null
    });
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
