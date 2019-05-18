import React from 'react';
import renderer from 'react-test-renderer';

import GenreList from './genre-list.jsx';
const mockGenres = [`All genres`, `Comedies`, `Crime`, `Documentary`];

describe(`GenresListComponent`, () => {
  it(`should render component correctly`, () => {
    const tree = renderer
      .create(<GenreList genres={mockGenres}/>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
