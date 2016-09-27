import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function ajaxStatusReducer(state = initialState.ajaxCallsInProgress, action) {
  if (action.type === types.AJAX_CALL_BEGIN) {
    return state + 1;
  } else if (action.type.substring(action.type.length - 8) === '_SUCCESS' ||
             action.type.substring(action.type.length - 6) === '_ERROR') {
    return state - 1;
  }

  return state;
}
