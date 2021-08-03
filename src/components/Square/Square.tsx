import { Root } from "./SquereStyles";
import React, { useRef } from "react";
import { ISquareProps } from "./types";
import { SIZES } from "constants/sizes";

function Square({ onDragStart }: ISquareProps) {
  const square = useRef(null);
  return (
    <Root
      width={SIZES.SquareWidth}
      height={SIZES.SquareHeight}
      ref={square}
      draggable
      onDragStart={(e: React.DragEvent) => onDragStart(e, "square", square)}
    ></Root>
  );
}

export default Square;
