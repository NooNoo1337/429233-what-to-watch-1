import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import withGenres from './with-genres.js';

Enzyme.configure({adapter: new Adapter()});

const MockComponent = () => <div/>;
const MockComponentWrapped = withGenres(MockComponent);
const mockFilms = [
  {
    id: 1,
    genre: `Comedies`,
    title: `Fantastic Beasts`,
    preview: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    src: ``
  },
  {
    id: 2,
    genre: `Crime`,
    title: `Bohemian Rhapsody`,
    preview: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    src: ``
  },
];

describe(`WithGenres HOC`, () => {
  it(`should pass genres as a props`, () => {
    const wrapper = shallow(<MockComponentWrapped films={mockFilms}/>);

    expect(wrapper.props().genres).toEqual([`All genres`, `Comedies`, `Crime`]);
  });
});
