import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authorActions from '../../actions/authorActions';
import AuthorList from './AuthorList';
import { browserHistory } from 'react-router';

class AuthorsPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.redirectToAddAuthorPage = this.redirectToAddAuthorPage.bind(this);
  }

  redirectToAddAuthorPage() {
    browserHistory.push('/author');
  }

  render() {
    const {authors} = this.props;

    return (
      <div>
        <h1>Authors</h1>
        <input type="submit"
               value="Add Author"
               className="btn btn-primary"
               onClick={this.redirectToAddAuthorPage}/>
        <AuthorList authors={authors}/>
      </div>
    );
  }
}

AuthorsPage.propTypes = {
  authors: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

function getNumberOfCoursesByAuthorId(courses, authorId) {
  return courses.filter(course => course.authorId === authorId).length;
}

function mapStateToProps(state, ownProps) {

  const extendedAuthors = state.authors.map(author => {
    return Object.assign({}, author, { nCourses: getNumberOfCoursesByAuthorId(state.courses, author.id || '') });
  });

  return {
    authors: extendedAuthors
  };
}

function mapDispatchToProps(dispatch) {
  return {
    //createCourse: (course) => dispatch(courseActions.createCourse(course))
    actions: bindActionCreators(authorActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthorsPage);
