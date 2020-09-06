import React from "react";
import styled from "styled-components";

const LoadingWrapper = styled.div`
  --size: 32px;
  --duration: 800ms;
  height: calc(var(--size) * 2);
  width: calc(var(--size) * 3);
  position: relative;
  transform-style: preserve-3d;
  transform-origin: 50% 50%;
  margin-top: calc(var(--size) * 1.5 * -1);
  transform: rotateX(60deg) rotateZ(45deg) rotateY(0deg) translateZ(0px);
`;
const LoadingElement = styled.div`
  width: var(--size);
  height: var(--size);
  top: 0;
  left: 0;
  position: absolute;
  transform-style: preserve-3d;

  &:nth-child(1) {
    transform: translate(100%, 0);
    animation: box1 var(--duration) linear infinite;
  }
  &:nth-child(2) {
    transform: translate(0, 100%);
    animation: box2 var(--duration) linear infinite;
  }
  &:nth-child(3) {
    transform: translate(100%, 100%);
    animation: box3 var(--duration) linear infinite;
  }
  &:nth-child(4) {
    transform: translate(200%, 0);
    animation: box4 var(--duration) linear infinite;
  }
    @keyframes box1 {
      0%,
      50% {
        transform: translate(100%, 0);
      }
      100% {
        transform: translate(200%, 0);
      }
    }
    @keyframes box2 {
      0% {
        transform: translate(0, 100%);
      }
      50% {
        transform: translate(0, 0);
      }
      100% {
        transform: translate(100%, 0);
      }
    }
    @keyframes box3 {
      0%,
      50% {
        transform: translate(100%, 100%);
      }
      100% {
        transform: translate(0, 100%);
      }
    }
    @keyframes box4 {
      0% {
        transform: translate(200%, 0);
      }
      50% {
        transform: translate(200%, 100%);
      }
      100% {
        transform: translate(100%, 100%);
      }
    }
  }

`;

const LoadingBlock = styled.div`
  --background: #ba68c8;
  --top: auto;
  --right: auto;
  --bottom: auto;
  --left: auto;
  --translateZ: calc(var(--size) / 2);
  --rotateY: 0deg;
  --rotateX: 0deg;
  position: absolute;
  width: 100%;
  height: 100%;
  background: var(--background);
  top: var(--top);
  right: var(--right);
  bottom: var(--bottom);
  left: var(--left);
  transform: rotateY(var(--rotateY)) rotateX(var(--rotateX))
    translateZ(var(--translateZ));

  &:nth-child(1) {
    --top: 0;
    --left: 0;
  }
  &:nth-child(2) {
    --background: #6600cc;
    --right: 0;
    --rotateY: 90deg;
  }
  &:nth-child(3) {
    --background: #9933ff;
    --rotateX: -90deg;
  }
  &:nth-child(4) {
    --background: #dbe3f4;
    --top: 0;
    --left: 0;
    --translateZ: calc(var(--size) * 3 * -1);
  }
`;

const Loader = () => {
  return (
    <LoadingWrapper>
      <LoadingElement>
        <LoadingBlock />
        <LoadingBlock />
        <LoadingBlock />
        <LoadingBlock />
      </LoadingElement>
      <LoadingElement>
        <LoadingBlock />
        <LoadingBlock />
        <LoadingBlock />
        <LoadingBlock />
      </LoadingElement>
      <LoadingElement>
        <LoadingBlock />
        <LoadingBlock />
        <LoadingBlock />
        <LoadingBlock />
      </LoadingElement>
      <LoadingElement>
        <LoadingBlock />
        <LoadingBlock />
        <LoadingBlock />
        <LoadingBlock />
      </LoadingElement>
    </LoadingWrapper>
  );
};
export default Loader;
