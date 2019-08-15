import React from 'react';
import Space from './space.jsx';

const Row = (props) => {
    var spaces = [];
    for (var i = 5; i >=0 ; i--) {
        spaces.push(<Space rowId={props.id} id={i} game={props.game} player={props.player} />);
    }
    return (
        <div className="row" id={props.id}>
            {spaces}
        </div>
    )
}

export default Row;