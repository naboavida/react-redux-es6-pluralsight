import expect from 'expect';
import { mount, shallow } from 'enzyme';
//import TestUtils from 'react-addons-test-utils';

import React from 'react';
import { ManageCoursePage } from './ManageCoursePage';

describe('Manage Course Page - connected component', () => {
  it('sets error message when trying to save CourseForm with an empty title', () => {

    const props = {
      authors: [],
      actions: { saveCourse: () => { return Promise.resolve(); } },
      course: {id: '', watchHref: '', title: '', authorId: '', length: '', category: ''}
    };

    // if we want to test Redux connect-related code, e.g. mapStateToProps
    //const wrapper = mount(<Provider store={store}><ManageCoursePage /></Provider>);

    // don't pass authors, the component should be resilient due to not being required on SelectInput.propTypes
    //const wrapper = mount(<ManageCoursePage authors={[]} course={{}} actions={{}} />);

    const wrapper = mount(<ManageCoursePage {...props} />);

    const saveButton = wrapper.find('input').last();
    expect(saveButton.prop('type')).toBe('submit');

    // simulate click, change, blur, etc
    saveButton.simulate('click');
    // TDD style: expect an error message
    expect(wrapper.state().errors.title).toBe('Title must be at least 5 characters.');

  });
});
