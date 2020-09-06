import React, { useState, useRef, useEffect } from "react";
import Slider from "react-slick";
// import Loader from "./Loader";
import CreditsItem from "./CreditsItem";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
const Wrapper = styled.div`
  margin-bottom: 5rem;
`;

const Credits = ({ list, secureUrl }) => {
  if (!list) {
    // return <Loader />;
  }
  const [totalShow, setTotalShow] = useState(null);
  const sliderElement = useRef();

  // Set amount of items to show on slider based on the width of the element
  const changeTotalShow = () => {
    let totalItems = Math.round(sliderElement.current.offsetWidth / 70);
    if (totalItems > list.length) {
      totalItems = list.length;
    }
    setTotalShow(totalItems);
  };

  const items = list.map((person) => (
    <CreditsItem person={person} secureUrl={secureUrl} key={person.id} />
  ));

  useEffect(() => {
    changeTotalShow();
    window.addEventListener("resize", changeTotalShow);
    return () => window.removeEventListener("resize", changeTotalShow);
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    swipeToSlide: true,
    speed: 500,
    slidesToShow: totalShow,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <>
      <Slider {...settings}>{items}</Slider>
      <Wrapper ref={sliderElement}></Wrapper>
    </>
  );
};

function NextArrow({ onClick }) {
  return (
    <FontAwesomeIcon
      style={{
        right: "-15px",
        position: "absolute",
        top: "50%",
        display: "block",
        width: "12px",
        height: "12px",
        padding: "0",
        transform: "translate(0, -50%)",
        cursor: "pointer",
      }}
      onClick={onClick}
      icon={faChevronRight}
      size="1x"
    />
  );
}

function PrevArrow({ onClick }) {
  return (
    <FontAwesomeIcon
      style={{
        left: "-15px",
        position: "absolute",
        top: "50%",
        display: "block",
        width: "12px",
        height: "12px",
        padding: "0",
        transform: "translate(0, -50%)",
        cursor: "pointer",
      }}
      onClick={onClick}
      icon={faChevronLeft}
      size="1x"
    />
  );
}

export default Credits;
