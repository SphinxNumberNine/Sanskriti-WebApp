import { combineReducers } from "redux";
import authReducer from "./authReducer";
import fetchReducer from "./fetchReducer";
import studentsReducer from './studentsReducer';

export default combineReducers({
  auth: authReducer,
  requestedFetch: fetchReducer,
  students: studentsReducer
});
