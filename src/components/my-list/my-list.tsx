import * as React from 'react';
import {Link} from 'react-router-dom';

// Components
import FilmsList from '../../components/films-list/films-list';

// HOCS
import withActiveCard from '../../hocs/with-active-card/with-active-card';

// Wrapped Components
const FilmListWithActiveCard = withActiveCard(FilmsList);

// Types
import {Film} from '../../types';

interface Props {
  favoriteFilms: Film[],
  filmsFetched: boolean
}

class MyList extends React.PureComponent<Props, null> {
  render() {
    const {filmsFetched, favoriteFilms} = this.props;
    return (
      <div className="user-page">
        <header className="page-header user-page__head">
          <div className="logo">
            <Link className="logo__link" to="/">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </Link>
          </div>

          <h1 className="page-title user-page__title">My list</h1>

          <div className="user-block">
            <div className="user-block__avatar">
              <img src="img/avatar.jpg" alt="User avatar" width="63" height="63"/>
            </div>
          </div>
        </header>

        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          {
            filmsFetched && <FilmListWithActiveCard films={favoriteFilms}/>
          }
        </section>

        <footer className="page-footer">
          <div className="logo">
            <Link className="logo__link logo__link--light" to="/">
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
    );
  }
}

export default MyList;
