import MockAdapter from 'axios-mock-adapter';
import {createAPI} from '../../api.js';
import {reducer, ActionType, Operations} from './data.js';

describe(`DataReducer`, () => {
  it(`Should return initial state by default`, () => {
    expect(reducer(undefined, {})).toEqual({
      promoFilm: [],
      films: [],
      comments: [],
      activeGenre: `All genres`,
      filmsToShow: 20,
      filmsCounter: null,
    });
  });

  it(`Should change genre filter`, () => {
    expect(reducer({
      activeGenre: `All genres`,
    }, {
      type: `CHANGE_GENRE_FILTER`,
      payload: `Comedies`
    })).toEqual({
      activeGenre: `Comedies`,
    });
  });

  it(`Should change films limit`, () => {
    expect(reducer({
      filmsToShow: 20,
    }, {
      type: `GET_MORE_FILMS`,
      payload: 40
    })).toEqual({
      filmsToShow: 40,
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

    return filmsLoader(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalled();
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_FILMS,
          payload: [{fake: true}]
        });
      });
  });

  it(`Should make a correct API GET call to /films/promo`, () => {
    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const promoFilmLoader = Operations.loadPromoFilm();

    apiMock
      .onGet(`/films/promo`)
      .reply(200, [{fake: true}]);

    return promoFilmLoader(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalled();
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_PROMO_FILM,
          payload: [{fake: true}]
        });
      });
  });

  it(`Should make a correct API POST call to /comments/:id`, () => {
    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const mockComment = {comment: `comment`, rating: 5, filmId: 1};
    const commentPoster = Operations.addComment(mockComment);

    apiMock
      .onPost(`/comments/${mockComment.filmId}`)
      .reply(200, [{fake: true}]);

    return commentPoster(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalled();
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.ADD_COMMENT,
          payload: [{fake: true}]
        });
      });
  });

  it(`Should make a correct API POST call to /favorite/:id/:status`, () => {
    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const mockFilm = {id: 1, is_favorite: false};
    const changeFavourite = Operations.changeFavourite(mockFilm);

    apiMock
      .onPost(`/favorite/${mockFilm.id}/${mockFilm.is_favorite ? `0` : `1`}`)
      .reply(200, [{fake: true}]);

    return changeFavourite(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalled();
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.CHANGE_FAVORITE,
          payload: [{fake: true}]
        });
      });
  });
});
