import * as React from 'react';
import * as renderer from 'react-test-renderer';
import {BrowserRouter} from 'react-router-dom';

// Components
import MyList from './my-list';

// Mocks
import {mockFilms} from '../../mocks/films';

describe(`MyList`, () => {
  it(`should render correctly`, () => {
    const tree = renderer
      .create(
        <BrowserRouter>
          <MyList
            favoriteFilms={mockFilms}
            filmsFetched={true}
          />
        </BrowserRouter>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
