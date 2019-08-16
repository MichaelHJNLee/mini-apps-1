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
            player: 'black',
            victory: false
        }
        this.buttonClick = this.buttonClick.bind(this);
        this.counter = 0;
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
        if (this.state.victory) {
            return;
        }
        var board = this.state.game;
        var row = board[e];
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
        this.counter++;
        board[e] = row;
        this.setState({
            game: board
        })
        if (this.checkVictory(parseInt(e), space)) {
            alert('Winner');
            this.setState({
                victory: true
            })
            return;
        }
        if (this.counter === 42) {
            alert('Tie');
            this.setState({
                victory: true
            })
            return;
        }
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

    checkVictory(row, space) {
        var game = this.state.game;
        var color = this.state.player;
        var counter = 0;

        //check vertical
        for (var i = 0; i < game[row].length; i++) {
            if (game[row][i] === color) {
                counter++;
            } else {
                counter = 0;
            }
            if (counter === 4) {
                return true;
            }
        }
        counter = 0;

        //check horizontal
        for (var i = 0; i < game.length; i++) {
            if (game[i][space] === color) {
                counter++;
            } else {
                counter = 0;
            }
            if (counter === 4) {
                return true;
            }
        }
        counter = 0;
        debugger;
        //check major diagonal
        var tempRow = row;
        var tempSpace = space;
        while (tempRow > 0 && tempSpace < 5) {
            tempRow--;
            tempSpace++;
        } 
        while (tempRow <= 6 && tempSpace >= 0) {
            if (game[tempRow][tempSpace] === color) {
                counter++;
            } else {
                counter = 0;
            }
            if (counter === 4) {
                return true;
            }
            tempRow++;
            tempSpace--;
        }
        counter = 0;

        //check minor diagonal
        var tempRow = row;
        var tempSpace = space;
        while (tempRow > 0 && tempSpace > 0) {
            tempSpace--;
            tempRow--;
        } 
        while (tempRow < 6 && tempSpace < 5) {
            if (game[tempRow][tempSpace] === color) {
                counter++;
            } else {
                counter = 0;
            }
            if (counter === 4) {
                return true;
            }
            tempSpace++;
            tempRow++;
        }
        return false;
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

