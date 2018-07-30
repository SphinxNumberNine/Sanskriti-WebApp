import { FETCH_CLASS, FETCH_STUDENT } from "../actions/types";

export default function(state = null, action) {
  switch (action.type) {
    case FETCH_CLASS:
      console.log("2");
      return action.payload || false;
    case FETCH_STUDENT:
      return action.payload || false;
    default:
      return state;
  }
}
