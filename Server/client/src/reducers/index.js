import { combineReducers } from "redux";
import authReducer from "./authReducer";
import fetchReducer from "./fetchReducer";
import classesReducer from './classesReducer';

export default combineReducers({
  auth: authReducer,
  requestedFetch: fetchReducer,
  classes: classesReducer
});
