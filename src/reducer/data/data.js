const initialState = {
  promoFilm: [],
  activeFilm: null,
  films: [],
  comments: [],
  activeGenre: `All genres`,
  filmsToShow: 20,
  filmsCounter: null,
};

const ActionType = {
  'CHANGE_GENRE_FILTER': `CHANGE_GENRE_FILTER`,
  'GET_MORE_FILMS': `GET_MORE_FILMS`,
  'LOAD_PROMO_FILM': `LOAD_PROMO_FILM`,
  'LOAD_FILMS': `LOAD_FILMS`,
  'ADD_COMMENT': `ADD_COMMENT`,
};

const ActionCreators = {
  changeActiveGenre: (genre) => {
    return {
      type: ActionType.CHANGE_GENRE_FILTER,
      payload: genre,
    };
  },

  getMoreFilms: (filmsNumber) => {
    return {
      type: ActionType.GET_MORE_FILMS,
      payload: filmsNumber
    };
  },

  loadPromoFilm: (fetchedPromoFilm) => {
    return {
      type: ActionType.LOAD_PROMO_FILM,
      payload: fetchedPromoFilm
    };
  },

  loadFilms: (fetchedFilms) => {
    return {
      type: ActionType.LOAD_FILMS,
      payload: fetchedFilms
    };
  },

  addComment: (fetchedComments) => {
    return {
      type: ActionType.ADD_COMMENT,
      payload: fetchedComments
    };
  },
};

const Operations = {
  loadPromoFilm: () => (dispatch, getState, api) => {
    return api.get(`/films/promo`)
      .then((response) => dispatch(ActionCreators.loadPromoFilm(response.data)));
  },

  loadFilms: () => (dispatch, getState, api) => {
    return api.get(`/films`)
      .then((response) => dispatch(ActionCreators.loadFilms(response.data)));
  },

  addComment: ({comment, rating, filmId}) => (dispatch, getState, api) => {
    return api.post(`/comments/${filmId}`, {comment, rating})
      .then((response) => dispatch(ActionCreators.addComment(response.data)));
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_GENRE_FILTER:
      return Object.assign({}, state, {
        activeGenre: action.payload,
      });

    case ActionType.GET_MORE_FILMS:
      return Object.assign({}, state, {
        filmsToShow: action.payload
      });

    case ActionType.LOAD_PROMO_FILM:
      return Object.assign({}, state, {
        promoFilm: action.payload,
      });

    case ActionType.LOAD_FILMS:
      return Object.assign({}, state, {
        films: action.payload,
        filmsCounter: action.payload.length
      });

    case ActionType.ADD_COMMENT:
      return Object.assign({}, state, {
        comments: action.payload,
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
