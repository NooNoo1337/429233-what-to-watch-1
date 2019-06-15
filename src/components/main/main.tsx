import * as React from 'react';
import {Link} from 'react-router-dom';

// Components
import GenreList from '../../components/genre-list/genre-list';
import FilmsList from '../../components/films-list/films-list';
import ShowMoreButton  from '../show-more-button/show-more-button';

// HOCS
import withActiveCard from '../../hocs/with-active-card/with-active-card';

// Wrapped Components
const FilmListWithActiveCard = withActiveCard(FilmsList);

// Types
import {accountData, Film, SignInData} from "../../types";


interface Props {
  films: Film[],
  genres: string[],
  accountData: accountData,
  activeGenre: string,
  filmsCounter: number,
  filmsToShow: number,
  isAuthenticationRequired: boolean,
  onCardTitleClick: () => void,
  onGenreChange: (evt, genre: string) => void,
  onSignInSubmit: (evt, data: SignInData) => void,
  onFilmsLimitChange: (amount: number) => void,
}

class Main extends React.PureComponent<Props, null> {
  render() {
    const {
      films,
      genres,
      activeGenre,
      filmsCounter,
      filmsToShow,
      accountData,
      onGenreChange,
      onCardTitleClick,
      onFilmsLimitChange
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

            <GenreList
              genres={genres}
              activeGenre={activeGenre}
              onGenreChange={onGenreChange} />

            <FilmListWithActiveCard
              films={films}
              filmsToShow={filmsToShow}
              activeGenre={activeGenre}
              onCardTitleClick={onCardTitleClick}
            />

            <ShowMoreButton
              filmsCounter={filmsCounter}
              filmsToShow={filmsToShow}
              onFilmsLimitChange={onFilmsLimitChange}
            />
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

export default Main;
