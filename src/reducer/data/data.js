const initialState = {
  films: [],
  activeGenre: `All genres`,
  filmsToShow: 20,
  filmsCounter: null,
};

const ActionType = {
  'CHANGE_GENRE_FILTER': `CHANGE_GENRE_FILTER`,
  'GET_FILMS_BY_FILTER': `GET_FILMS_BY_FILTER`,
  'GET_MORE_FILMS': `GET_MORE_FILMS`,
  'LOAD_FILMS': `LOAD_FILMS`,
};

const ActionCreators = {
  changeActiveGenre: (genre) => {
    return {
      type: ActionType.CHANGE_GENRE_FILTER,
      payload: genre,
    };
  },

  getFilmsByGenre: (genre) => {
    return {
      type: ActionType.GET_FILMS_BY_FILTER,
      payload: genre
    };
  },

  getMoreFilms: (filmsNumber) => {
    return {
      type: ActionType.GET_MORE_FILMS,
      payload: filmsNumber
    };
  },

  loadFilms: (fetchedFilms) => {
    return {
      type: ActionType.LOAD_FILMS,
      payload: fetchedFilms
    };
  },
};

const Operations = {
  loadFilms: () => (dispatch, getState, api) => {
    return api.get(`/films`)
      .then((response) => dispatch(ActionCreators.loadFilms(response.data)));
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_GENRE_FILTER:
      return Object.assign({}, state, {
        activeGenre: action.payload,
      });

      // TODO: remove?
    case ActionType.GET_FILMS_BY_FILTER:
      return Object.assign({}, state, {
        activeGenre: action.payload,
      });

    case ActionType.GET_MORE_FILMS:
      return Object.assign({}, state, {
        filmsToShow: action.payload
      });

    case ActionType.LOAD_FILMS:
      return Object.assign({}, state, {
        films: action.payload,
        filmsCounter: action.payload.length
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
