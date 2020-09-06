import * as TYPES from "../actions/actionTypes";

const initState = {
  loading: true,
  categories: ["Popular", "Top Rated", "Upcoming"],
};

export default (state = initState, action) => {
  switch (action.type) {
    case TYPES.INIT_LOADING:
      return { ...state, loading: true };
    case TYPES.INIT_LOADING_FINISHED:
      return { ...state, loading: false };
    case TYPES.GET_CONFIG:
      return { ...state, base: action.payload };
    case TYPES.GET_GENRES:
      return { ...state, ...action.payload };
    case TYPES.SET_SELECTED_CATEGORIE:
      return { ...state, selected: action.payload };
    default:
      return state;
  }
};
