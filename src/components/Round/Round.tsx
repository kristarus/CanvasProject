import React, { useRef } from "react";
import { Root } from "./RoundStyles";
import { IRoundProps } from "./types";
import { SIZES } from "constants/sizes";

function Round({ onDragStart }: IRoundProps) {
  const round = useRef<HTMLDivElement>(null);
  return (
    <Root
      width={SIZES.RoundDiameter}
      height={SIZES.RoundDiameter}
      ref={round}
      draggable
      onDragStart={(e: React.DragEvent) => onDragStart(e, "round", round)}
    ></Root>
  );
}

export default Round;
