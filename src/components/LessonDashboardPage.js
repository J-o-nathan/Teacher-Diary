import React from 'react';
import LessonList from './LessonList';
import LessonListFilters from './LessonListFilters';

const LessonDashboardPage = () => (
  <div>
    <LessonListFilters />
    <LessonList />
  </div>
);

export default LessonDashboardPage;
