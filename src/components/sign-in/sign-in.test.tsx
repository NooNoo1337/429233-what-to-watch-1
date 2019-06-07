import * as React from 'react';
import * as renderer from 'react-test-renderer';
import {BrowserRouter} from 'react-router-dom';

import SignIn from './sign-in';

describe(`SignInComponent`, () => {
  it(`should render component correctly`, () => {
    const handleInput = jest.fn();
    const handleSubmit = jest.fn();

    const tree = renderer
      .create(
          <BrowserRouter>
            <SignIn handleInput={handleInput} handleSubmit={handleSubmit}/>)
          </BrowserRouter>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
