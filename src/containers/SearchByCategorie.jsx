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

  useEffect(() => {
    selectedCategorie(match.params.categorie);
    return () => selectedCategorie();
  }, [match.params.categorie]);

  // Call hook to fetch movies
  useSearchMoviesByCategorie(
    match.params.categorie,
    getMoviesByCategories,
    params
  );

  // If loading
  if (movies.loading) {
    return <Loader />;
  }

  return (
    <Wrapper>
      <Title title={config.selected} subtitle="movies" />
      <Movies movies={movies} secureUrl={secure_base_url} />
    </Wrapper>
  );
};

function useSearchMoviesByCategorie(categorie, getMoviesByCategories, params) {
  const query = categorie.replace(/\s+/g, "_").toLowerCase();
  useEffect(() => {
    scroll.scrollToTop({
      smooth: true,
    });
    getMoviesByCategories(query, params.page);
  }, [query, params.page]);
}

const mapStateToProps = ({ config, movies }) => {
  return { config, movies };
};

export default connect(mapStateToProps, {
  selectedCategorie,
  getMoviesByCategories,
})(SearchByCategorie);
