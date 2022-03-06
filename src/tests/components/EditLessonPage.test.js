import React from 'react';
import { shallow } from 'enzyme';
import lessons from '../fixtures/lessons';
import { EditLessonPage } from '../../components/EditLessonPage';

let startEditLesson, startRemoveLesson, history, wrapper;

beforeEach(() => {
  startEditLesson = jest.fn();
  startRemoveLesson = jest.fn();
  history = { push: jest.fn() };
  wrapper = shallow(
    <EditLessonPage
      startEditLesson={startEditLesson}
      startRemoveLesson={startRemoveLesson}
      history={history}
      lesson={lessons[2]}
    />
  );
});

test('should render EditLessonPage', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should handle startEditLesson', () => {
  wrapper.find('LessonForm').prop('onSubmit')(lessons[2]);
  expect(history.push).toHaveBeenLastCalledWith('/');
  expect(startEditLesson).toHaveBeenLastCalledWith(lessons[2].id, lessons[2]);
});

test('should handle startRemoveLesson', () => {
  wrapper.find('button').simulate('click');
  expect(history.push).toHaveBeenLastCalledWith('/');
  expect(startRemoveLesson).toHaveBeenLastCalledWith({
    id: lessons[2].id
  });
});
