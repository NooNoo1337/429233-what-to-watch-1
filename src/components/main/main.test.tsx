import * as React from 'react';
import * as renderer from 'react-test-renderer';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';

// Components
import Main from './main';

// Reducers
import combineReducers from '../../reducer/index';
const store = createStore(
  combineReducers
);

// Mocks
import {mockFilms, mockGenres, mockFilmsToShow} from '../../mocks/films';

describe(`MainComponent`, () => {
  it(`should render component correctly`, () => {
    const tree = renderer
      .create(
        <Provider store={store}>
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
        </Provider>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
