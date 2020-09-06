import { combineReducers } from "redux";

import configReducer from "./configReducer";
import moviesReducer from "./moviesSearchReducer";
import moviePageReducer from "./moviePageReducer";
import actorReducer from "./actorReducer";
import moviesByActorReducer from "./moviesByActorReducer";
import moviesRecommendationsReducer from "./moviesRecommendationsReducer";

export default combineReducers({
  config: configReducer,
  movies: moviesReducer,
  movie: moviePageReducer,
  recommendations: moviesRecommendationsReducer,
  actor: actorReducer,
  recommendationByActor: moviesByActorReducer,
});
