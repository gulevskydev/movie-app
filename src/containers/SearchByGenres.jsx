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

  useEffect(() => {
    selectedCategorie(match.params.name);
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

function useFetchMoviesGenre(genre, getMoviesByGenre, params, sortOption) {
  useEffect(() => {
    scroll.scrollToTop({
      smooth: true,
    });
    getMoviesByGenre(genre, params.page, sortOption);
  }, [genre, params.page, sortOption]);
}

const mapStateToProps = ({ config, movies }) => {
  return { config, movies };
};

export default connect(mapStateToProps, {
  selectedCategorie,
  getMoviesByGenre,
})(SearchByGenres);
