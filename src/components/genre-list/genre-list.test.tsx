import * as React from 'react';
import * as renderer from 'react-test-renderer';

import GenreList from './genre-list';
const mockGenres = [`All genres`, `Comedies`, `Crime`, `Documentary`];

describe(`GenresListComponent`, () => {
  it(`should render component correctly`, () => {
    const onGenreChange = jest.fn();
    const tree = renderer
      .create(<GenreList
        genres={mockGenres}
        activeGenre={mockGenres[0]}
        onGenreChange={onGenreChange}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
