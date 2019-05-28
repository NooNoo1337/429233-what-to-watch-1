// const initialState = {
//   activeGenre: `All genres`,
//   films: [],
//   isAuthorizationRequired: false,
// };
//
// const ActionType = {
//   'CHANGE_GENRE_FILTER': `CHANGE_GENRE_FILTER`,
//   'GET_FILMS_BY_FILTER': `GET_FILMS_BY_FILTER`,
//   'LOAD_FILMS': `LOAD_FILMS`,
//   'REQUIRED_AUTHORIZATION': `REQUIRED_AUTHORIZATION`
// };
//
// const ActionCreators = {
//   changeGenreFilter: (genre) => {
//     return {
//       type: ActionType.CHANGE_GENRE_FILTER,
//       payload: genre,
//     };
//   },
//
//   getFilmsByFilter: (genre) => {
//     let filteredList = [];
//
//     if (genre === `All genres`) {
//       filteredList = initialState.films;
//     } else {
//       initialState.films.forEach((filmCard) => {
//         if (filmCard.genre === genre) {
//           filteredList.push(filmCard);
//         }
//       });
//     }
//     return {
//       type: ActionType.GET_FILMS_BY_FILTER,
//       payload: filteredList
//     };
//   },
//
//   loadFilms: (fetchedFilms) => {
//     return {
//       type: ActionType.LOAD_FILMS,
//       payload: fetchedFilms
//     };
//   },
//
//   requireAuthorization: (status) => {
//     return {
//       type: ActionType.REQUIRED_AUTHORIZATION,
//       payload: status
//     };
//   }
// };
//
// const Operations = {
//   loadFilms: () => (dispatch, _getState, api) => {
//     return api.get(`/films`)
//       .then((response) => dispatch(ActionCreators.loadFilms(response.data)));
//   }
// };
//
// const rootReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case ActionType.CHANGE_GENRE_FILTER:
//       return Object.assign({}, state, {
//         activeGenre: action.payload,
//       });
//
//     case ActionType.GET_FILMS_BY_FILTER:
//       return Object.assign({}, state, {
//         films: action.payload
//       });
//
//     case ActionType.LOAD_FILMS:
//       return Object.assign({}, state, {
//         films: action.payload
//       });
//
//     case ActionType.REQUIRED_AUTHORIZATION:
//       return Object.assign({}, state, {
//         isAuthorizationRequired: action.payload
//       });
//   }
//
//   return state;
// };
//
// export {rootReducer, ActionCreators, ActionType, Operations};
