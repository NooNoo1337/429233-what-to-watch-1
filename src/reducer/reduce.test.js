import {rootReducer} from '../reducer/reducer';

const mockFilmCollection = [
  {
    id: 1,
    genre: `Comedies`,
    title: `Fantastic Beasts`,
    preview: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    src: ``
  },
  {
    id: 2,
    genre: `Crime`,
    title: `Bohemian Rhapsody`,
    preview: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    src: ``
  },
  {
    id: 3,
    genre: `Documentary`,
    title: `Macbeth`,
    preview: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    src: ``
  },
  {
    id: 4,
    genre: `Dramas`,
    preview: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    title: `Aviator`,
    src: ``
  },
  {
    id: 5,
    genre: `Horror`,
    title: `Filth`,
    preview: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    src: ``
  },
];

const mockFilteredCollection = [
  {
    id: 1,
    genre: `Comedies`,
    title: `Fantastic Beasts`,
    preview: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    src: ``
  }
];

describe(`reducer`, () => {
  it(`Should return initial state by default`, () => {
    expect(rootReducer(undefined, {})).toEqual({
      genre: `All genres`,
      films: mockFilmCollection,
    });
  });

  it(`Should change genre filter`, () => {
    expect(rootReducer({
      genre: `All genres`,
      films: mockFilmCollection,
    }, {
      type: `CHANGE_GENRE_FILTER`,
      payload: `Comedies`
    })).toEqual({
      genre: `Comedies`,
      films: mockFilmCollection,
    });
  });

  it(`Should return filtered collection`, () => {
    expect(rootReducer({
      genre: `Comedies`,
      films: mockFilmCollection,
    }, {
      type: `GET_FILMS_BY_FILTER`,
      payload: mockFilteredCollection
    })).toEqual({
      genre: `Comedies`,
      films: mockFilteredCollection,
    });
  });
});
