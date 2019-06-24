import * as React from 'react';
import * as renderer from 'react-test-renderer';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';

// Components
import AddReview from './add-review';

// Mocks
import {mockFilms} from '../../mocks/films';

// Reducers
import combineReducers from '../../reducer/index';
const store = createStore(
  combineReducers
);

// Mocks
const mockParams = {params: {id: 1}};
const mockFetchedData = {
  rating: 3,
  comment: ``,
};

describe(`AddReview`, () => {
  it(`should render correctly`, () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <BrowserRouter>
            <AddReview
              films={mockFilms}
              isFetchingFilms={false}
              match={mockParams}
              fetchData={mockFetchedData}
              handleFieldChange={() => {}}
            />
          </BrowserRouter>
        </Provider>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
