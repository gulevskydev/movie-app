import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import queryString from "query-string";
import LazyLoad from "react-lazyload";
import history from "../history";
import { Element, animateScroll as scroll } from "react-scroll";

import { getActor, getMoviesByActor } from "../store/actions/actionCreators";

import { Sort, Title, Movies, Button } from "../components/index";

import noavatar from "../img/noperson.svg";
// import Loading from '../components/Loading';

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const PersonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 120rem;
  margin: 0 auto;
  margin-bottom: 7rem;
  transition: all 600ms cubic-bezier(0.215, 0.61, 0.355, 1);
  @media ${(props) => props.theme.mediaQueries.largest} {
    max-width: 105rem;
  }
  @media ${(props) => props.theme.mediaQueries.larger} {
    max-width: 110rem;
    margin-bottom: 6rem;
  }
  @media ${(props) => props.theme.mediaQueries.large} {
    max-width: 110rem;
    margin-bottom: 5rem;
  }
  @media ${(props) => props.theme.mediaQueries.medium} {
    flex-direction: column;
    margin-bottom: 5rem;
  }
`;

const PersonDetails = styled.div`
  width: 60%;
  padding: 4rem;
  flex: 1 1 60%;
  @media ${(props) => props.theme.mediaQueries.largest} {
    padding: 3rem;
  }
  @media ${(props) => props.theme.mediaQueries.large} {
    padding: 2rem;
  }
  @media ${(props) => props.theme.mediaQueries.smaller} {
    padding: 1rem;
  }
  @media ${(props) => props.theme.mediaQueries.smallest} {
    padding: 0rem;
  }
  @media ${(props) => props.theme.mediaQueries.medium} {
    width: 100%;
    flex: 1 1 100%;
  }
`;

const ImageWrapper = styled.div`
  width: 40%;
  flex: 1 1 40%;
  padding: 4rem;
  @media ${(props) => props.theme.mediaQueries.largest} {
    padding: 3rem;
  }
  @media ${(props) => props.theme.mediaQueries.large} {
    padding: 2rem;
  }
  @media ${(props) => props.theme.mediaQueries.smaller} {
    margin-bottom: 2rem;
  }
  @media ${(props) => props.theme.mediaQueries.medium} {
    width: 60%;
    flex: 1 1 60%;
  }
`;

const MovieImg = styled.img`
  max-height: 100%;
  height: ${(props) => (props.error ? "58rem" : "auto")};
  object-fit: ${(props) => (props.error ? "contain" : "cover")};
  padding: ${(props) => (props.error ? "2rem" : "")};
  max-width: 100%;
  border-radius: 0.8rem;
  box-shadow: ${(props) =>
    props.error ? "none" : "0rem 2rem 5rem var(--shadow-color-dark);"};
`;

const ImgLoading = styled.div`
  width: 100%;
  max-width: 40%;
  flex: 1 1 40%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  transition: all 100ms cubic-bezier(0.645, 0.045, 0.355, 1);
  @media ${(props) => props.theme.mediaQueries.smaller} {
    height: 28rem;
  }
`;

const HeaderWrapper = styled.div`
  margin-bottom: 2rem;
`;

const Heading = styled.h3`
  color: var(--color-primary-dark);
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 1rem;
  font-size: 1.4rem;
  @media ${(props) => props.theme.mediaQueries.medium} {
    font-size: 1.2rem;
  }
`;

const DetailsWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5rem;
  font-size: 1.3rem;
  line-height: 1;
  font-weight: 700;
  color: var(--color-primary);
`;

const Text = styled.p`
  font-size: 1.4rem;
  line-height: 1.8;
  color: var(--link-color);
  font-weight: 500;
  margin-bottom: 3rem;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  @media ${(props) => props.theme.mediaQueries.small} {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const LeftButtons = styled.div`
  margin-right: auto;
  display: flex;
  @media ${(props) => props.theme.mediaQueries.small} {
    margin-bottom: 2rem;
  }
  & > *:not(:last-child) {
    margin-right: 2rem;
    @media ${(props) => props.theme.mediaQueries.large} {
      margin-right: 1rem;
    }
  }
`;

const RightButtons = styled.div`
  margin-left: auto;
  display: flex;
  @media ${(props) => props.theme.mediaQueries.small} {
    margin-bottom: 2rem;
  }
  & > *:not(:first-child) {
    margin-left: 2rem;
    @media ${(props) => props.theme.mediaQueries.large} {
      margin-left: 1rem;
    }
  }
