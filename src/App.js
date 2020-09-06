import React, { useEffect, useState } from "react";
import history from "./history";
import styled from "styled-components";
import { Router, Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { initApp } from "./store/actions/actionCreators";

//components
import { SearchComponent } from "./components/index";
//containers
import {
  Search,
  Sidebar,
  SearchByCategorie,
  SearchByGenres,
  MoviePage,
  Actor,
} from "./containers/index";

// styles
const MainContainerWrap = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.isMobile ? "column" : "row")};
  position: relative;
  align-items: flex-start;
  height: 100%;
  width: 100%;
  user-select: none;
`;

const MainContentWrap = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 6rem 4rem;
  @media ${(props) => props.theme.mediaQueries.larger} {
    padding: 6rem 3rem;
  }
  @media ${(props) => props.theme.mediaQueries.large} {
    padding: 4rem 2rem;
  }
`;

const SearhWrap = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  padding: 2rem;
`;

const App = ({ initApp, isLoading }) => {
  useEffect(() => {
    initApp();
  }, []);
  return isLoading ? (
    <h1>Loading</h1>
  ) : (
    <>
      <Router history={history}>
        <MainContainerWrap>
          <Sidebar />
          <SearhWrap>
            <SearchComponent />
          </SearhWrap>

          <MainContentWrap>
            <Switch>
              <Route
                path="/"
                exact
                render={() => <Redirect from="/" to="/movies/Popular" />}
              />
              <Route path="/search/:input" exact component={Search} />
              <Route
                path="/movies/:categorie"
                exact
                component={SearchByCategorie}
              />
              <Route path="/genres/:name" exact component={SearchByGenres} />
              <Route path="/movie/:id" exact component={MoviePage} />
              <Route path="/person/:id" exact component={Actor} />
            </Switch>
          </MainContentWrap>
        </MainContainerWrap>
      </Router>
    </>
  );
};

const mapStateToProps = ({ config }) => {
  return { isLoading: config.loading };
};

export default connect(mapStateToProps, { initApp })(App);
