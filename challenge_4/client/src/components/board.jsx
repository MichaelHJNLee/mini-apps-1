import React from 'react';
import Row from './row.jsx';

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        var rows = [];
        for (var i = 0; i < 7; i++) {
            rows.push(<Row id={i} game={this.props.game} player={this.props.player}/>);
        }
        return (
            <div className="board-container">
                {rows}
            </div>
        )
    }
}

export default Board;