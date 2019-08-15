import React from 'react';

const Buttons = (props) => {
    return (
        <div className="button-container">
            <button id="0" onClick={(e) => {props.click(e.target.id)}}>0</button>
            <button id="1" onClick={(e) => {props.click(e.target.id)}}>1</button>
            <button id="2" onClick={(e) => {props.click(e.target.id)}}>2</button>
            <button id="3" onClick={(e) => {props.click(e.target.id)}}>3</button>
            <button id="4" onClick={(e) => {props.click(e.target.id)}}>4</button>
            <button id="5" onClick={(e) => {props.click(e.target.id)}}>5</button>
            <button id="6" onClick={(e) => {props.click(e.target.id)}}>6</button>
        </div>
    )
}

export default Buttons;