import styled, { keyframes } from "styled-components";
const fadeUp = keyframes`
  from {
    // opacity: 0;
    transform: translateY(80vh);
  }
  to {
    // opacity: 1;
    transform: translateY(0);
  }
`;
const fadeLeft = keyframes`
  from {
    // opacity: 0;
    transform: translateX(-80vh);
  }
  to {
    // opacity: 1;
    transform: translateX(0);
  }
`;

const fadeRight = keyframes`
  from {
    // opacity: 0;
    transform: translateX(100vh);
  }
  to {
    // opacity: 1;
    transform: translateX(0);
  }
`;

export const PageUpWrapper = styled.div`
  animation: ${fadeUp} 1s ease;
`;

export const PageLeftWrapper = styled.div`
  animation: ${fadeLeft} 1s ease;
`;
export const PageRightWrapper = styled.div`
  animation: ${fadeRight} 1s ease;
`;
