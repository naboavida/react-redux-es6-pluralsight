import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authorActions from '../../actions/authorActions';
import AuthorForm from './AuthorForm';
import toastr from 'toastr';

// also export the ManageCoursePage as named export to be accessible on tests
export class ManageAuthorPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      author: Object.assign({}, this.props.author),
      errors: {},
      saving: false,
      deleting: false
    };

    this.updateAuthorState = this.updateAuthorState.bind(this);
    this.saveAuthor = this.saveAuthor.bind(this);
    this.deleteAuthor = this.deleteAuthor.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    // sometimes, React re-runs this lifecycle method just in case...
    // so it may be called multiple times

    const currId = this.props.author.id;
    const nextId = (nextProps.author || {}).id;

    if (currId !== nextId) {
      this.setState({
        author: Object.assign({}, nextProps.author)
      });
    }
  }


  updateAuthorState(event) {
    const field = event.target.name;
    let author = this.state.author;
    author[field] = event.target.value;
    return this.setState({author: author});
  }

  authorFormIsValid() {
    let formIsValid = true;
    let errors = {};

    if ((this.state.author.firstName || '').length < 2) {
      errors.title = 'Author\'s first name must be at least 2 characters.';
      formIsValid = false;
    }
    this.setState({ errors: errors });
    return formIsValid;
  }

  saveAuthor(event) {
    event.preventDefault();

    if (!this.authorFormIsValid()) {
      return;
    }

    this.setState({saving: true});

    this.props.actions.saveAuthor(this.state.author)
      .then(() => {
        this.setState({saving: false});
        toastr.success('Author saved!');
        this.context.router.push('/authors');
      })
      .catch((error) => {
        this.setState({saving: false});
        toastr.error(error);
      });
  }

  canDeleteAuthor(authorId) {
    // just in case
    if (!authorId) {
      return false;
    }

    // validate if author has courses...
    const authorCourses = getCoursesByAuthorId(this.props.courses, authorId);
    if (authorCourses.length > 0) {
      toastr.error("Cannot delete Author: Author still has courses!");
      return false;
    }

    return true;
  }

  deleteAuthor(event) {
    event.preventDefault();

    const authorId = this.props.params.id; // eslint-disable-line react/prop-types

    if(!this.canDeleteAuthor(authorId)) {
      return;
    }

    this.setState({deleting: true});

    this.props.actions.deleteAuthor(authorId)
      .then(() => {
        this.setState({deleting: false});
        toastr.success('Author deleted!');
        this.context.router.push('/authors');
      })
      .catch((error) => {
        this.setState({deleting: false});
        toastr.error(error);
      });

  }

  render() {
    return (
      <AuthorForm
        author={this.state.author}
        allCourses={this.props.courses}
        onChange={this.updateAuthorState}
        onSave={this.saveAuthor}
        onDelete={this.deleteAuthor}
        errors={this.state.errors}
        saving={this.state.saving}
        deleting={this.state.deleting}
      />
    );
  }
}

ManageAuthorPage.propTypes = {
  author: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

// pull in the React Router context so router is available on this.context.router
ManageAuthorPage.contextTypes = {
  router: PropTypes.object
};

function getCoursesByAuthorId(courses, authorId) {
  return courses.filter(course => course.authorId === authorId);
}

function getAuthorById(authors, id) {
  const author = authors.filter(author => author.id === id);
  if (author && author.length) {
    return author[0]; // expecting only one author that filter returns...
  }
  return null;
}

function mapStateToProps(state, ownProps) {
  const authorId = ownProps.params.id || ''; // from the URL path /author/:id
  let author = {id: '', firstName: '', lastName: '', courses: []};

  if (authorId && state.authors.length) {
    author = getAuthorById(state.authors, authorId);
  }

  return {
    author: author,
    authors: state.authors,
    courses: getCoursesByAuthorId(state.courses, authorId)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(authorActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageAuthorPage);
