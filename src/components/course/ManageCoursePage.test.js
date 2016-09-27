import expect from 'expect';
import { mount, shallow } from 'enzyme';
//import TestUtils from 'react-addons-test-utils';

import React from 'react';
import { ManageCoursePage } from './ManageCoursePage';

describe('Manage Course Page - connected component', () => {
  it('sets error message when trying to save CourseForm with an empty title', () => {

    // if we want to test Redux connect-related code, e.g. mapStateToProps
    //const wrapper = mount(<Provider store={store}><ManageCoursePage /></Provider>);

    const wrapper = mount(<ManageCoursePage authors={[]} />);
    wrapper.debug();

  });
});
