import filmsCollection from '../mocks/films.js';

const initialState = {
  activeGenre: `All genres`,
  films: []
};

const ActionCreators = {
  'CHANGE_GENRE_FILTER': (genre) => {
    return {
      type: `CHANGE_GENRE_FILTER`,
      payload: genre,
    };
  },
  'GET_FILMS_BY_FILTER': (genre) => {
    let filteredList = [];

    if (genre === `All genres`) {
      filteredList = initialState.films;
    } else {
      initialState.films.forEach((filmCard) => {
        if (filmCard.genre === genre) {
          filteredList.push(filmCard);
        }
      });
    }

    return {
      type: `GET_FILMS_BY_FILTER`,
      payload: filteredList
    };
  }
};

const Operations = {
  loadFilms: () => (dispatch) => {
    return fetch(`https://es31-server.appspot.com/wtw/films`)
      .then((response) => response.json())
      .then((films) => dispatch(ActionCreators[`LOAD_FILMS`](films)));
  }
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case `CHANGE_GENRE_FILTER`:
      return Object.assign({}, state, {
        activeGenre: action.payload,
      });

    case `GET_FILMS_BY_FILTER`:
      return Object.assign({}, state, {
        films: action.payload
      });

    case `LOAD_FILMS`:
      return Object.assign({}, state, {
        films: action.payload
      });
  }

  return state;
};

export {rootReducer, ActionCreators, Operations};
