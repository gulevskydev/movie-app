import React, { useEffect, useState } from "react";
import history from "./history";
import styled from "styled-components";
import { Router, Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { initApp } from "./store/actions/actionCreators";

//components
import { SearchComponent, Loader, NotFound } from "./components/index";
//containers
import {
  Search,
  Sidebar,
  SearchByCategorie,
  SearchByGenres,
  MoviePage,
  Actor,
  MobileMenu,
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
  const [isMobile, setisMobile] = useState(null);

  useEffect(() => {
    initApp();
  }, []);

  const changeMobile = () => {
    window.matchMedia("(max-width: 80em)").matches
      ? setisMobile(true)
      : setisMobile(false);
  };

  useEffect(() => {
    changeMobile();
    window.addEventListener("resize", changeMobile);
    return () => window.removeEventListener("resize", changeMobile);
  }, []);

  return isLoading ? (
    <MainContainerWrap>
      <MainContentWrap>
        <Loader />
      </MainContentWrap>
    </MainContainerWrap>
  ) : (
    <>
      <Router history={history}>
        <MainContainerWrap isMobile={isMobile}>
          {isMobile ? (
            <MobileMenu />
          ) : (
            <>
              <Sidebar />
              <SearhWrap>
                <SearchComponent />
              </SearhWrap>
            </>
          )}
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
              <Route
                path="/404"
                component={() => (
                  <NotFound title="Upps!" subtitle={`This doesn't exist...`} />
                )}
              />
              <Route
                component={() => (
                  <NotFound title="Upps!" subtitle={`This doesn't exist...`} />
                )}
              />
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
