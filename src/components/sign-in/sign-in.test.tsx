import * as React from 'react';
import * as renderer from 'react-test-renderer';
import {BrowserRouter} from 'react-router-dom';

import SignIn from './sign-in';

describe(`SignInComponent`, () => {
  it(`should render component correctly`, () => {
    const handleFieldChange = jest.fn();
    const handleSubmit = jest.fn();
    const mockData = {
      email: ``,
      password: ``,
    };

    const tree = renderer
      .create(
        <BrowserRouter>
          <SignIn
            fetchData={mockData}
            handleFieldChange={handleFieldChange}
            onSignInSubmit={handleSubmit}
          />)
        </BrowserRouter>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
