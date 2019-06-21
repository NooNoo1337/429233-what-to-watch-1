import * as React from 'react';
import * as renderer from 'react-test-renderer';
import {BrowserRouter} from 'react-router-dom';

// Components
import {App} from './app';

// Reducers
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import combineReducers from '../../reducer/index';
const store = createStore(combineReducers);

// Mocks
import {mockFilms, mockGenres, mockFilmsToShow} from '../../mocks/films';

describe(`AppComponent`, () => {
  it(`should render correctly`, () => {
    const tree = renderer
      .create(
        <Provider store={store}>
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
            />
          </BrowserRouter>
        </Provider>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
