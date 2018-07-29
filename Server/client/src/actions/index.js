import axios from "axios";
import { FETCH_USER, FETCH_CLASS, FETCH_STUDENT } from "./types";

export const fetchUser = () => async dispatch => {
  const res = await axios.get("/api/current_user");
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const handleToken = token => async dispatch => {
  const res = await axios.post("/api/stripe", token);
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchClass = classId => async dispatch => {
  console.log("1");
  const res = await axios.post("/api/fetch/class", { id: classId });
  dispatch({ type: FETCH_CLASS, payload: res.data });
};

export const fetchStudent = studentId => async dispatch => {
  const res = await axios.post("/api/fetch/student", { id: studentId });
  dispatch({ type: FETCH_STUDENT, payload: res.data });
};
