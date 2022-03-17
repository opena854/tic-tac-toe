import { SelfClickHandler, TicTacToeState } from "./tictactoe";


const Box = ({getBoxState = ()=> null, clickHandler = ()=> undefined}: TicTacToeState) => {
    const state = getBoxState()
    const onClick = !state ? () => (clickHandler as SelfClickHandler)() : undefined
    
    return <div className="box" onClick={onClick} style={{cursor: onClick ? "pointer" : "not-allowed"}} >
        { state }
    </div>
}

export default Box