import React from 'react';
import Board from './board.jsx';
import Buttons from './buttons.jsx';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            game: [
            ['','','','','',''],
            ['','','','','',''],
            ['','','','','',''],
            ['','','','','',''],
            ['','','','','',''],
            ['','','','','',''],
            ['','','','','','']
            ],
            player: 'black'
        }
        this.buttonClick = this.buttonClick.bind(this);
    }

    // componentDidMount() {
    //     var newBoard = [];
    //     for (var i = 0; i <= 6; i++) {
    //         var row = [];
    //         for (var j = 0; j <= 5; j++) {
    //             row.push('');
    //         }
    //         newBoard.push(row);
    //     }
    //     this.setState({
    //         game: newBoard
    //     })
    //     console.log(this.state.game)
    // }

    buttonClick(e) {
        var board = this.state.game;
        var row = board[e]; // ['','','','','','']
        var space;
        for (var i = 0; i < row.length; i++) {
            if (row[i] === '') {
                row[i] = this.state.player;
                space = i;
                break;
            }
        }
        if (space === undefined) {
            return;
        }
        board[e] = row;
        this.setState({
            game: board
        })
        if (this.state.player === 'black') {
            this.setState({
                player: 'red'
            })
        } else {
            this.setState({
                player: 'black'
            })
        }
    }

    checkVictory() {

    }

    render() {
        return (
            <center>
            <div>
                <div>Connect 4</div><br/>
                <Buttons click={this.buttonClick}/><br/>
                <Board game={this.state.game} player={this.state.player}/>
            </div>
            </center>
        )
    }
}

export default App;

