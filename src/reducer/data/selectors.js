import {createSelector} from 'reselect';
import NameSpaces from '../name-spaces.js';

const NAME_SPACE = NameSpaces.DATA;

export const getFilms = (state) => {
  return state[NAME_SPACE].films;
};

export const getActiveGenre = (state) => {
  return state[NAME_SPACE].activeGenre;
};

export const getGenres = createSelector(
    getFilms, (films) => films.map((film) => film.genre)
);

export const getUniqGenres = createSelector(
    getGenres, (genres) => ([`All genres`, ...new Set(genres)])
);

export const getFilteredFilms = createSelector(
    getFilms,
    getActiveGenre,
    (films, activeGenre) => films.filter((film) => film.genre === activeGenre)
);
