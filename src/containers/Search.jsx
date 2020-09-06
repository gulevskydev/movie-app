import React, { useEffect } from "react";
import { connect } from "react-redux";
import queryString from "query-string";
// import NotFound from '../components/NotFound';
import styled from "styled-components";
import { animateScroll as scroll } from "react-scroll";
import { Title, Movies, Loader } from "../components/index";
import { fetchMoviesSearch } from "../store/actions/actionCreators";
// import Loader from '../components/Loader';

const Wrap = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const Search = ({ config, match, location, fetchMoviesSearch, movies }) => {
  const { input } = match.params;
  const { images } = config.base;
  const { secure_base_url } = config.base.images;
  const params = queryString.parse(location.search);

  useEffect(() => {
    scroll.scrollToTop({
      smooth: true,
    });
    fetchMoviesSearch(input, params.page);
  }, [input, params.page]);
  // Fetch movies hook
  // useFetchMoviesSearch(query, fetchMoviesSearch, params);

  // If loading
  if (movies.loading) {
    return <Loader />;
  }

  //If there are no results
  // else if (movies.total_results === 0) {
  //   return (
  //     <NotFound
  //       title="Sorry!"
  //       subtitle={`There were no results for ${query}...`}
  //     />
  //   );
  // }

  // Else show the results
  else {
    return (
      <Wrap>
        <Title title={input} subtitle="search results" />
        <Movies movies={movies} secureUrl={secure_base_url} />
      </Wrap>
    );
  }
};

// Hook to fetch the movies, will be called everytime the route for the search changes
// function useFetchMoviesSearch(query, getMoviesSearch, params) {
//   useEffect(() => {
//     scroll.scrollToTop({
//       smooth: true,
//     });
//     getMoviesSearch(query, params.page);
//     // return () => clearMovies();
//   }, [query, params.page]);
// }

// Map State to Component Props
const mapStateToProps = ({ config, movies }) => {
  return { config, movies };
};

export default connect(mapStateToProps, { fetchMoviesSearch })(Search);
