// import * as React from 'react';
// import renderer from 'react-test-renderer';
//
// import FilmsList from './films-list';
// const mockFilmCollection = [
//   {
//     'id': 1,
//     'name': `Fantastic Beasts`,
//     'preview_image': `https://es31-server.appspot.com/wtw/static/film/preview/what-we-do-in-the-shadows.jpg`,
//     'preview_video_link': `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
//   },
//   {
//     'id': 2,
//     'name': `Bohemian Rhapsody`,
//     'preview_image': `https://es31-server.appspot.com/wtw/static/film/preview/what-we-do-in-the-shadows.jpg`,
//     'preview_video_link': `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
//   },
//   {
//     'id': 3,
//     'name': `Moonrise Kingdom`,
//     'preview_image': `https://es31-server.appspot.com/wtw/static/film/preview/what-we-do-in-the-shadows.jpg`,
//     'preview_video_link': `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
//   },
//   {
//     'id': 4,
//     'name': `We need to talk about Kevin`,
//     'preview_image': `https://es31-server.appspot.com/wtw/static/film/preview/what-we-do-in-the-shadows.jpg`,
//     'preview_video_link': `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
//   },
// ];
//
// describe(`FilmsListComponent`, () => {
//   it(`should render component correctly`, () => {
//     const tree = renderer
//       .create(
//         <FilmsList
//         films={mockFilmCollection}
//         handleClick={() => {}}
//       />)
//       .toJSON();
//
//     expect(tree).toMatchSnapshot();
//   });
// });
