import expect from 'expect';
import courseReducer from './courseReducer';
import * as actions from '../actions/courseActions';

describe('Course Reducer', () => {
  it('should add a course to state when passed a CREATE_COURSE_SUCCESS action', () => {
    // arrange
    const initialState = {
      courses: [
        {title: 'A'},
        {title: 'B'}
      ]
    };
    const newCourse = {title: 'C'};
    const createCourseAction = actions.createCourseSuccess(newCourse);

    // act
    const newState = courseReducer(initialState.courses, createCourseAction);

    // assert
    expect(newState.length).toEqual(3);
    expect(newState[0].title).toEqual('A');
    expect(newState[2].title).toEqual('C');

  });



  it('should add a course to state when passed a UPDATE_COURSE_SUCCESS action', () => {
    // arrange
    const initialState = {
      courses: [
        {id: 'A', title: 'A'},
        {id: 'B', title: 'B'},
        {id: 'C', title: 'C'}
      ]
    };
    const newTitle = 'New Title';
    const updatedCourse = {id: 'B', title: newTitle};
    const updateCourseAction = actions.updateCourseSuccess(updatedCourse);

    // act
    const newState = courseReducer(initialState.courses, updateCourseAction);
    const updatedCourseState = newState.find(a => a.id === updatedCourse.id);
    const untouchedCourseState = newState.find(a => a.id === 'A');

    // assert
    expect(updatedCourseState.title).toEqual(newTitle);
    expect(untouchedCourseState.title).toEqual('A');
    expect(newState.length).toEqual(3);

  });
});
