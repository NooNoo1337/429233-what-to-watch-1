import history from '../../history.js';

const initialState = {
  isAuthenticationRequired: false,
  accountData: null,
  formErrors: false,
};

const ActionType = {
  'REQUIRE_AUTHENTICATION': `REQUIRE_AUTHENTICATION`,
  'CHANGE_AUTHENTICATION_STATUS': `CHANGE_AUTHENTICATION_STATUS`,
  'GET_ACCOUNT_DATA': `GET_ACCOUNT_DATA`,
  'SET_ERROR': `SET_ERROR`,
};

const ActionCreators = {
  requireAuthentication: (status) => {
    return {
      type: ActionType.REQUIRE_AUTHENTICATION,
      payload: status
    };
  },

  getAccountData: (data) => {
    return {
      type: ActionType.GET_ACCOUNT_DATA,
      payload: data
    };
  },

  setError: (data) => {
    return {
      type: ActionType.SET_ERROR,
      payload: data
    };
  },
};

const Operations = {
  sendUserData: ({email, password}) => (dispatch, getState, api) => {
    return api.post(`/login`, {email, password})
      .then((response) => {
        switch (response.status) {
          case 200:
            history.goBack();
            dispatch(ActionCreators.requireAuthentication(false));
            dispatch(ActionCreators.getAccountData(response.data));
            break;
          case undefined:
            dispatch(ActionCreators.setError({login: true}));
            break;
          default:
            break;
        }
      });
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.REQUIRE_AUTHENTICATION:
      return Object.assign({}, state, {
        isAuthenticationRequired: action.payload
      });

    case ActionType.GET_ACCOUNT_DATA:
      return Object.assign({}, state, {
        accountData: action.payload
      });

    case ActionType.SET_ERROR:
      return Object.assign({}, state, {
        formErrors: action.payload
      });
  }

  return state;
};

export {
  reducer,
  ActionCreators,
  ActionType,
  Operations
};
