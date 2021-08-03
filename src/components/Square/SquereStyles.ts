import styled from "styled-components";

interface IRootProps {
  width: number;
  height: number;
}

export const Root = styled.div`
  width: ${({ width }: IRootProps) => width + "px"};
  height: ${({ height }: IRootProps) => height + "px"};
  background-color: lightgreen;
  border: 2px solid black;
  cursor: move;
`;
