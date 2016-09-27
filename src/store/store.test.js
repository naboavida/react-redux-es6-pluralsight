import expect from 'expect';
import { createStore } from 'redux';
import rootReducer from '../reducers';
import initialState from '../reducers/initialState';
import * as courseActions from '../actions/courseActions';

describe('Store', () => {
  it('Should handle creating courses', () => {
    // arrange
    const store = createStore(rootReducer, initialState);
    const course = {title: 'Clean Course'};

    // act
    const action = courseActions.createCourseSuccess(course);
    store.dispatch(action);

    // assert
    const actualStored = store.getState().courses[0];
    const expected = Object.assign({}, course);

    expect(actualStored).toEqual(expected);

  });

  it('Should handle updating courses', () => {
    // arrange
    const store = createStore(rootReducer, initialState);
    const course = {id: 'clean-course', title: 'Clean Course'};

    // act create
    const action = courseActions.createCourseSuccess(course);
    store.dispatch(action);

    // assert create
    const actualStored = store.getState().courses[0];
    const expected = Object.assign({}, course);
    expect(actualStored).toEqual(expected);

    // act update
    const newTitle = 'New Title';
    const updatedCourse = {id: 'clean-course', title: newTitle};

    const updateAction = courseActions.updateCourseSuccess(updatedCourse);
    store.dispatch(updateAction);

    // assert update
    const actualUpdatedStore = store.getState().courses[0];
    const expectedUpdated = Object.assign({}, updatedCourse);
    expect(actualUpdatedStore).toEqual(expectedUpdated);


  });
});
