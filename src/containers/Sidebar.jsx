import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import StickyBox from "react-sticky-box";

import { SidebarItem, Logo } from "../components/index";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 25rem;
  padding: 2rem;
  margin-top: 4rem;
  color: var(--color-primary-dark);
  border-right: 1px solid var(--border-color);
`;

const Heading = styled.h2`
  font-weight: 700;
  font-size: 1.1rem;
  text-transform: uppercase;
  letter-spacing: -0.5px;
  margin: 0 0 1rem 1rem;
  &:not(:first-child) {
    margin-top: 4rem;
  }
`;

const LinkWrap = styled(Link)`
  text-decoration: none;
  display: block;
  outline: none;
  margin-bottom: 0.5rem;
`;

const StyledLink = styled.a`
  text-decoration: none;
  font-weight: 500;
  margin-left: 4px;
  color: inherit;
`;

const Svg = styled.img`
  max-width: 100%;
  height: 3rem;
`;

const Sidebar = ({ genres, categories, config, selected }) => {
  console.log("CONFIG", selected);
  return (
    <StickyBox>
      <Wrapper>
        <Logo />
        <Heading>Discover</Heading>
        {renderCategories(categories, selected)}
        <Heading>Genres</Heading>
        {renderGenres(genres, selected)}
      </Wrapper>
    </StickyBox>
  );
};

function renderCategories(categories, selected, setisOpened) {
  return categories.map((categorie, i) => (
    <LinkWrap to={`${process.env.PUBLIC_URL}/movies/${categorie}`} key={i}>
      <SidebarItem
        mobile={setisOpened ? 1 : 0}
        title={categorie}
        selected={categorie === selected ? true : false}
      />
    </LinkWrap>
  ));
}

function renderGenres(genres, selected, setisOpened) {
  return genres.map((genre) => (
    <LinkWrap
      to={`${process.env.PUBLIC_URL}/genres/${genre.name}`}
      key={genre.id}>
      <SidebarItem
        mobile={setisOpened ? 1 : 0}
        title={genre.name}
        selected={genre.name === selected ? true : false}
      />
    </LinkWrap>
  ));
}

const mapStateToProps = ({ config }) => {
  return {
    categories: config.categories,
    genres: config.genres,
    config: config,
    selected: config.selected,
  };
};

export default connect(mapStateToProps)(Sidebar);
