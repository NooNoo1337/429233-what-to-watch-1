import * as React from 'react';
import {configure, mount} from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import {Film} from '../../types';

import FilmCard from './film-card';
const mockFilm: Film = {
  'id': 1,
  'name': `The Grand Budapest Hotel`,
  'poster_image': `img/the-grand-budapest-hotel-poster.jpg`,
  'preview_image': `img/the-grand-budapest-hotel.jpg`,
  'background_image': `img/the-grand-budapest-hotel-bg.jpg`,
  'background_color': `#ffffff`,
  'video_link': `https://some-link`,
  'preview_video_link': `https://some-link`,
  'description': `In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave's friend and protege.`,
  'rating': 8.9,
  'scores_count': 240,
  'director': `Wes Andreson`,
  'starring': [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`, `Saoirse Ronan`],
  'run_time': 99,
  'genre': `Comedy`,
  'released': 2014,
  'is_favorite': false,
};

configure({adapter: new Adapter()});

describe(`FilmCardComponent`, () => {
  it(`should return active card id`, () => {
    const handleMouseEnter = jest.fn((mockFilm) => mockFilm.id);
    const handleMouseLeave = jest.fn(() => null);

    const wrapper = mount(
      <FilmCard
        film={mockFilm}
        isVideoPlaying={false}
        onCardTitleClick={() => {}}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />);

    wrapper.find(`.catalog__movies-card`).simulate(`mouseenter`);
    expect(handleMouseEnter).toHaveBeenCalled();
    handleMouseEnter(mockFilm);
    expect(handleMouseEnter).toHaveReturnedWith(mockFilm.id);
  });
});
