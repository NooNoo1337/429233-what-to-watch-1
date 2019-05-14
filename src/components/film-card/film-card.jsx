import React from 'react';
import PropTypes from 'prop-types';


const FilmCard = ({film, onCardTitleClick, onMouseEnter, onMouseLeave, onPlayButtonClick}) => {
  return (
    <article className="small-movie-card catalog__movies-card">
      <button className="small-movie-card__play-btn" type="button" data-film-id={film.id} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} onClick={onPlayButtonClick}>Play</button>
      <div className="small-movie-card__image">
        <img src="img/fantastic-beasts-the-crimes-of-grindelwald.jpg" alt="Fantastic Beasts: The Crimes of Grindelwald" width="280" height="175"/>
      </div>
      <h3 className="small-movie-card__title">
        <a className="small-movie-card__link" onClick={onCardTitleClick}>
          {film.title}
        </a>
      </h3>
    </article>
  );
};

FilmCard.propTypes = {
  film: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.oneOf([`Fantastic Beasts`, `Bohemian Rhapsody`, `Macbeth`, `Aviator`, `Filth`]),
    preview: PropTypes.string
  }),
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  onCardTitleClick: PropTypes.func,
  onPlayButtonClick: PropTypes.func
};

export default FilmCard;
