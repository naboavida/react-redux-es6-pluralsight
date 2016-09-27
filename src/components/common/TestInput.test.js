import expect from 'expect';
import { mount, shallow } from 'enzyme';
//import TestUtils from 'react-addons-test-utils';

import React from 'react';
import TextInput from './TextInput';

function setup(name, label, value, error) {
  let props = {
    name: name || '',
    label: label || '',
    value: value || '',
    error: error || '',
    onChange: () => {}
  };

  return shallow(<TextInput {...props} />);
}

describe('TextInput via Enzyme', () => {
  it('renders text input with no value', () => {
    const wrapper = setup('title', 'Title');
    //console.log(wrapper.debug());

    expect(wrapper.find('div.form-group').length).toBe(1);

    expect(wrapper.find('label').props().htmlFor).toEqual('title');
    expect(wrapper.find('label').text()).toEqual('Title');

    expect(wrapper.find('div.field').length).toBe(1);
    expect(wrapper.find('input').length).toBe(1);
    expect(wrapper.find('input').props().name).toEqual('title');
    expect(wrapper.find('input').props().value).toEqual('');

    expect(wrapper.find('div.alert').length).toBe(0);
  });

  it('renders text input with value', () => {
    const wrapper = setup('title', 'Title', 'Input value');
    //console.log(wrapper.debug());

    expect(wrapper.find('div.form-group').length).toBe(1);

    expect(wrapper.find('label').props().htmlFor).toEqual('title');
    expect(wrapper.find('label').text()).toEqual('Title');

    expect(wrapper.find('div.field').length).toBe(1);
    expect(wrapper.find('input').length).toBe(1);
    expect(wrapper.find('input').props().name).toEqual('title');
    expect(wrapper.find('input').props().value).toEqual('Input value');

    expect(wrapper.find('div.alert').length).toBe(0);
  });


  it('renders text input with value and error', () => {
    const wrapper = setup('title', 'Title', 'Input value', 'WHAT A MISTAKE!!');
    //console.log(wrapper.debug());

    expect(wrapper.find('div.form-group').length).toBe(1);

    expect(wrapper.find('label').props().htmlFor).toEqual('title');
    expect(wrapper.find('label').text()).toEqual('Title');

    expect(wrapper.find('div.field').length).toBe(1);
    expect(wrapper.find('input').length).toBe(1);
    expect(wrapper.find('input').props().name).toEqual('title');
    expect(wrapper.find('input').props().value).toEqual('Input value');

    expect(wrapper.find('div.alert').length).toBe(1);
    expect(wrapper.find('div.alert').text()).toEqual('WHAT A MISTAKE!!');
  });


});
