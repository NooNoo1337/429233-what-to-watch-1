import * as React from 'react';
import {Link} from 'react-router-dom';

// Components
import GenreList from '../genre-list/genre-list';
import FilmsList from '../films-list/films-list';
import ShowMoreButton from '../show-more-button/show-more-button';
import FullPlayer from '../full-player/full-player';
import Header from '../header/header';

// HOCS
import withActiveCard from '../../hocs/with-active-card/with-active-card';
import withVideoProgress from '../../hocs/with-video-progress/with-video-progress';
import withAccountInfo from '../../hocs/with-account-data/with-account-info';

// Wrapped Components
const FilmListWithActiveCard = withActiveCard(FilmsList);
const FullPlayerWithVideoProgress = withVideoProgress(FullPlayer);
const HeaderWithAccountInfo = withAccountInfo(Header);

// Types
import {accountData, Film, SignInData} from '../../types';


interface Props {
  films: Film[],
  promoFilm: Film,
  genres: string[],
  accountData: accountData,
  activeGenre: string,
  filmsCounter: number,
  filmsToShow: number,
  isAuthenticationRequired: boolean,
  isPlayerActive: boolean,
  onGenreChange: (evt, genre: string) => void,
  onSignInSubmit: (evt, data: SignInData) => void,
  onFilmsLimitChange: (amount: number) => void,
  onPlayerButtonClick: () => void,
  onFavouriteChange: (film) => void,
}

class Main extends React.PureComponent<Props, null> {
  render() {
    const {
      isPlayerActive,
      onPlayerButtonClick,
      promoFilm
    } = this.props;

    return (
      <>
        {isPlayerActive ?
          <FullPlayerWithVideoProgress
            videoSrc={promoFilm.video_link}
            runTime={promoFilm.run_time}
            onPlayerButtonClick={onPlayerButtonClick}
          />
          :
          <MainScene {...this.props}/>

        }
      </>
    );
  }
}

const MainScene = (props) => {
  const {
    films,
    promoFilm,
    genres,
    activeGenre,
    filmsCounter,
    filmsToShow,
    accountData,
    onGenreChange,
    onFilmsLimitChange,
    onPlayerButtonClick,
    onFavouriteChange,
  } = props;

  return (
    <>
      <section className="movie-card">
        <div className="movie-card__bg">
          <img src={promoFilm.background_image} alt={promoFilm.name}/>
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <HeaderWithAccountInfo />

        <div className="movie-card__wrap">
          <div className="movie-card__info">
            <div className="movie-card__poster">
              <img src={promoFilm.poster_image} alt="The Grand Budapest Hotel poster" width="218"
                   height="327"/>
            </div>

            <div className="movie-card__desc">
              <h2 className="movie-card__title">
                {promoFilm.name}
              </h2>
              <p className="movie-card__meta">
                <span className="movie-card__genre">
                  {promoFilm.genre}
                </span>
                <span className="movie-card__year">
                  {promoFilm.released}
                </span>
              </p>

              <div className="movie-card__buttons">
                <button className="btn btn--play movie-card__button" type="button" onClick={onPlayerButtonClick}>
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list movie-card__button" type="button"
                        onClick={() => onFavouriteChange(promoFilm)}>
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref={promoFilm.is_favorite ? '#in-list' : '#add'}></use>
                  </svg>
                  <span>My list</span>
                </button>
                {
                  accountData !== null ?
                    <Link to={`/reviews/add/${promoFilm.id}`} className="btn movie-card__button">
                      Add review
                    </Link>
                    :
                    null
                }
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
            onGenreChange={onGenreChange}/>

          <FilmListWithActiveCard
            films={films}
            filmsToShow={filmsToShow}
            activeGenre={activeGenre}
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
};

export default Main;
