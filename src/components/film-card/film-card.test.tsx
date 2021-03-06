import * as React from 'react';
import * as renderer from 'react-test-renderer';
import {BrowserRouter} from 'react-router-dom';

import {Film} from "../../types";

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

describe(`FilmCardComponent`, () => {
  it(`should render component correctly`, () => {
    const tree = renderer
      .create(
        <BrowserRouter>
          <FilmCard
            film={mockFilm}
            key={mockFilm.id}
            onMouseEnter={() => mockFilm.id}
            onMouseLeave={() => {}}
            isVideoPlaying={false}
          />
        </BrowserRouter>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
