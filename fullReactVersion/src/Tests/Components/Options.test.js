import React from 'react';
import { shallow } from 'enzyme';
import Options from '../../Components/Options';

test('Should render component correctly', () => {
  const wrapper = shallow(<Options />);
  expect(wrapper).toMatchSnapshot();
});