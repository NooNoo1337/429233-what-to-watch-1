import * as React from 'react';
import {Link, RouteComponentProps} from 'react-router-dom';
import {Film} from '../../types';

interface Props {
  film: Film
}

export default class FilmDetails extends React.PureComponent<Props & RouteComponentProps, null> {
  getMovieRation(rating: number): string {
    switch (true) {
      case (rating <= 3):
        return `bad`;
        break;
      case (rating >= 3 && rating <= 5):
        return `normal`;
        break;
      case (rating >= 5 && rating <= 8):
        return `good`;
        break;
      case (rating >= 8 && rating <= 10):
        return `very good`;
        break;
      case (rating === 10):
        return `awesome`;
        break;
      default:
        return `no rank`;
        break;
    }
  }

  render() {
    const film = this.props.films.filter((film) => film.id === +this.props.match.params.id)[0];
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
                <nav className="movie-nav movie-card__nav">
                  <ul className="movie-nav__list">
                    <li className="movie-nav__item movie-nav__item--active">
                      <a href="#" className="movie-nav__link">Overview</a>
                    </li>
                    <li className="movie-nav__item">
                      <a href="#" className="movie-nav__link">Details</a>
                    </li>
                    <li className="movie-nav__item">
                      <a href="#" className="movie-nav__link">Reviews</a>
                    </li>
                  </ul>
                </nav>

                <div className="movie-rating">
                  <div className="movie-rating__score">{film.rating}</div>
                  <p className="movie-rating__meta">
                    <span className="movie-rating__level">
                      {this.getMovieRation(film.rating)}
                    </span>
                    <span className="movie-rating__count">
                      {film.scores_count} ratings
                    </span>
                  </p>
                </div>

                <div className="movie-card__text">
                  <p>
                    {film.description}
                  </p>

                  <p className="movie-card__director">
                    <strong>
                      Director: {film.director}
                    </strong>
                  </p>

                  <p className="movie-card__starring">
                    <strong>
                      Starring: {`${film.starring}`}   and other
                    </strong>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="page-content">
          <section className="catalog catalog--like-this">
            <h2 className="catalog__title">More like this</h2>
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
