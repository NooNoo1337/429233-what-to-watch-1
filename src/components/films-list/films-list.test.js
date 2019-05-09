import React from 'react';
import renderer from 'react-test-renderer';

import FilmsList from './films-list.jsx';
const filmsCollection = [
  {
    id: 1,
    title: `Fantastic Beasts`,
  },
  {
    id: 2,
    title: `Bohemian Rhapsody`,
  },
  {
    id: 3,
    title: `Macbeth`,
  },
  {
    id: 4,
    title: `Aviator`,
  },
];

describe(`FilmsListComponent`, () => {
  it(`should render FilmsListComponent correctly`, () => {
    const tree = renderer
      .create(<FilmsList
        films={filmsCollection}
        handleClick={() => {}}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
