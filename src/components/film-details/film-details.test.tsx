import * as React from 'react';
import * as renderer from 'react-test-renderer';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';

// Components
import FilmDetails from './film-details';

// Reducers
import combineReducers from '../../reducer/index';
const store = createStore(
  combineReducers
);

// Mocks
import {mockFilms} from '../../mocks/films';
const mockParams = {params: {id: 1}};

describe(`FilmDetails`, () => {
  it(`should render correctly`, () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <BrowserRouter>
            <FilmDetails
              films={mockFilms}
              isPlayerActive={false}
              match={mockParams}
            />
          </BrowserRouter>
        </Provider>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
