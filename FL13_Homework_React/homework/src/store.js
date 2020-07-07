import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import courses from './reducers/courseReducer';
import thunk from 'redux-thunk';
const rootReducer = combineReducers({
  courses,
});

const middlewares = [thunk];

const initialState = {};

const store = createStore(
  rootReducer,
  initialState,
  compose(applyMiddleware(...middlewares))
);


export default store;