import React from 'react';
import renderer from 'react-test-renderer';
import {BrowserRouter} from 'react-router-dom';

import SignIn from './sign-in.jsx';

describe(`SignInComponent`, () => {
  it(`should render component correctly`, () => {
    const tree = renderer
      .create(
          <BrowserRouter>
            <SignIn handleInput={() => jest.fn()} handleSubmit={() => jest.fn()}/>)
          </BrowserRouter>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
