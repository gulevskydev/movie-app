import * as TYPES from "./actionTypes";
import history from "../../history";
import api from "../../utils/api";

export const initApp = () => async (dispatch) => {
  dispatch({ type: TYPES.INIT_LOADING });
  await dispatch(getConfig());
  await dispatch(getGenres());
  dispatch({ type: TYPES.INIT_LOADING_FINISHED });
};

export const getConfig = () => async (dispatch) => {
  const response = await api.get("/configuration");
  const { data } = response;
  console.log(data);
  dispatch({
    type: TYPES.GET_CONFIG,
    payload: data,
  });
};

// Get API data from search input
export const fetchMoviesSearch = (query, page) => async (dispatch) => {
  dispatch({ type: TYPES.FETCH_SEARCHING_MOVIES_LOADING });
  const response = await api.get("/search/movie", {
    params: {
      query,
      page,
    },
  });
  const { data } = response;
  await dispatch({
    type: TYPES.FETCH_SEARCHING_MOVIES,
    payload: data,
  });
  dispatch({ type: TYPES.FETCH_SEARCHING_MOVIES_LOADING_FINISHED });
};

// Get genres from API
export const getGenres = () => async (dispatch) => {
  const response = await api.get("/genre/movie/list");
  console.log(response);
  dispatch({
    type: TYPES.GET_GENRES,
    payload: response.data,
  });
};

// Get movies by categories
export const getMoviesByCategories = (categorie, page) => async (
  dispatch,
  getState
) => {
  const { selected } = getState().config;
  if (!selected) {
    return;
  } else {
    try {
      dispatch({ type: TYPES.FETCH_SEARCHING_MOVIES_LOADING });

      const response = await api.get(`/movie/${categorie}`, {
        params: {
          page,
        },
      });
      const { data } = response;
      await dispatch({
        type: TYPES.FETCH_SEARCHING_MOVIES_BY_CATEGORIES,
        payload: data,
      });
      dispatch({ type: TYPES.FETCH_SEARCHING_MOVIES_LOADING_FINISHED });
    } catch (error) {
      console.log(error);
    }
  }
};

// Set selected categorie in sidebar
export const selectedCategorie = (categorie) => (dispatch, getState) => {
  const { categories, genres } = getState().config;

  if (
    categories.find((name) => name === categorie) ||
    genres.find((genre) => genre.name === categorie)
  ) {
    dispatch({
      type: TYPES.SET_SELECTED_CATEGORIE,
      payload: categorie,
    });
  } else {
    dispatch({
      type: TYPES.SET_SELECTED_CATEGORIE,
      payload: "",
    });
  }
};

// Get movies filtered by genres
export const getMoviesByGenre = (genre, page, sort) => async (
  dispatch,
  getState
) => {
  const { genres, selected } = getState().config;

  if (!selected) {
    return;
  } else {
    try {
      dispatch({ type: TYPES.FETCH_SEARCHING_MOVIES_LOADING });
      const genreIndex = genres
        .filter((el) => genre === el.name)
        .map((e) => e.id)
        .join("");
      const response = await api.get(`/discover/movie`, {
        params: {
          with_genres: genreIndex,
          page,
          sort_by: sort,
          "vote_count.gte": 1000,
        },
      });

      const { data } = response;
      dispatch({
        type: TYPES.FETCH_MOVIES_BY_GENRE,
        payload: data,
      });
      dispatch({ type: TYPES.FETCH_SEARCHING_MOVIES_LOADING_FINISHED });
    } catch (error) {
      console.log(error);
    }
  }
};

//Get selected movie page info
export const getMovie = (id) => async (dispatch) => {
  try {
    dispatch({ type: TYPES.FETCH_MOVIEPAGE_LOADING });
    const response = await api.get(`/movie/${id}`, {
      params: {
        append_to_response: "videos",
      },
    });
    const { data } = response;
    await dispatch({
      type: TYPES.FETCH_MOVIEPAGE,
      payload: data,
    });
    console.log("MOVIE", data);
    await dispatch(getCredits());
    dispatch({ type: TYPES.FETCH_MOVIEPAGE_FINISHED });
  } catch (error) {
    console.log(error);
  }
};

// Credits of single movie
export const getCredits = () => async (dispatch, getState) => {
  const { id } = getState().movie;

  try {
    const response = await api.get(`/movie/${id}/credits`);
    const { data } = response;
    dispatch({
      type: TYPES.FETCH_GET_CREDITS,
      payload: data.cast,
    });
  } catch (error) {
    console.log(error);
  }
};

// Get movies recomendation
export const getMoviesRecommendations = (id, page) => async (dispatch) => {
  try {
    dispatch({ type: TYPES.FETCH_MOVIES_RECOMMENDATIONS_LOADING });
    const response = await api.get(`/movie/${id}/recommendations`, {
      params: {
        page,
      },
    });
    const { data } = response;
    await dispatch({
      type: TYPES.FETCH_MOVIES_RECOMMENDATIONS,
      payload: data,
    });
    dispatch({ type: TYPES.FETCH_MOVIES_RECOMMENDATIONS_LOADING_FINISHED });
  } catch (err) {
    console.log(err);
  }
};

export const getActor = (id) => async (dispatch) => {
  try {
    dispatch({ type: TYPES.FETCH_ACTOR_LOADING });
    const response = await api.get(`/person/${id}`);
    const { data } = response;
    await dispatch({
      type: TYPES.FETCH_ACTOR,
      payload: data,
    });
    dispatch({ type: TYPES.FETCH_ACTOR_LOADING_FINISHED });
  } catch (error) {
    console.log(error);
  }
};

export const getMoviesByActor = (id, page, sort) => async (dispatch) => {
  try {
    dispatch({ type: TYPES.FETCH_MOVIES_BY_ACTOR_LOADING });
    const response = await api.get(`/discover/movie`, {
      params: {
        with_cast: id,
        page,
        sort_by: sort,
      },
    });
    const { data } = response;
    await dispatch({
      type: TYPES.FETCH_MOVIES_BY_ACTOR,
      payload: data,
    });
    dispatch({ type: TYPES.FETCH_MOVIES_BY_ACTOR_LOADING_FINISHED });
  } catch (error) {
    console.log(error);
  }
};
