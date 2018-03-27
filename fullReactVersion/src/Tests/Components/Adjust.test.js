import React from 'react';
import Adjust from '../../Components/Adjust';
import { shallow } from 'enzyme';

test('Should render component correctly.', () => {
  const wrapper = shallow(<Adjust />);
  expect(wrapper).toMatchSnapshot();
});