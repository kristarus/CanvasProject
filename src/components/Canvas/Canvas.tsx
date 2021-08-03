import { Root } from "./CanvasStyles";
import { useState, useRef, useEffect } from "react";
import { ICanvasProps, IFiguresProps } from "./types";
import { SIZES } from "constants/sizes";

function Canvas({ figure, mouseUp }: ICanvasProps) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [figures, setFigures] = useState<IFiguresProps[]>([]);
  const [isMouseDown, setIsMouseDown] = useState(false);

  const draw = (e: React.DragEvent) => {
    let pageX = e.pageX;
    let pageY = e.pageY;
    if (canvas.current) {
      let ctx = canvas.current.getContext("2d");
      let size = canvas.current.getBoundingClientRect();
      let x = pageX - figure.dragX - size.left;
      let y = pageY - figure.dragY - size.top;
      if (
        (figure.figure === "round" &&
          x > 0 &&
          y > 0 &&
          x + SIZES.RoundDiameter < SIZES.CanvasWidth &&
          y + SIZES.RoundDiameter < SIZES.CanvasHeight) ||
        (figure.figure === "square" &&
          x > 0 &&
          y > 0 &&
          x + SIZES.SquareWidth < SIZES.CanvasWidth &&
          y + SIZES.SquareHeight < SIZES.CanvasHeight)
      ) {
        if (ctx) {
          figure.figure === "square"
            ? setFigures([
                {
                  figure: figure.figure,
                  x,
                  y,
                  h: SIZES.SquareHeight,
                  w: SIZES.SquareWidth,
                  selected: false,
                },
                ...figures,
              ])
            : setFigures([
                {
                  figure: figure.figure,
                  x,
                  y,
                  h: SIZES.RoundDiameter,
                  w: SIZES.RoundDiameter,
                  selected: false,
                },
                ...figures,
              ]);
          figure.figure === "square"
            ? drawSquare(ctx, x, y, SIZES.SquareWidth, SIZES.SquareHeight)
            : drawRound(ctx, x, y, SIZES.RoundDiameter);
        }
      }
    }
  };

  const drawSquare = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    w: number,
    h: number,
    selected: boolean = false
  ) => {
    setLocalStorageFigures(figures);
    ctx.lineWidth = 3;
    if (selected) {
      ctx.strokeStyle = "red";
    } else ctx.strokeStyle = "black";
    ctx.fillStyle = "lightgreen";
    ctx.strokeRect(x, y, w, h);
    ctx.fillRect(x, y, w, h);
  };

  const drawRound = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    d: number,
    selected: boolean = false
  ) => {
    setLocalStorageFigures(figures);
    ctx.beginPath();
    ctx.arc(x + d / 2, y + d / 2, d / 2, 0, 2 * Math.PI);
    ctx.fillStyle = "lightblue";
    ctx.fill();
    ctx.lineWidth = 2;
    if (selected) {
      ctx.strokeStyle = "red";
    } else ctx.strokeStyle = "black";
    ctx.stroke();
  };

  const drawFigures = () => {
    if (canvas.current) {
      let ctx = canvas.current.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, SIZES.CanvasWidth, SIZES.CanvasHeight);
        let reversedFigures = figures.slice().reverse();
        reversedFigures.forEach((item) => {
          if (ctx)
            item.figure === "round"
              ? drawRound(ctx, item.x, item.y, item.w, item.selected)
              : drawSquare(ctx, item.x, item.y, item.w, item.h, item.selected);
        });
      }
    }
  };

  const handleOnMouseDown = (e: React.MouseEvent) => {
    let selectedIndex: number = -1;
    if (canvas.current) {
      let size = canvas.current.getBoundingClientRect();
      figures.forEach((item, index) => {
        item.selected = false;
        if (
          item.x < e.pageX - size.left &&
          item.x + item.w > e.pageX - size.left &&
          item.y < e.pageY - size.top &&
          item.y + item.h > e.pageY - size.top
        ) {
          if (selectedIndex < 0) {
            selectedIndex = index;
            item.selected = true;
          }
        }
      });

      if (selectedIndex >= 0) {
        let selectedFigure = figures.find(
          (item, index) => index === selectedIndex
        );
        if (selectedFigure) {
          figures.splice(selectedIndex, 1);
          figures.unshift(selectedFigure);
        }
      }
      drawFigures();
    }
    setIsMouseDown(true);
  };

  const handleOnMouseUp = () => {
    setIsMouseDown(false);
  };

  const handleOnMouseMove = (e: React.MouseEvent) => {
    if (isMouseDown) {
      if (canvas.current) {
        if (figures.length > 0) {
          if (figures[0].selected) {
            let size = canvas.current.getBoundingClientRect();
            let x = e.pageX - size.left;
            let y = e.pageY - size.top;
            if (
              figures[0].x >= 0 &&
              figures[0].y >= 0 &&
              figures[0].x + figures[0].w <= SIZES.CanvasWidth &&
              figures[0].y + figures[0].h <= SIZES.CanvasHeight
            ) {
              figures[0].x = x - figures[0].w / 2;
              figures[0].y = y - figures[0].h / 2;
            }
            if (figures[0].x < 0) {
              figures[0].x = 0;
            }
            if (figures[0].y < 0) {
              figures[0].y = 0;
            }
            if (figures[0].x + figures[0].w > SIZES.CanvasWidth) {
              figures[0].x = SIZES.CanvasWidth - figures[0].w;
            }
            if (figures[0].y + figures[0].h > SIZES.CanvasHeight) {
              figures[0].y = SIZES.CanvasHeight - figures[0].h;
            }
          }
        }
      }
      drawFigures();
    }
  };

  const handleOnKeyDown = (e: React.KeyboardEvent) => {
    if (e.code === "Delete" && figures[0].selected) {
      figures.shift();
      drawFigures();
    }
  };

  const deleteFigure = () => {
    if (figures.length > 0 && mouseUp && isMouseDown) {
      if (
        figures[0].x === 0 ||
        figures[0].y === 0 ||
        figures[0].x + figures[0].w === SIZES.CanvasWidth ||
        figures[0].y + figures[0].h === SIZES.CanvasHeight
      ) {
        figures.shift();
        drawFigures();
      }
    }
  };

  const getLocalStorageFigures = () => {
    let JSONFigures: string | null;
    JSONFigures = localStorage.getItem("figures");
    const figures = JSON.parse(JSONFigures || "[]");
    return figures;
  };

  const setLocalStorageFigures = (figures: object[]) => {
    localStorage.setItem("figures", JSON.stringify(figures));
  };

  drawFigures();
  deleteFigure();

  useEffect(() => {
    setFigures(getLocalStorageFigures());
  }, []);

  return (
    <Root
      ref={canvas}
      height={SIZES.CanvasHeight}
      width={SIZES.CanvasWidth}
      onDrop={draw}
      onDragOver={(e: React.DragEvent) => {
        e.preventDefault();
      }}
      onMouseDown={handleOnMouseDown}
      onMouseUp={handleOnMouseUp}
      onMouseMove={handleOnMouseMove}
      onKeyDown={handleOnKeyDown}
      tabIndex={0}
    ></Root>
  );
}

export default Canvas;
