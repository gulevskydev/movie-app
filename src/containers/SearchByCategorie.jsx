import React, { useEffect } from "react";
import { connect } from "react-redux";
import queryString from "query-string";
import styled from "styled-components";
import { animateScroll as scroll } from "react-scroll";

import {
  selectedCategorie,
  getMoviesByCategories,
} from "../store/actions/actionCreators";

import { Title, Movies, Loader } from "../components/index";
const Wrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

// Discover Component
const SearchByCategorie = ({
  config,
  match,
  location,
  selectedCategorie,
  getMoviesByCategories,
  movies,
}) => {
  const params = queryString.parse(location.search);
  const { secure_base_url } = config.base.images;

  // Send url to setSelected Action Creator, it will check if is valid
  useEffect(() => {
    selectedCategorie(match.params.categorie);
    // Clean up to remove selected menu from state
    return () => selectedCategorie();
  }, [match.params.categorie]);

  // Call hook to fetch movies discover, pass in the url query
  useSearchMoviesByCategorie(
    match.params.categorie,
    getMoviesByCategories,
    params
  );

  // If loading
  if (movies.loading) {
    return <Loader />;
  }

  // Else return movies list
  return (
    <Wrapper>
      <Title title={config.selected} subtitle="movies" />
      <Movies movies={movies} secureUrl={secure_base_url} />
    </Wrapper>
  );
};

// Hook to fetch the movies, will be called everytime the route or the filters from the state change
function useSearchMoviesByCategorie(
  categorie,
  getMoviesByCategories,
  params,
  clearMovies
) {
  const query = categorie.replace(/\s+/g, "_").toLowerCase();
  useEffect(() => {
    scroll.scrollToTop({
      smooth: true,
    });
    getMoviesByCategories(query, params.page);
    // return () => clearMovies();
  }, [query, params.page]);
}

// Map State to Component Props
const mapStateToProps = ({ config, movies }) => {
  return { config, movies };
};

export default connect(mapStateToProps, {
  selectedCategorie,
  getMoviesByCategories,
})(SearchByCategorie);
