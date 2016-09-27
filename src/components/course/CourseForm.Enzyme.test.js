import expect from 'expect';
import { mount, shallow } from 'enzyme';
//import TestUtils from 'react-addons-test-utils';

import React from 'react';
import CourseForm from './CourseForm';

function setup(course, saving) {
  let props = {
    course: course || {},
    saving: saving || false,
    errors: {},
    onSave: () => {},
    onChange: () => {}
  };
  return shallow(<CourseForm {...props} />);
}

describe('CourseForm via Enzyme', () => {
  it('renders form and h1', () => {
    const wrapper = setup({}, false);
    expect(wrapper.find('form').length).toBe(1);
    expect(wrapper.find('h1').text()).toEqual('Manage Course');
  });

  it('save button has label Save when not saving', () => {
    const wrapper = setup({}, false);
    expect(wrapper.find('input').props().value).toBe('Save');
  });

  it('save button has label Saving... when saving', () => {
    const wrapper = setup({}, true);
    expect(wrapper.find('input').props().value).toBe('Saving...');
  });

});
