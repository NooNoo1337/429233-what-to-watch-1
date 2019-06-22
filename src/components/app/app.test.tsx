import * as React from 'react';
import * as renderer from 'react-test-renderer';
import {BrowserRouter} from 'react-router-dom';

// Components
import {App} from './app';

// Mocks
import {mockFilms, mockGenres, mockFilmsToShow} from '../../mocks/films';

describe(`AppComponent`, () => {
  it(`should render correctly`, () => {
    const tree = renderer
      .create(
          <BrowserRouter>
            <App
              films={mockFilms}
              promoFilm={mockFilms[0]}
              genres={mockGenres}
              activeGenre={mockGenres[0]}
              accountData={null}
              isAuthenticationRequired={false}
              onCardTitleClick={() => {}}
              onSignInSubmit={() => {}}
              onGenreChange={() => {}}
              filmsCounter={mockFilms.length}
              filmsToShow={mockFilmsToShow}
              onFilmsLimitChange={() => {}}
              onFavouriteChange={() => {}}
            />
          </BrowserRouter>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
