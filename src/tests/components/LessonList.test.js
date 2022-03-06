import React from 'react';
import { shallow } from 'enzyme';
import { LessonList } from '../../components/LessonList';
import lessons from '../fixtures/lessons';

test('should render LessonList with lessons', () => {
  const wrapper = shallow(<LessonList lessons={lessons} />);
  expect(wrapper).toMatchSnapshot();
});

test('should render LessonList with empty message', () => {
  const wrapper = shallow(<LessonList lessons={[]} />);
  expect(wrapper).toMatchSnapshot();
});
