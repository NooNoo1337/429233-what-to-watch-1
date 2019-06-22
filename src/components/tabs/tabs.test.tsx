import * as React from 'react';
import * as renderer from 'react-test-renderer';

// Components
import Tabs from './tabs';

// Mocks
import {mockFilms, mockComments} from '../../mocks/films';

describe(`Tabs`, () => {
  it(`should render correctly`, () => {
    const tree = renderer
      .create(
        <Tabs
          filmInfo={mockFilms[0]}
          activeTab={1}
          comments={mockComments}
          onTabClick={() => {}}
        />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
