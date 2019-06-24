import * as React from 'react';
import * as renderer from 'react-test-renderer';
// Components
import ErrorMessage from './error-message';

describe(`ErrorMessageComponent`, () => {
  it(`should render correctly`, () => {
    const tree = renderer
      .create(
        <ErrorMessage/>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
