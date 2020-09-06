import * as TYPES from "../actions/actionTypes";

export default (state = { loading: true }, action) => {
  switch (action.type) {
    case TYPES.FETCH_GET_CREDITS:
      return { ...state, list: action.payload };
    case TYPES.FETCH_MOVIEPAGE:
      return { ...state, ...action.payload };
    case TYPES.FETCH_MOVIEPAGE_LOADING:
      return { ...state, loading: true };
    case TYPES.FETCH_MOVIEPAGE_FINISHED:
      return { ...state, loading: false };
    default:
      return state;
  }
};
