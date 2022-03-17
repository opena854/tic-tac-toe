import { useReducer, useState } from "react";
import Col from "./col";

type Player = "X"|"O"

interface Action {
    index: number,
    value: Player
}

type State = Array<Player | null>

export interface SelfClickHandler { (): void }
export interface ColumnClickHandler { (col: number, row: number): () => void }

type ClickHandler = void | SelfClickHandler | ColumnClickHandler 

export interface TicTacToeState {
    col: number,
    state: State,
    clickHandler: ClickHandler,
    getBoxState?: () => Player | null
}

const reducer = (state: State, action?: Action) : State => {
    if (action) {
        const newState:State = [...state];
        newState[action.index] = action.value;
        return newState;
    }
    else return state.map( () => null)
}

function clickHandlerGlobal ( dispatch : React.Dispatch<Action>, turn: Player, setTurn: (turn: Player) => void ) : ClickHandler {
  return (col: number, row: number) => () => {
    setTurn(turn === "X" ? "O" : "X");
    dispatch({ index: col * 3 + row, value: turn });
  };
}

const winConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [8,4,0],
    [2,4,6]
]


const TicTacToe = () => {
    const [turn, setTurn] = useState<Player>("X")
    const [state, dispatch] = useReducer(reducer, Array(3*3).fill(null))
    const clickHandler = clickHandlerGlobal(dispatch, turn, setTurn)
    
    const reset = () => {
        dispatch(); 
        setTurn("X")
    }

    const verifier = ([one, two, three]: number[]) => !!state[one] && state[one] === state[two] && state[one] === state[three]
    const ifNaN = (test: any, fallback: number) => (typeof test === "number"? test : fallback)
    const winner = state[ifNaN(winConditions.find( verifier )?.at(0), -1)]
    const tie = state.every( e => !!e )
    
    return (
      <div>
        <h3>Tic-Tac-Toe</h3>
        <p>
            { !tie && !winner && `Turno de: ${turn} ` } 
            <button type="button" onClick={reset}>reset</button>
        </p>
        <div className="container">
          {[0, 1, 2].map((idx) => (
            <Col key={idx} state={state} clickHandler={(tie || winner) ? undefined : clickHandler} col={idx}></Col>
          ))}
        </div>
        { winner && <p>Ganó: {winner}</p> }
        { tie && !winner && <p>Es un empate.</p> }
      </div>
    );
    
}

export default TicTacToe;
