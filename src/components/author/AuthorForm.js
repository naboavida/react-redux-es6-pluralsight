import React from 'react';
import TextInput from '../common/TextInput';
import SelectInput from '../common/SelectInput';

// destructured props for improved readibility
const AuthorForm = ({author, allCourses, onSave, onDelete, onChange, saving, deleting, errors}) => {
  return (
    <form>
      <h1>Manage Author</h1>
      <TextInput
        name="firstName"
        label="First Name"
        value={author.firstName}
        onChange={onChange}
        error={errors.title} />

      <TextInput
        name="lastName"
        label="Last Name"
        value={author.lastName}
        onChange={onChange}
        error={errors.category} />

      <div className="form-group"><label htmlFor="courses">Courses</label>
        <div className="field">
          {allCourses && allCourses.length > 0 ?
            allCourses.map(course => { return <span className="label label-primary" key={course.id}>{course.title}</span>; }) :
            <span className="label label-default">No courses yet...</span>}
        </div></div>

      <input
        type="submit"
        disabled={saving || deleting}
        value={saving ? 'Saving...' : 'Save'}
        className="btn btn-primary"
        onClick={onSave} />

      {author.id && <input
        type="submit"
        disabled={saving || deleting}
        value={deleting ? 'Deleting...' : 'Delete'}
        className="btn btn-danger pull-right"
        onClick={onDelete}/>}
    </form>
  );
};

//{ allCourses && allCourses.length > 0 ? allCourses.join(',') : 'No courses' }

AuthorForm.propTypes = {
  author: React.PropTypes.object.isRequired,
  allCourses: React.PropTypes.array,
  onSave: React.PropTypes.func.isRequired,
  onDelete: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired,
  saving: React.PropTypes.bool,
  deleting: React.PropTypes.bool,
  errors: React.PropTypes.object
};

export default AuthorForm;
