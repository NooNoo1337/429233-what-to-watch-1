import React from 'react';
import renderer from 'react-test-renderer';

import SignIn from './sign-in.jsx';

describe(`SignInComponent`, () => {
  it(`should render component correctly`, () => {
    const tree = renderer
      .create(<SignIn handleInput={() => jest.fn()} handleSubmit={() => jest.fn()}/>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
