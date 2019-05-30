import MockAdapter from 'axios-mock-adapter';
import {createAPI} from '../../api.js';
import {reducer, ActionType, Operations} from './data.js';

describe(`Load data reducer`, () => {
  it(`Should return initial state by default`, () => {
    expect(reducer(undefined, {})).toEqual({
      films: [],
      activeGenre: `All genres`,
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
