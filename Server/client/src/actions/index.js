import axios from "axios";
import { FETCH_USER, GET_STUDENTS} from "./types";

export const fetchUser = () => async dispatch => {
  const res = await axios.get("/api/current_user");
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const handleToken = token => async dispatch => {
  const res = await axios.post("/api/stripe", token);
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const getStudents = parentId => async dispatch => {
  const res = await axios.post("/api/students", {parentUser: parentId});
  dispatch({ type: GET_STUDENTS, payload: res.data });
}
