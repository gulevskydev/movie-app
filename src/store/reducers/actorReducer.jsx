import * as TYPES from "../actions/actionTypes";

export default (state = { loading: true }, action) => {
  switch (action.type) {
    case TYPES.FETCH_ACTOR_LOADING:
      return { ...state, loading: true };
    case TYPES.FETCH_ACTOR_LOADING_FINISHED:
      return { ...state, loading: false };
    case TYPES.FETCH_ACTOR:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
