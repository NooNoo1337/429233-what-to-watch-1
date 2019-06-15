import * as React from 'react';
import * as renderer from 'react-test-renderer';

// Components
import ShowMoreButton from './show-more-button';

const mockFilmCounter = 25;
const mockFilmsToShow = 20;

describe(`ShowMoreButtonComponent`, () => {
  it(`should render correctly`, () => {
    const tree = renderer
      .create(
        <ShowMoreButton
          onFilmsLimitChange={() => {}}
          filmsCounter={mockFilmCounter}
          filmsToShow={mockFilmsToShow}
        />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
