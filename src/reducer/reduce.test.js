import MockAdapter from 'axios-mock-adapter';
import {createAPI} from '../api.js';
import {rootReducer, ActionType, Operations} from '../reducer/reducer';

const mockFilmCollection = [
  {
    'id': 1,
    'name': `Fantastic Beasts`,
    'preview_image': `https://es31-server.appspot.com/wtw/static/film/preview/what-we-do-in-the-shadows.jpg`,
    'preview_video_link': `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    'genre': `Crime`,
  },
  {
    'id': 2,
    'name': `Bohemian Rhapsody`,
    'preview_image': `https://es31-server.appspot.com/wtw/static/film/preview/what-we-do-in-the-shadows.jpg`,
    'preview_video_link': `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    'genre': `Horror`,
  },
  {
    'id': 3,
    'name': `Moonrise Kingdom`,
    'preview_image': `https://es31-server.appspot.com/wtw/static/film/preview/what-we-do-in-the-shadows.jpg`,
    'preview_video_link': `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    'genre': `Drama`,
  },
  {
    'id': 4,
    'name': `We need to talk about Kevin`,
    'preview_image': `https://es31-server.appspot.com/wtw/static/film/preview/what-we-do-in-the-shadows.jpg`,
    'preview_video_link': `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    'genre': `Comedy`,
  },
];

const mockFilteredCollection = [
  {
    'id': 1,
    'name': `Fantastic Beasts`,
    'preview_image': `https://es31-server.appspot.com/wtw/static/film/preview/what-we-do-in-the-shadows.jpg`,
    'preview_video_link': `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    'genre': `Crime`,
  }
];

describe(`root reducer`, () => {
  it(`Should return initial state by default`, () => {
    expect(rootReducer(undefined, {})).toEqual({
      activeGenre: `All genres`,
      films: [],
    });
  });

  it(`Should change genre filter`, () => {
    expect(rootReducer({
      activeGenre: `All genres`,
    }, {
      type: ActionType.CHANGE_GENRE_FILTER,
      payload: `Comedies`
    })).toEqual({
      activeGenre: `Comedies`,
    });
  });

  it(`Should return filtered collection`, () => {
    expect(rootReducer({
      films: mockFilmCollection,
    }, {
      type: ActionType.GET_FILMS_BY_FILTER,
      payload: mockFilteredCollection
    })).toEqual({
      films: mockFilteredCollection,
    });
  });

  it(`Should make a correct API GET call to /films`, () => {
    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const filmsLoader = Operations.loadFilms();

    apiMock
      .onGet(`/films`)
      .reply(200, [{fake: true}]);

    return filmsLoader(dispatch)
      .then(() => {
        expect(dispatch).toHaveBeenCalled();
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_FILMS,
          payload: [{fake: true}]
        });
      });
  });
});
