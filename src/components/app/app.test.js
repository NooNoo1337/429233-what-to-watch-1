import React from 'react';
import renderer from 'react-test-renderer';

import {App} from './app.jsx';
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
  }
];

describe(`AppComponent`, () => {
  it(`should render correctly`, () => {
    const tree = renderer
      .create(<App
        films={filmsCollection}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
