import React from 'react';

const Space = (props) => {
    var game = props.game;
    var divStyle = {'backgroundColor': 'white'};
    if (game[props.rowId][props.id] !== '') {
        divStyle['backgroundColor'] = game[props.rowId][props.id];
    }
    return (
        <div className="space" id={props.id} style={divStyle}></div>
    )
}

export default Space;