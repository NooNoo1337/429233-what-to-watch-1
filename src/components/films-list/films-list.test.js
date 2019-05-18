import React from 'react';
import renderer from 'react-test-renderer';

import FilmsList from './films-list.jsx';
const mockFilmCollection = [
  {
    id: 1,
    genre: `Comedies`,
    title: `Fantastic Beasts`,
    preview: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    src: ``
  },
  {
    id: 2,
    genre: `Crime`,
    title: `Bohemian Rhapsody`,
    preview: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    src: ``
  },
  {
    id: 3,
    genre: `Documentary`,
    title: `Macbeth`,
    preview: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    src: ``
  },
  {
    id: 4,
    genre: `Dramas`,
    preview: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    title: `Aviator`,
    src: ``
  },
  {
    id: 5,
    genre: `Horror`,
    title: `Filth`,
    preview: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    src: ``
  },
];

describe(`FilmsListComponent`, () => {
  it(`should render component correctly`, () => {
    const tree = renderer
      .create(<FilmsList
        films={mockFilmCollection}
        handleClick={() => {}}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
