import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class GenreList extends PureComponent {
  render() {
    const {genres, activeGenre, onGenreChange} = this.props;

    return (
      <ul className="catalog__genres-list">
        {genres.map((genre) =>
          <li className={classNames({
            'catalog__genres-item': true,
            'catalog__genres-item--active': activeGenre === genre,
          })} key={`genre-${genre}`}>
            <a href="#" className="catalog__genres-link" onClick={(evt) => onGenreChange(evt, genre)}>{genre}</a>
          </li>
        )}
      </ul>
    );
  }
}

GenreList.propTypes = {
  genres: PropTypes.array.isRequired,
  activeGenre: PropTypes.string,
  onGenreChange: PropTypes.func,
};

export default GenreList;
