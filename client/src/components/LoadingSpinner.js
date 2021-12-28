import React from "react";


//styling
import styled, {keyframes} from "styled-components";


const LoadingSpinner = () => {
  return (
    <Spinner>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </Spinner>
  );
};

export default LoadingSpinner;

const AnimSpinner1 = keyframes`
0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }

`;

const AnimSpinner2 = keyframes`
0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(24px, 0);
  }

`;

const AnimSpinner3 = keyframes`
0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }

`;



const Spinner = styled.div`
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;

  & div{
    position: absolute;
    top: 33px;
    width: 13px;
    height: 13px;
    border-radius: 50%;
    background:#79808A;
    animation-timing-function: cubic-bezier(0, 1, 1, 0);
  }

  & div:nth-child(1) {
    left: 8px;
    animation: ${AnimSpinner1} 0.6s infinite;
  }

  & div:nth-child(2) {
    left: 8px;
    animation: ${AnimSpinner2} 0.6s infinite;
  }

  & div:nth-child(3) {
    left: 32px;
    animation: ${AnimSpinner2} 0.6s infinite;
  }

  & div:nth-child(4) {
    left: 56px;
    animation: ${AnimSpinner3} 0.6s infinite;
  }
`;
