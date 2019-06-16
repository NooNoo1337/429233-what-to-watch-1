import * as React from 'react';
import {configure, shallow} from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';

import withActiveTab from './with-active-tab';

configure({adapter: new Adapter()});

const MockComponent = () => <div/>;
const MockComponentWrapped = withActiveTab(MockComponent);
const mockEvent = {
  preventDefault: () => {},
};

describe(`WithActiveTab HOC`, () => {
  it(`should change active tab id by click`, () => {
    const wrapper = shallow(<MockComponentWrapped/>);

    expect(wrapper.props().activeTab).toEqual(1);
    wrapper.props().onTabClick(mockEvent, 2);
    expect(wrapper.props().activeTab).toEqual(2);
    wrapper.props().onTabClick(mockEvent, 3);
    expect(wrapper.props().activeTab).toEqual(3);
  });
});
