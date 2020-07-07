import {COURSE_DELETE, COURSE_CREATE, COURSE_EDIT} from './types';

export const createCourse = (data) => async dispatch => {
  dispatch({type: COURSE_CREATE, payload: data});
}

export const updateCourse = (data) => async dispatch => {
  dispatch({type: COURSE_EDIT, payload: data});
}

export const deleteCourse = ({id}) => async dispatch => {
  dispatch({type: COURSE_DELETE, payload: id});
}