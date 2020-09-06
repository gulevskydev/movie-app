import * as TYPES from "../actions/actionTypes";

const initState = {
  loading: true,
};

export default (state = initState, action) => {
  switch (action.type) {
    case TYPES.FETCH_SEARCHING_MOVIES_LOADING:
      return { ...state, loading: true };
    case TYPES.FETCH_SEARCHING_MOVIES_LOADING_FINISHED:
      return { ...state, loading: false };
    case TYPES.FETCH_SEARCHING_MOVIES:
    case TYPES.FETCH_SEARCHING_MOVIES_BY_CATEGORIES:
    case TYPES.FETCH_MOVIES_BY_GENRE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