`;

const AWrapper = styled.a`
  text-decoration: none;
`;

const Actor = ({
  location,
  config,
  match,
  getActor,
  clearPerson,
  getMoviesByActor,
  actor,
  recommendationByActor,
}) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const { secure_base_url } = config.base.images;
  const params = queryString.parse(location.search);
  const [option, setOption] = useState({
    value: "popularity.desc",
    label: "Popularity",
  });

  //   Fetch actor when id on url changes
  useEffect(() => {
    scroll.scrollToTop({
      smooth: true,
      delay: 500,
    });
    getActor(match.params.id);
  }, [match.params.id]);

  // Fetch movies where actor enters
  useEffect(() => {
    getMoviesByActor(match.params.id, params.page, option.value);
  }, [params.page, option]);
  if (actor.loading) {
    return <h1>Loading</h1>;
  }
  return (
    <Wrapper>
      <LazyLoad height={500}>
        <PersonWrapper>
          <ImageWrapper style={!loaded ? { display: "none" } : {}}>
            <MovieImg
              error={error ? 1 : 0}
              src={`${secure_base_url}w780${actor.profile_path}`}
              onLoad={() => setLoaded(true)}
              // If no image, error will occurr, we set error to true
              // And only change the src to the nothing svg if it isn't already, to avoid infinite callback
              onError={(e) => {
                setError(true);
                if (e.target.src !== `${noavatar}`) {
                  e.target.src = `${noavatar}`;
                }
              }}
            />
          </ImageWrapper>
          <PersonDetails>
            <HeaderWrapper>
              <Title size="2" title={actor.name} subtitle="" />
            </HeaderWrapper>
            <DetailsWrapper>
              {renderDate(actor.birthday, actor.deathday)}
            </DetailsWrapper>
            <Heading>The Biography</Heading>
            <Text>
              {actor.biography
                ? actor.biography
                : "There is no biography available..."}
            </Text>
            <ButtonsWrapper>
              <LeftButtons>{renderBack()}</LeftButtons>
              <RightButtons>
                {renderWebsite(actor.homepage)}
                {renderImdb(actor.imdb_id)}
              </RightButtons>
            </ButtonsWrapper>
          </PersonDetails>
        </PersonWrapper>
      </LazyLoad>
      <Title title="Also enters in" subtitle="movies" />
      {renderPersonMovies(
        recommendationByActor,
        secure_base_url,
        option,
        setOption
      )}
    </Wrapper>
  );
};

function renderDate(birthday, deathday) {
  if (!birthday) {
    return null;
  } else if (birthday && deathday) {
    return `${birthday} - ${deathday}`;
  } else {
    return birthday;
  }
}

// Render back button
function renderBack() {
  return (
    <div onClick={history.goBack}>
      <Button title="Back" solid left icon="faArrowLeft" />
    </div>
  );
}

// Render website of actor
function renderWebsite(link) {
  if (!link) {
    return null;
  }
  return (
    <AWrapper target="_blank" href={link}>
      <Button title="Website" icon="link" />
    </AWrapper>
  );
}

// Render imdb profile of actor
function renderImdb(id) {
  if (!id) {
    return null;
  }
  return (
    <AWrapper target="_blank" href={`https://www.imdb.com/name/${id}`}>
      <Button title="IMDB" icon={"faPlay"} />
    </AWrapper>
  );
}

// Render movies where actor enters
function renderPersonMovies(
  recommendationByActor,
  base_url,
  option,
  setOption
) {
  if (recommendationByActor.loading) {
    return <h1>loading</h1>;
  } else if (recommendationByActor.total_results === 0) {
    return "Heloo";
  } else {
    return (
      <React.Fragment>
        <Sort option={option} setOption={setOption} />
        <Element name="scroll-to-element">
          <Movies movies={recommendationByActor} secureUrl={base_url} />;
        </Element>
      </React.Fragment>
    );
  }
}

// Get state from store and pass as props to component
const mapStateToProps = ({ actor, config, recommendationByActor }) => ({
  actor,
  config,
  recommendationByActor,
});

export default connect(mapStateToProps, {
  getActor,
  getMoviesByActor,
})(Actor);
