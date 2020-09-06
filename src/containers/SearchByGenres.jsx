import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import queryString from "query-string";
import styled from "styled-components";
import { animateScroll as scroll } from "react-scroll";

import {
  selectedCategorie,
  getMoviesByGenre,
} from "../store/actions/actionCreators";

import { Title, Movies, Sort, Loader } from "../components/index";

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

// Genres Component
// Gets config object from State, Match from Router, Action Creators to set Selected menu and Movies from Store
const SearchByGenres = ({
  config,
  match,
  selectedCategorie,
  getMoviesByGenre,
  movies,
  location,
}) => {
  const [sortOption, setSortOption] = useState({
    value: "popularity.desc",
    label: "Popularity",
  });
  const params = queryString.parse(location.search);
  const { secure_base_url } = config.base.images;

  // Send url to setSelected Action Creator, it will check if is valid, and set the header accordingly
  useEffect(() => {
    selectedCategorie(match.params.name);
    // Clean up to remove selected menu from state
    return () => selectedCategorie();
  }, [match.params.name]);

  // Call hook to fetch movies of the genre
  useFetchMoviesGenre(
    match.params.name,
    getMoviesByGenre,
    params,
    sortOption.value
  );

  // If loading
  if (movies.loading) {
    return <Loader />;
  }

  return (
    <Wrapper>
      <Title title={config.selected} subtitle="movies" />
      <Sort option={sortOption} setOption={setSortOption} />
      <Movies movies={movies} secureUrl={secure_base_url} />
    </Wrapper>
  );
};

// Hook to fetch the movies, will be called everytime the route or the filters from the state change
function useFetchMoviesGenre(genre, getMoviesByGenre, params, sortOption) {
  useEffect(() => {
    scroll.scrollToTop({
      smooth: true,
    });
    getMoviesByGenre(genre, params.page, sortOption);
    // return () => clearMovies();
  }, [genre, params.page, sortOption]);
}

// Map State to Component Props
const mapStateToProps = ({ config, movies }) => {
  return { config, movies };
};

export default connect(mapStateToProps, {
  selectedCategorie,
  getMoviesByGenre,
})(SearchByGenres);
