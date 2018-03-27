import React from 'react';
import Display from '../../Components/Display';
import { shallow } from 'enzyme';

test('Should render component correctly.', () => {
  const wrapper = shallow(<Display />);
  expect(wrapper).toMatchSnapshot();
});