import styled from "styled-components";

export const Container = styled.div`
  max-width: 1600px;
  margin: 0 auto;
  position: relative;
`;

export const MasonryContainer = styled.div<{ $height: number }>`
  position: relative;
  height: ${props => props.$height}px;
`;

export const ItemWrapper = styled.div<{ $top: number; $left: number; $width: number }>`
  position: absolute;
  top: ${props => props.$top}px;
  left: ${props => props.$left}px;
  width: ${props => props.$width}px;
`;

export const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  padding: 32px 0;

  &::after {
    content: "";
    width: 32px;
    height: 32px;
    border: 2px solid #fff;
    border-top: 2px solid #c208c1;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const EndMessage = styled.p`
  text-align: center;
  padding: 32px 0;
  color: #111827;
`;