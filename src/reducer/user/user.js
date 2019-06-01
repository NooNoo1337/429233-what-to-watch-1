const initialState = {
  isAuthenticationRequired: false,
  isUserAuthenticated: false,
  accountData: {},
};

const ActionType = {
  'REQUIRE_AUTHENTICATION': `REQUIRE_AUTHENTICATION`,
  'CHANGE_AUTHENTICATION_STATUS': `CHANGE_AUTHENTICATION_STATUS`,
  'GET_ACCOUNT_DATA': `GET_ACCOUNT_DATA`,
};

const ActionCreators = {
  requireAuthentication: (status) => {
    return {
      type: ActionType.REQUIRE_AUTHENTICATION,
      payload: status
    };
  },

  registerUser: (status) => {
    return {
      type: ActionType.CHANGE_AUTHENTICATION_STATUS,
      payload: status
    };
  },

  getAccountData: (data) => {
    return {
      type: ActionType.GET_ACCOUNT_DATA,
      payload: data
    };
  }
};

const Operations = {
  sendUserData: ({email, password}) => (dispatch, getState, api) => {
    return api.post(`/login`, {email, password})
      .then(({data, status}) => {
        if (status === 200) {
          dispatch(ActionCreators.registerUser(true));
          dispatch(ActionCreators.getAccountData(data));
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

    case ActionType.CHANGE_AUTHENTICATION_STATUS:
      return Object.assign({}, state, {
        isUserAuthenticated: action.payload
      });

    case ActionType.GET_ACCOUNT_DATA:
      return Object.assign({}, state, {
        accountData: action.payload
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
