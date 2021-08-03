export interface ICanvasProps {
  figure: {
    figure: "none" | "round" | "square";
    dragX: number;
    dragY: number;
    width?: number;
    height?: number;
    radius?: number;
  };
  mouseUp: boolean;
}

export interface IFiguresProps {
  figure: "none" | "round" | "square";
  x: number;
  y: number;
  w: number;
  h: number;
  selected: boolean;
}
