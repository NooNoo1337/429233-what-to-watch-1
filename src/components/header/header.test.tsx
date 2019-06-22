import * as React from 'react';
import * as renderer from 'react-test-renderer';
import {BrowserRouter} from 'react-router-dom';

// Components
import {Header} from './header';

// Mocks
import {mockAccountData} from '../../mocks/films';

describe(`Header`, () => {
  it(`should render correctly`, () => {
    const tree = renderer
      .create(
        <BrowserRouter>
          <Header
            accountData={null}
          />
        </BrowserRouter>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`should render correctly when user is authenticated`, () => {
    const tree = renderer
      .create(
        <BrowserRouter>
          <Header
            accountData={mockAccountData}
          />
        </BrowserRouter>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
