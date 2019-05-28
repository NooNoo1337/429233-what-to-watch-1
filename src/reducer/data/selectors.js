export const getFilms = (state) => {
  return state.data.films;
};

export const getGenres = (state) => {
  const filmGenresCollection = state.data.films.map((film) => film.genre);

  return [`All genres`, ...new Set(filmGenresCollection)];
};
