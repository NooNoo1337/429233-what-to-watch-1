const initialState = {
  films: [],
  activeGenre: `All genres`,
};

const ActionType = {
  'CHANGE_GENRE_FILTER': `CHANGE_GENRE_FILTER`,
  'GET_FILMS_BY_FILTER': `GET_FILMS_BY_FILTER`,
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
    const filteredList = [];

    // if (genre === `All genres`) {
    //   filteredList.push(...initialState.films);
    // } else {
    //   initialState.films.forEach((filmCard) => {
    //     if (filmCard.genre === genre) {
    //       filteredList.push(filmCard);
    //     }
    //   });
    // }
    return {
      type: ActionType.GET_FILMS_BY_FILTER,
      payload: filteredList
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

    case ActionType.GET_FILMS_BY_FILTER:
      const films = state.films;
      const activeGenre = state.activeGenre;
      // (films, activeGenre) => films.filter((film) => film.genre === activeGenre)

      return Object.assign({}, state, {
        films: films.filter((film) => film.genre === activeGenre)
      });

    case ActionType.LOAD_FILMS:
      return Object.assign({}, state, {
        films: action.payload
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
