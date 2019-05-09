import React from 'react';
import renderer from 'react-test-renderer';

import FilmCard from './film-card.jsx';

const mockFilm =
  {
    id: 1,
    title: `Fantastic Beasts`,
  };

describe(`FilmCardComponent`, () => {
  it(`should render FilmCardComponent correctly`, () => {
    const tree = renderer
      .create(<FilmCard
        film={mockFilm}
        key={mockFilm.id}
        handleClick={() => {}}
        handleMouseEnter={() => {
        }}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
