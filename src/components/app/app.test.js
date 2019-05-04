import React from 'react';
import renderer from 'react-test-renderer';

import App from './app.jsx';
const movieTitlesCollection = [`Fantastic Beasts`, `Bohemian Rhapsody`, `Macbeth`, `Aviator`];

describe(`AppComponent`, () => {
  it(`should render AppComponent correctly`, () => {
    const tree = renderer
      .create(<App
        movieTitles={movieTitlesCollection}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
