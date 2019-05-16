import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import FilmCard from './film-card.jsx';
const mockFilm = {id: 1, title: `Fantastic Beasts`};

Enzyme.configure({adapter: new Adapter()});

describe(`FilmCardComponent`, () => {
  it(`should simulate link click`, () => {
    const handleTitleClick = jest.fn();
    const wrapper = mount(<FilmCard film={mockFilm} filmID={mockFilm.id} onCardTitleClick={handleTitleClick}/>);
    const filmCardTitle = wrapper.find(`.small-movie-card__link`);

    expect(filmCardTitle.length).toEqual(1);
    filmCardTitle.simulate(`click`);
    expect(handleTitleClick).toHaveBeenCalled();
  });

  it(`should return active card id`, () => {
    const handleMouseEnter = jest.fn(() => mockFilm.id);
    const wrapper = mount(<FilmCard film={mockFilm} filmID={mockFilm.id} onMouseEnter={handleMouseEnter}/>);

    wrapper.find(`.catalog__movies-card`).simulate(`mouseenter`);
    expect(handleMouseEnter).toHaveBeenCalled();
    handleMouseEnter(mockFilm);
    expect(handleMouseEnter).toHaveReturnedWith(mockFilm.id);
  });
});
