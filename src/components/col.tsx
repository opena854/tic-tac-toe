import Box from "./box"
import { TicTacToeState } from "./tictactoe";

const Col = ({clickHandler = () => () => undefined, ...props} : TicTacToeState ) => {
  return (
    <div>
      {[0, 1, 2].map((idx) => (
        <Box key={idx} {...props} clickHandler={(clickHandler(props.col, idx))} getBoxState={ () => props.state[props.col*3 + idx]} />
      ))}
    </div>
  );
}

export default Col