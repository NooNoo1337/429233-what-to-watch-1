import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import withActiveCard from './with-active-card';

Enzyme.configure({adapter: new Adapter()});

const MockComponent = () => <div/>;
const MockComponentWrapped = withActiveCard(MockComponent);
const mockEvent = {
  target: {
    classList: {
      contains: jest.fn(() => (true))
    },
    dataset: {
      filmId: 1
    }
  }
};

describe(`WithActiveCard HOC`, () => {
  it(`should change activeCardId on mouse enter`, () => {
    const wrapper = shallow(<MockComponentWrapped/>);

    expect(wrapper.props().activeCardId).toEqual(null);

    wrapper.props().onMouseEnter(mockEvent);
    expect(wrapper.props().activeCardId).toEqual(1);
  });

  it(`should reset activeCardId to null on mouse leave`, () => {
    const wrapper = shallow(<MockComponentWrapped/>);

    expect(wrapper.props().activeCardId).toEqual(null);

    wrapper.props().onMouseEnter(mockEvent);
    expect(wrapper.props().activeCardId).toEqual(1);

    wrapper.props().onMouseLeave();
    expect(wrapper.props().activeCardId).toEqual(null);
  });
});
