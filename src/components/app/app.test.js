import React from 'react';
import renderer from 'react-test-renderer';
import App from './app';

const movieTitlesCollection = [`Fantastic Beasts`, `Bohemian Rhapsody`, `Macbeth`, `Aviator`];

it(`App renders correctly`, () => {
  const tree = renderer
    .create(<App
      movieTitles={movieTitlesCollection}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
