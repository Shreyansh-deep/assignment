import { combineReducers } from 'redux';
import {configureStore} from '@reduxjs/toolkit'
import taskReducer from '../reducers/reducer';

const rootReducer = combineReducers({
  task: taskReducer
});

const store = configureStore({
  reducer: rootReducer
});

export default store;