import MockAdapter from 'axios-mock-adapter';
import {createAPI} from '../../api.js';
import {reducer, ActionType, Operations} from './user.js';

describe(`UserReducer`, () => {
  it(`Should return initial state by default`, () => {
    expect(reducer(undefined, {})).toEqual({
      isAuthenticationRequired: false,
      accountData: null,
    });
  });

  it(`Should require authentication`, () => {
    expect(reducer({
      isAuthenticationRequired: false,
    }, {
      type: `REQUIRE_AUTHENTICATION`,
      payload: true
    })).toEqual({
      isAuthenticationRequired: true,
    });
  });

  it(`Should make a correct API POST call to /login`, () => {
    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const mockAccountData = {email: `test@mail.ru`, password: 123};
    const sendUserData = Operations.sendUserData(mockAccountData);
    apiMock
      .onPost(`/login`)
      .reply(200, [{fake: true}]);

    return sendUserData(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalled();

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.REQUIRE_AUTHENTICATION,
          payload: false
        });

        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.GET_ACCOUNT_DATA,
          payload: [{fake: true}]
        });
      });
  });
});
