import { Square, Round, Canvas } from "./components";
import {
  Root,
  Header,
  FiguresWrapper,
  CanvasWrapper,
  Figures,
} from "./AppStyles";

function App() {
  return (
    <Root>
      <FiguresWrapper>
        <Header>Figures</Header>
        <Figures>
          <Square />
          <Round />
        </Figures>
      </FiguresWrapper>
      <CanvasWrapper>
        <Header>Canvas</Header>
        <Canvas />
      </CanvasWrapper>
    </Root>
  );
}

export default App;
