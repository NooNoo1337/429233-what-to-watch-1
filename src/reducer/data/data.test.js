import MockAdapter from 'axios-mock-adapter';
import {createAPI} from '../../api.js';
import {reducer, ActionType, Operations} from './data.js';

describe(`DataReducer`, () => {
  it(`Should return initial state by default`, () => {
    expect(reducer(undefined, {})).toEqual({
      films: [],
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
});
