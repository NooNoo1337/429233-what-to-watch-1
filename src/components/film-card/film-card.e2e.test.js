import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import FilmCard from './film-card.jsx';
const mockFilm = {id: 1, title: `Fantastic Beasts`};

Enzyme.configure({adapter: new Adapter()});

describe(`FilmCardComponent`, () => {
  it(`should return active card id`, () => {
    const handleClick = jest.fn(() => mockFilm.id);
    const wrapper = shallow(<FilmCard film={mockFilm} filmID={mockFilm.id} onPlayButtonClick={handleClick}/>);

    wrapper.find(`.small-movie-card__play-btn`).simulate(`click`);
    expect(handleClick).toHaveBeenCalled();
    handleClick(mockFilm);
    expect(handleClick).toHaveReturnedWith(mockFilm.id);
  });
});