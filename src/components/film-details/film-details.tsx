import * as React from 'react';
import {Link, RouteComponentProps} from 'react-router-dom';

// Components
import Tabs from '../tabs/tabs';
import FilmsList from "../films-list/films-list";

// HOCS
import withActiveTab from '../../hocs/with-active-tab/with-active-tab';
import withActiveCard from '../../hocs/with-active-card/with-active-card';

// Wrapped Components
const TabsWithActiveTab = withActiveTab(Tabs);
const FilmListWithActiveCard = withActiveCard(FilmsList);

// Reducers
import {ActionCreators as DataActionCreators} from '../../reducer/data/data.js';
import {getFilms} from '../../reducer/data/selectors';

// Types
import {Film} from '../../types';


interface Props {
  films: Film[]
}

class FilmDetails extends React.PureComponent<Props & RouteComponentProps, null> {
  constructor(props) {
    super(props);
  }

  componentWillMount(): void {
    console.log('films --->', this.props.films);
  }


  render() {
    const {films} = this.props;
    const film = this.props.films.filter((film) => film.id === +this.props.match.params.id)[0];
    // const film = {
    //   name: "What We Do in the Shadows",
    //   poster_image: "https://es31-server.appspot.com/wtw/static/film/poster/What-We-Do-in-the-Shadows.jpg",
    //   preview_image: "https://es31-server.appspot.com/wtw/static/film/preview/what-we-do-in-the-shadows.jpg",
    //   background_image: "https://es31-server.appspot.com/wtw/static/film/background/What-We-Do-in-the-Shadows.jpg",
    //   background_color: "#A39E81",
    //   description: "A look into the daily (or rather, nightly) lives of three vampires who've lived together for over 100 years, in Staten Island.",
    //   rating: 4.2,
    //   scores_count: 6173,
    //   director: "Jemaine Clement",
    //   run_time: 30,
    //   genre: "Comedy",
    //   released: 2019,
    //   id: 1,
    //   is_favorite: false,
    //   video_link: "http://peach.themazzone.com/durian/movies/sintel-1024-surround.mp4",
    //   preview_video_link: "https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4",
    //   starring: [`Kayvan Novak`, `Kayvan Novak`, `Kayvan Novak`]
    // };

    const similarFilms = films.reduce((store, currentFilm) => (
      (store.length <= 4 && currentFilm.genre === film.genre) ? store.concat(currentFilm) : store
    ), []);

    return (
      <>
        <section className="movie-card movie-card--full">
          <div className="movie-card__hero">
            <div className="movie-card__bg">
              <img src={film.background_image} alt={film.name}/>
            </div>

            <h1 className="visually-hidden">WTW</h1>

            <header className="page-header movie-card__head">
              <div className="logo">
                <Link to="/" className="logo__link">
                  <span className="logo__letter logo__letter--1">W</span>
                  <span className="logo__letter logo__letter--2">T</span>
                  <span className="logo__letter logo__letter--3">W</span>
                </Link>
              </div>

              <div className="user-block">
                <div className="user-block__avatar">
                  <img src="img/avatar.jpg" alt="User avatar" width="63" height="63"/>
                </div>
              </div>
            </header>

            <div className="movie-card__wrap">
              <div className="movie-card__desc">
                <h2 className="movie-card__title">{film.name}</h2>
                <p className="movie-card__meta">
                  <span className="movie-card__genre">{film.genre}</span>
                  <span className="movie-card__year">{film.released}</span>
                </p>

                <div className="movie-card__buttons">
                  <button className="btn btn--play movie-card__button" type="button">
                    <svg viewBox="0 0 19 19" width="19" height="19">
                      <use xlinkHref="#play-s"></use>
                    </svg>
                    <span>Play</span>
                  </button>
                  <button className="btn btn--list movie-card__button" type="button">
                    <svg viewBox="0 0 18 14" width="18" height="14">
                      <use xlinkHref="#in-list"></use>
                    </svg>
                    <span>My list</span>
                  </button>
                  <a href="add-review.html" className="btn movie-card__button">Add review</a>
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
                <TabsWithActiveTab filmInfo={film} />
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
              <a href="main.html" className="logo__link logo__link--light">
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


export default FilmDetails;
