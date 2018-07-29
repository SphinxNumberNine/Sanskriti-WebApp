import axios from "axios";
import { FETCH_USER, FETCH_CLASS, FETCH_STUDENT, GET_CLASSES } from "./types";

// Returns current logged in user
export const fetchUser = () => async dispatch => {
  const res = await axios.get("/api/current_user");
  dispatch({ type: FETCH_USER, payload: res.data });
};

// handles token from Stripe
export const handleToken = token => async dispatch => {
  const res = await axios.post("/api/stripe", token);
  dispatch({ type: FETCH_USER, payload: res.data });
};

// returns one specific class from given classId
export const fetchClass = classId => async dispatch => {
  console.log("1");
  const res = await axios.post("/api/fetch/class", { id: classId });
  dispatch({ type: FETCH_CLASS, payload: res.data });
};

//returns one specific student from given studentId
export const fetchStudent = studentId => async dispatch => {
  const res = await axios.post("/api/fetch/student", { id: studentId });
  dispatch({ type: FETCH_STUDENT, payload: res.data });
};

export const getAllClasses = () => async dispatch => {
  const res = await axios.get("/api/classes");
  dispatch({ type: GET_CLASSES, payload: res.data });
};
