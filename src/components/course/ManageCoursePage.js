import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as courseActions from '../../actions/courseActions';
import { authorsFormattedForDropdown } from '../../selectors/selectors';
import CourseForm from './CourseForm';
import toastr from 'toastr';

// also export the ManageCoursePage as named export to be accessible on tests
export class ManageCoursePage extends React.Component {
  constructor(props, context) {
    super(props, context);

    // we need something to receive the course from mapStateToProps
    this.state = {
      course: Object.assign({}, this.props.course),
      errors: {},
      saving: false
    };

    this.updateCourseState = this.updateCourseState.bind(this);
    this.saveCourse = this.saveCourse.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    // sometimes, React re-runs this lifecycle method just in case...
    // so it may be called multiple times
    if (this.props.course.id !== nextProps.course.id) {
      this.setState({
        course: Object.assign({}, nextProps.course)
      });
    }
  }

  updateCourseState(event) {
    const field = event.target.name;
    let course = this.state.course;
    course[field] = event.target.value;
    return this.setState({course: course});
  }

  courseFormIsValid() {
    let formIsValid = true;
    let errors = {};

    if ((this.state.course.title || '').length < 5) {
      errors.title = 'Title must be at least 5 characters.';
      formIsValid = false;
    }
    this.setState({ errors: errors });
    return formIsValid;
  }

  saveCourse(event) {
    event.preventDefault();

    if (!this.courseFormIsValid()) {
      return;
    }

    this.setState({saving: true});

    this.props.actions.saveCourse(this.state.course)
      .then(() => {
        this.setState({saving: false});
        toastr.success('Course saved!');
        this.context.router.push('/courses');
      })
      .catch((error) => {
        this.setState({saving: false});
        toastr.error(error);
      });
  }

  render() {
    return (
        <CourseForm
          course={this.state.course}
          allAuthors={this.props.authors}
          onChange={this.updateCourseState}
          onSave={this.saveCourse}
          errors={this.state.errors}
          saving={this.state.saving}
        />
    );
  }
}

ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

// pull in the React Router context so router is available on this.context.router
ManageCoursePage.contextTypes = {
  router: PropTypes.object
};

function getCourseById(courses, id) {
  const course = courses.filter(course => course.id === id);
  if (course && course.length) {
    return course[0]; // expecting only one course that filter returns...
  }
  return null;
}

function mapStateToProps(state, ownProps) {
  const courseId = ownProps.params.id; // from the URL path /course/:id
  let course = {id: '', watchHref: '', title: '', authorId: '', length: '', category: ''};

  if (courseId && state.courses.length) {
    course = getCourseById(state.courses, courseId);
  }

  return {
    course: course,
    authors: authorsFormattedForDropdown(state.authors)
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(courseActions, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
