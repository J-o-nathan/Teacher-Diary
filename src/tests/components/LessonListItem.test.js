import React from 'react';
import { shallow } from 'enzyme';
import lessons from '../fixtures/lessons';
import LessonListItem from '../../components/LessonListItem';

test('should render LessonListItem correctly', () => {
  const wrapper = shallow(<LessonListItem {...lessons[0]} />);
  expect(wrapper).toMatchSnapshot();
});
