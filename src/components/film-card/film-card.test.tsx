// import React from 'react';
// import renderer from 'react-test-renderer';
//
// import FilmCard from './film-card.jsx';
//
// const mockFilm = {
//   'id': 1,
//   'name': `Fantastic Beasts`,
//   'preview_image': `https://es31-server.appspot.com/wtw/static/film/preview/what-we-do-in-the-shadows.jpg`,
//   'preview_video_link': `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
// };
//
// describe(`FilmCardComponent`, () => {
//   it(`should render component correctly`, () => {
//     const tree = renderer
//       .create(<FilmCard
//         film={mockFilm}
//         key={mockFilm.id}
//         handleClick={() => {}}
//         handleMouseEnter={() => {}}
//         handleMouseLeave={() => {}}
//       />)
//       .toJSON();
//
//     expect(tree).toMatchSnapshot();
//   });
// });
