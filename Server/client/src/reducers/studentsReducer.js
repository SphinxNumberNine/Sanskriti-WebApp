import { GET_CLASSES } from "../actions/types";

export default function(state = null, action) {
  switch (action.type) {
    case GET_CLASSES:
      return action.payload || false;
    default:
      return state;
  }
}
