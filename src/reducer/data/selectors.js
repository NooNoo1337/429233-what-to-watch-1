import NameSpaces from '../name-spaces.js';
const NAME_SPACE = NameSpaces.DATA;

export const getFilms = (state) => {
  return state[NAME_SPACE].films;
};

export const getGenres = (state) => {
  const filmGenresCollection = state[NAME_SPACE].films.map((film) => film.genre);

  return [`All genres`, ...new Set(filmGenresCollection)];
};
