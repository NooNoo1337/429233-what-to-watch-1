import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import App from './app.jsx';
const filmsCollection = [
  {
    id: 1,
    title: `Fantastic Beasts`,
  },
];

Enzyme.configure({adapter: new Adapter()});

describe(`AppComponent`, () => {
  it(`should simulate card title click`, () => {
    const handleClick = jest.fn();
    const wrapper = mount(<App films={filmsCollection} onCardTitleClick={handleClick}/>);
    const filmCardTitle = wrapper.find(`.small-movie-card__link`);

    expect(filmCardTitle.length).toEqual(1);
    filmCardTitle.simulate(`click`);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});