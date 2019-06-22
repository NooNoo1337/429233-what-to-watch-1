import * as React from 'react';
import {Link, RouteComponentProps} from 'react-router-dom';

// Components
import Tabs from '../tabs/tabs';
import FilmsList from '../films-list/films-list';
import FullPlayer from '../full-player/full-player';
import Header from '../header/header';

// HOCS
import withActiveTab from '../../hocs/with-active-tab/with-active-tab';
import withActiveCard from '../../hocs/with-active-card/with-active-card';
import withVideoProgress from '../../hocs/with-video-progress/with-video-progress';
import withAccountInfo from '../../hocs/with-account-info/with-account-info';
import withReviews from '../../hocs/with-reviews/with-reviews';

// Wrapped Components
const TabsWithActiveTab = withActiveTab(Tabs);
const TabsWithReviews = withReviews(TabsWithActiveTab);
const FilmListWithActiveCard = withActiveCard(FilmsList);
const FullPlayerWithVideoProgress = withVideoProgress(FullPlayer);
const HeaderWithAccountInfo = withAccountInfo(Header);


// Types
import {Film} from '../../types';


interface Props {
  films: Film[],
  accountData: null | Object,
  filmsFetched: boolean,
  isPlayerActive: boolean,
  onPlayerButtonClick: () => void,
  onFavouriteChange: ({filmId: number, isFavourite: boolean}) => void,
}

class FilmDetails extends React.PureComponent<Props & RouteComponentProps, null> {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      isPlayerActive,
      onPlayerButtonClick,
    } = this.props;

    return (
      <>
        {
          isPlayerActive ?
            <FullPlayerWithVideoProgress
              onPlayerButtonClick={onPlayerButtonClick}
            />
            :
            <FilmDetailsScreen
              {...this.props}
            />
        }
      </>
    );
  }
}

const FilmDetailsScreen = (props) => {
  const {
    films,
    filmsFetched,
    accountData,
    onPlayerButtonClick,
    onFavouriteChange,
  } = props;

  const filmId = +props.match.params.id;

  const film = films.filter((film) => (film.id === filmId))[0];
  const similarFilms = films.reduce((store, currentFilm) => (
    (store.length <= 3 && currentFilm.genre === film.genre && currentFilm.name !== film.name) ? store.concat(currentFilm) : store
  ), []);
  return (
    <>
      {
        filmsFetched &&
          <>
            <section className="movie-card movie-card--full">
              <div className="movie-card__hero">
                <div className="movie-card__bg">
                  <img src={film.background_image} alt={film.name}/>
                </div>

                <h1 className="visually-hidden">WTW</h1>

                <HeaderWithAccountInfo />

                <div className="movie-card__wrap">
                  <div className="movie-card__desc">
                    <h2 className="movie-card__title">{film.name}</h2>
                    <p className="movie-card__meta">
                      <span className="movie-card__genre">{film.genre}</span>
                      <span className="movie-card__year">{film.released}</span>
                    </p>

                    <div className="movie-card__buttons">
                      <button className="btn btn--play movie-card__button" type="button" onClick={onPlayerButtonClick}>
                        <svg viewBox="0 0 19 19" width="19" height="19">
                          <use xlinkHref="#play-s"></use>
                        </svg>
                        <span>Play</span>
                      </button>
                      <button className="btn btn--list movie-card__button" type="button" onClick={() => onFavouriteChange(film)}>
                        <svg viewBox="0 0 18 14" width="18" height="14">
                          <use xlinkHref={film.is_favorite ? '#in-list' : '#add'}></use>
                        </svg>
                        <span>My list</span>
                      </button>
                      {
                        accountData &&
                        <Link to={`/reviews/add/${film.id}`} className="btn movie-card__button">
                          Add review
                        </Link>
                      }
                    </div>
                  </div>
                </div>
              </div>

              <div className="movie-card__wrap movie-card__translate-top">
                <div className="movie-card__info">
                  <div className="movie-card__poster movie-card__poster--big">
                    <img src={film.poster_image} alt={`${film.name} poster`} width="218"
                         height="327"/>
                  </div>

                  <div className="movie-card__desc">
                    <TabsWithReviews
                      filmInfo={film}
                      id={filmId}
                    />
                  </div>

                </div>
              </div>
            </section>
            <div className="page-content">
              <section className="catalog catalog--like-this">
                <h2 className="catalog__title">More like this</h2>
                <FilmListWithActiveCard films={similarFilms}/>
              </section>

              <footer className="page-footer">
                <div className="logo">
                  <Link to="/" className="logo__link logo__link--light">
                    <span className="logo__letter logo__letter--1">W</span>
                    <span className="logo__letter logo__letter--2">T</span>
                    <span className="logo__letter logo__letter--3">W</span>
                  </Link>
                </div>

                <div className="copyright">
                  <p>© 2019 What to watch Ltd.</p>
                </div>
              </footer>
            </div>
          </>
      }
    </>
  );
};

export default FilmDetails;
