import React, {PureComponent} from 'react';
import PropTypes from "prop-types";
import {Link} from 'react-router-dom';

// Components
import GenreList from '../../components/genre-list/genre-list.jsx';
import FilmsList from '../../components/films-list/films-list.jsx';

// HOCS
import withActiveCard from '../../hocs/with-active-card/with-active-card.js';

// Wrapped Components
const FilmListWithActiveCard = withActiveCard(FilmsList);

class Main extends PureComponent {
  render() {
    const {
      films,
      genres,
      activeGenre,
      accountData,
      onGenreChange,
      onCardTitleClick,
    } = this.props;

    return (
      <>
        <section className="movie-card">
          <div className="movie-card__bg">
            <img src="img/bg-the-grand-budapest-hotel.jpg" alt="The Grand Budapest Hotel"/>
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header movie-card__head">
            <div className="logo">
              <Link className="logo__link" to="/">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </Link>
            </div>

            <div className="user-block">
              {
                accountData !== null ?
                  (
                    <Link to="/favourites">
                      <div className="user-block__avatar">
                        <img src="img/avatar.jpg" alt="User avatar" width="63" height="63"/>
                      </div>
                    </Link>
                  ) :
                  (
                    <div className="user-block">
                      <Link className="user-block__link" to="/login">
                        Sign in
                      </Link>
                    </div>
                  )
              }
            </div>
          </header>

          <div className="movie-card__wrap">
            <div className="movie-card__info">
              <div className="movie-card__poster">
                <img src="img/the-grand-budapest-hotel-poster.jpg" alt="The Grand Budapest Hotel poster" width="218" height="327"/>
              </div>

              <div className="movie-card__desc">
                <h2 className="movie-card__title">The Grand Budapest Hotel</h2>
                <p className="movie-card__meta">
                  <span className="movie-card__genre">Drama</span>
                  <span className="movie-card__year">2014</span>
                </p>

                <div className="movie-card__buttons">
                  <button className="btn btn--play movie-card__button" type="button">
                    <svg viewBox="0 0 19 19" width="19" height="19">
                      <use xlinkHref="#play-s"></use>
                    </svg>
                    <span>Play</span>
                  </button>
                  <button className="btn btn--list movie-card__button" type="button">
                    <svg viewBox="0 0 19 20" width="19" height="20">
                      <use xlinkHref="#add"></use>
                    </svg>
                    <span>My list</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="page-content">
          <section className="catalog">
            <h2 className="catalog__title visually-hidden">Catalog</h2>
            <GenreList genres={genres} activeGenre={activeGenre} onGenreChange={onGenreChange} />
            <FilmListWithActiveCard films={films} onCardTitleClick={onCardTitleClick}/>
            <div className="catalog__more">
              <button className="catalog__button" type="button">Show more</button>
            </div>
          </section>

          <footer className="page-footer">
            <div className="logo">
              <a className="logo__link logo__link--light">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </a>
            </div>

            <div className="copyright">
              <p>© 2019 What to watch Ltd.</p>
            </div>
          </footer>
        </div>
      </>
    );
  }
}

Main.propTypes = {
  films: PropTypes.arrayOf(PropTypes.shape({
    'id': PropTypes.number,
    'background_color': PropTypes.string,
    'background_image': PropTypes.string,
    'description': PropTypes.string,
    'director': PropTypes.string,
    'genre': PropTypes.string,
    'is_favorite': PropTypes.bool,
    'name': PropTypes.string,
    'poster_image': PropTypes.string,
    'preview_image': PropTypes.string,
    'preview_video_link': PropTypes.string,
    'rating': PropTypes.number,
    'released': PropTypes.number,
    'run_time': PropTypes.number,
    'scores_count': PropTypes.number,
    'starring': PropTypes.array,
    'video_link': PropTypes.string,
  })).isRequired,
  accountData: PropTypes.shape(({
    'id': PropTypes.number,
    'email': PropTypes.string,
    'name': PropTypes.string,
    'avatar_url': PropTypes.string,
  })),
  genres: PropTypes.array.isRequired,
  activeGenre: PropTypes.string,
  isAuthenticationRequired: PropTypes.bool,
  isUserAuthenticated: PropTypes.bool,
  onCardTitleClick: PropTypes.func,
  onGenreChange: PropTypes.func,
  onSignInClick: PropTypes.func,
  onSignInSubmit: PropTypes.func,
};

export default Main;
