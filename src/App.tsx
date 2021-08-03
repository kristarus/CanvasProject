import { Square, Round, Canvas } from "./components";
import {
  Root,
  Header,
  FiguresWrapper,
  CanvasWrapper,
  Figures,
  Table,
} from "./AppStyles";
import { useState } from "react";
import { SIZES } from "constants/sizes";
import { IAppProps } from "./types";

function App() {
  const [selectedFigure, setSelectedFigure] = useState<IAppProps>({
    figure: "none",
    dragX: 0,
    dragY: 0,
  });
  const [mouseUp, setMouseUp] = useState<boolean>(false);

  const handleDragStart = (
    e: React.DragEvent,
    figure: "square" | "round",
    ref: any
  ) => {
    let size = ref.current.getBoundingClientRect();
    figure === "square"
      ? setSelectedFigure({
          figure: "square",
          dragX: e.pageX - size.left,
          dragY: e.pageY - size.top,
          width: SIZES.SquareWidth,
          height: SIZES.SquareHeight,
        })
      : setSelectedFigure({
          figure: "round",
          dragX: e.pageX - size.left,
          dragY: e.pageY - size.top,
          radius: SIZES.RoundDiameter,
        });
  };

  const handleOnMouseDown = () => {
    setMouseUp(false);
  };

  const handleOnMouseUp = () => {
    setMouseUp(true);
  };

  return (
    <Root onMouseDown={handleOnMouseDown} onMouseUp={handleOnMouseUp}>
      <Table>
        <FiguresWrapper>
          <Header>Figures</Header>
          <Figures>
            <Square onDragStart={handleDragStart} />
            <Round onDragStart={handleDragStart} />
          </Figures>
        </FiguresWrapper>
        <CanvasWrapper>
          <Header>Canvas</Header>
          <Canvas figure={selectedFigure} mouseUp={mouseUp} />
        </CanvasWrapper>
      </Table>
    </Root>
  );
}

export default App;
