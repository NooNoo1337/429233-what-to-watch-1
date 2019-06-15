import * as React from 'react';
import * as Adapter from 'enzyme-adapter-react-16';
import {configure, mount} from 'enzyme';
import {BrowserRouter} from 'react-router-dom';

import ShowMoreButton from './show-more-button';

configure({adapter: new Adapter()});

const mockFilmCounter = 25;
const mockFilmsToShow = 20;

describe(`ShowMoreButtonComponent`, () => {
  it(`should increase the shown films number`, () => {
    const handleFilmsLimitChange = jest.fn((amount) => amount * 2);

    const wrapper = mount(
      <BrowserRouter>
        <ShowMoreButton
          onFilmsLimitChange={handleFilmsLimitChange}
          filmsCounter={mockFilmCounter}
          filmsToShow={mockFilmsToShow}
        />
      </BrowserRouter>
    );

    wrapper.find(`.catalog__button`).simulate(`click`);
    expect(handleFilmsLimitChange).toHaveBeenCalled();
    handleFilmsLimitChange(mockFilmsToShow);
    expect(handleFilmsLimitChange).toHaveReturnedWith(40);
  });
});

