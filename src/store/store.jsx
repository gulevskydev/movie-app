import { compose, applyMiddleware, createStore } from "redux";
import reduxThunk from "redux-thunk";
import reducers from "./reducers/reducers";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(reduxThunk))
);

export default store;
