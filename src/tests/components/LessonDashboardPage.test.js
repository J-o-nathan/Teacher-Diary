import React from 'react';
import { shallow } from 'enzyme';
import LessonDashboardPage from '../../components/LessonDashboardPage';

test('should render LessonDashboardPage correctly', () => {
  const wrapper = shallow(<LessonDashboardPage />);
  expect(wrapper).toMatchSnapshot();
});
