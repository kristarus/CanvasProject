import styled from "styled-components";

interface IRootProps {
  width: number;
  height: number;
}

export const Root = styled.div<IRootProps>`
  width: ${({ width }: IRootProps) => width + "px"};
  height: ${({ height }: IRootProps) => height + "px"};
  border-radius: 50%;
  background-color: lightblue;
  border: 2px solid black;
  cursor: move;
`;
