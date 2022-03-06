import React from 'react';
import { connect } from 'react-redux';
import LessonForm from './LessonForm';
import { startEditLesson, startRemoveLesson } from '../actions/lessons';

export class EditLessonPage extends React.Component {
  onSubmit = (lesson) => {
    this.props.startEditLesson(this.props.lesson.id, lesson);
    this.props.history.push('/');
  };
  onRemove = () => {
    this.props.startRemoveLesson({ id: this.props.lesson.id });
    this.props.history.push('/');
  };
  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">Edit Lesson</h1>
          </div>
        </div>
        <div className="content-container">
          <LessonForm
            lesson={this.props.lesson}
            buttonName="Save Changes"
            onSubmit={this.onSubmit}
          />
          <button className="button button--secondary" onClick={this.onRemove}>Delete</button>
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state, props) => ({
  lesson: state.lessons.find((lesson) => lesson.id === props.match.params.id)
});

const mapDispatchToProps = (dispatch, props) => ({
  startEditLesson: (id, lesson) => dispatch(startEditLesson(id, lesson)),
  startRemoveLesson: (data) => dispatch(startRemoveLesson(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditLessonPage);
