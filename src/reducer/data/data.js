const initialState = {
  promoFilm: [],
  favoriteFilms: [],
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
  'LOAD_FAVORITE_FILMS': `LOAD_FAVORITE_FILMS`,
  'ADD_COMMENT': `ADD_COMMENT`,
  'CHANGE_FAVORITE': `CHANGE_FAVORITE`,
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

  loadFavoriteFilms: (fetchedFilms) => {
    return {
      type: ActionType.LOAD_FAVORITE_FILMS,
      payload: fetchedFilms
    };
  },

  addComment: (fetchedComments) => {
    return {
      type: ActionType.ADD_COMMENT,
      payload: fetchedComments
    };
  },

  changeFavourite: (film) => {
    return {
      type: ActionType.CHANGE_FAVORITE,
      payload: film
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

  loadFavoriteFilms: () => (dispatch, getState, api) => {
    return api.get(`/favorite`)
      .then((response) => {
        console.log('--->', response.data);
        dispatch(ActionCreators.loadFavoriteFilms(response.data))
      });
  },

  addComment: ({comment, rating, filmId}) => (dispatch, getState, api) => {
    return api.post(`/comments/${filmId}`, {comment, rating})
      .then((response) => dispatch(ActionCreators.addComment(response.data)));
  },

  changeFavourite: ({id, is_favorite: isFavorite}) => (dispatch, getState, api) => {
    return api.post(`/favorite/${id}/${isFavorite ? `0` : `1`}`)
      .then((response) => dispatch(ActionCreators.changeFavourite(response.data)));
  },
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

    case ActionType.LOAD_FAVORITE_FILMS:
      return Object.assign({}, state, {
        favoriteFilms: action.payload,
      });

    case ActionType.ADD_COMMENT:
      return Object.assign({}, state, {
        comments: action.payload,
      });

    case ActionType.CHANGE_FAVORITE:
      const films = state.films.filter((film) => film.id !== action.payload.id);

      if (state.promoFilm.id === action.payload.id) {
        state.promoFilm[`is_favorite`] = !state.promoFilm[`is_favorite`];
      }

      return Object.assign({}, state, {
        films: [
          ...films,
          ...[action.payload]
        ]
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
