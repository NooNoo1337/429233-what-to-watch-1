import React from 'react';
import renderer from 'react-test-renderer';
import {BrowserRouter} from 'react-router-dom';

import {App} from './app.jsx';
const filmsCollection = [
  {
    id: 1,
    name: `Fantastic Beasts`,
  },
  {
    id: 2,
    name: `Bohemian Rhapsody`,
  },
  {
    id: 3,
    name: `Macbeth`,
  },
  {
    id: 4,
    name: `Aviator`,
  }
];

describe(`AppComponent`, () => {
  it(`should render correctly`, () => {
    const tree = renderer
      .create(
          <BrowserRouter>
            <App
              films={filmsCollection}
              genres={[`Horror`, `Drama`]}
            />
          </BrowserRouter>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
