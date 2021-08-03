import styled from "styled-components";

export const Root = styled.div`
  height: 100vh;
`;

export const Table = styled.div`
  width: fit-content;
  padding: 50px 0;
  margin: 0 auto;
  display: flex;
`;

export const Header = styled.div`
  background-color: lightgrey;
  border-bottom: 1px solid black;
  text-align: center;
`;

export const FiguresWrapper = styled.div`
  border: 1px solid black;
  border-right: none;
`;

export const CanvasWrapper = styled.div`
  border: 1px solid black;
`;

export const Figures = styled.div`
  display: grid;
  grid-gap: 20px;
  box-sizing: border-box;
  padding: 20px;
`;
