import React from 'react';
import { shallow } from 'enzyme';
import { AddLessonPage } from '../../components/AddLessonPage';
import lessons from '../fixtures/lessons';

let startAddLesson, history, wrapper;

beforeEach(() => {
  startAddLesson = jest.fn();
  history = { push: jest.fn() };
  wrapper = shallow(<AddLessonPage startAddLesson={startAddLesson} history={history} />);
});

test('should render AddLessonPage correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should handle onSubmit', () => {
  wrapper.find('LessonForm').prop('onSubmit')(lessons[1]);
  expect(history.push).toHaveBeenLastCalledWith('/');
  expect(startAddLesson).toHaveBeenLastCalledWith(lessons[1]);
});
