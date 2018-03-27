import React from 'react';
import PomodoroClock from '../../Components/PomodoroClock';
import { shallow } from 'enzyme';

test('Should render component correctly.', () => {
  const wrapper = shallow(<PomodoroClock />);
  expect(wrapper).toMatchSnapshot();
});