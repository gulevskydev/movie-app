import * as TYPES from "../actions/actionTypes";

export default (state = { loading: true }, action) => {
  switch (action.type) {
    case TYPES.FETCH_MOVIES_RECOMMENDATIONS:
      return { ...state, ...action.payload };
    case TYPES.FETCH_MOVIES_RECOMMENDATIONS_LOADING:
      return { ...state, loading: true };
    case TYPES.FETCH_MOVIES_RECOMMENDATIONS_LOADING_FINISHED:
      return { ...state, loading: false };
    default:
      return state;
  }
};
