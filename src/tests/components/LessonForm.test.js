import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import LessonForm from '../../components/LessonForm';
import lessons from '../fixtures/lessons';

test('should render LessonForm correctly', () => {
  const wrapper = shallow(<LessonForm />);
  expect(wrapper).toMatchSnapshot();
});

test('should render LessonForm correctly with lesson data', () => {
  const wrapper = shallow(<LessonForm lesson={lessons[1]} />);
  expect(wrapper).toMatchSnapshot();
});

test('should render error for invalid form submission', () => {
  const wrapper = shallow(<LessonForm />);
  expect(wrapper).toMatchSnapshot();
  wrapper.find('form').simulate('submit', {
    preventDefault: () => { }
  });
  expect(wrapper.state('error').length).toBeGreaterThan(0);
  expect(wrapper).toMatchSnapshot();
});

test('should set period on input change', () => {
  const value = 3
  const wrapper = shallow(<LessonForm />);
  wrapper.find('input').at(0).simulate('change', {
    target: { value }
  });
  expect(wrapper.state('period')).toBe(value);
});

test('should set note on textarea change', () => {
  const value = 'New note value';
  const wrapper = shallow(<LessonForm />);
  wrapper.find('textarea').simulate('change', {
    target: { value }
  });
  expect(wrapper.state('note')).toBe(value);
});

test('should set year if valid input', () => {
  const value = 8;
  const wrapper = shallow(<LessonForm />);
  wrapper.find('input').at(1).simulate('change', {
    target: { value }
  });
  expect(wrapper.state('year')).toBe(value);
});

test('should not set year if invalid input', () => {
  const value = '12.122';
  const wrapper = shallow(<LessonForm />);
  wrapper.find('input').at(1).simulate('change', {
    target: { value }
  });
  expect(wrapper.state('year')).toBe('');
});

test('should call onSubmit prop for valid form submission', () => {
  const onSubmitSpy = jest.fn();
  const wrapper = shallow(<LessonForm lesson={lessons[0]} onSubmit={onSubmitSpy} />);
  wrapper.find('form').simulate('submit', {
    preventDefault: () => { }
  });
  expect(wrapper.state('error')).toBe('');
  expect(onSubmitSpy).toHaveBeenLastCalledWith({
    period: lessons[0].period,
    year: lessons[0].year,
    note: lessons[0].note,
    createdAt: lessons[0].createdAt
  });
});

test('should set new date on date change', () => {
  const now = moment();
  const wrapper = shallow(<LessonForm />);
  wrapper.find('SingleDatePicker').prop('onDateChange')(now);
  expect(wrapper.state('createdAt')).toEqual(now);
});

test('should set calendar focus on change', () => {
  const focused = true;
  const wrapper = shallow(<LessonForm />);
  wrapper.find('SingleDatePicker').prop('onFocusChange')({ focused });
  expect(wrapper.state('calendarFocused')).toBe(focused);
});
