import * as React from 'react';
import * as renderer from 'react-test-renderer';
import {BrowserRouter} from 'react-router-dom';

// Components
import Main from './main';

// Mocks
import {mockFilms, mockGenres, mockFilmsToShow} from '../../mocks/films';

describe(`MainComponent`, () => {
  it(`should render component correctly`, () => {
    const tree = renderer
      .create(
          <BrowserRouter>
            <Main
              films={mockFilms}
              genres={mockGenres}
              promoFilm={mockFilms[0]}
              activeGenre={mockGenres[0]}
              accountData={null}
              isAuthenticationRequired={false}
              filmsCounter={mockFilms.length}
              filmsToShow={mockFilmsToShow}
              isPlayerActive={false}
              onPlayerButtonClick={() => {}}
              onFilmsLimitChange={() => {}}
              onSignInSubmit={() => {}}
              onGenreChange={() => {}}
              onFavouriteChange={() => {}}
            />
          </BrowserRouter>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
