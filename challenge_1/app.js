//Model: holds game state
var Model = {
    name1: '',
    name2: '',
    player: true,
    playerX: [],
    playerO: [],
    player1Score: 0,
    player2Score: 0,
    victory: false
}

//View: holds game functionality; dom manipulation
var View = {
    initialize: () => {
        document.getElementById('player1').innerHTML = `${Model.name1} X: ${Model.player1Score}`;
        document.getElementById('player2').innerHTML = `${Model.name2} O: ${Model.player2Score}`;
    },
    verify: (arr, coord) => {
        var horiz = 1;
        var vert = 1;
        var diag = 1;
        for (var i = 0; i < arr.length; i++) {
            if (arr[i][0] === coord[0]) {
                horiz++;
            }
            if (arr[i][1] === coord[1]) {
                vert++;
            }
            if (arr[i][0] === coord[0] + 1 && arr[i][1] === coord[1] + 1) {
                diag++;
            }
            if (arr[i][0] === coord[0] - 1 && arr[i][1] === coord[1] - 1) {
                diag++;
            }
            if (arr[i][0] === coord[0] + 2 && arr[i][1] === coord[1] + 2) {
                diag++;
            }
            if (arr[i][0] === coord[0] - 2 && arr[i][1] === coord[1] - 2) {
                diag++;
            }
        }
        if (horiz === 3 || vert === 3 || diag === 3) {
            return true;
        }
        return false;
    },
    click: (event) => {
        if (event.target.innerHTML || Model.victory === true) {
            return;
        }
        var bank = [[0,0], [0,1], [0,2], [1,0], [1,1], [1,2], [2,0], [2,1], [2,2]];
        var coord = bank[parseInt(event.target.id) - 1];
        if (Model.player) {
            event.target.append(document.createTextNode('x'));
            if (View.verify(Model.playerX, coord)) {
                if (Model.name1 === '') {
                    document.getElementById('winner').innerHTML = `X Wins!`;
                } else {
                    document.getElementById('winner').innerHTML = `${Model.name1} Wins!`;
                }
                Model.player1Score++;
                document.getElementById('player1').innerHTML = `${Model.name1} X: ${Model.player1Score}`;
                Model.player = true;
                Model.victory = true;
                return;
            }
            Model.playerX.push(coord);
        } else {
            event.target.append(document.createTextNode('o'));
            if (View.verify(Model.playerO, coord)) {
                if (Model.name2 === '') {
                    document.getElementById('winner').innerHTML = `O Wins!`;
                } else {
                    document.getElementById('winner').innerHTML = `${Model.name2} Wins!`;
                }
                Model.player2Score++;
                document.getElementById('player2').innerHTML = `${Model.name2} O: ${Model.player2Score}`;
                Model.player = false;
                Model.victory = true;
                return;
            }
            Model.playerO.push(coord);
        }
        Model.player = !Model.player;
    },
    nameSelect: (num) => {
        if (num === 1) {
            if (document.querySelector('#name1').value === '') {
                return;
            }
            Model.name1 = document.querySelector('#name1').value;
            document.getElementById('player1').innerHTML = `${Model.name1} X: ${Model.player1Score}`;
            document.querySelector('#name1').value = '';
        } else {
            if (document.querySelector('#name2').value === '') {
                return;
            }
            Model.name2 = document.querySelector('#name2').value;
            document.getElementById('player2').innerHTML = `${Model.name2} O: ${Model.player2Score}`;
            document.querySelector('#name2').value = '';
        }
    },
    reset: () => {
        for (var j = 1; j <= 9; j++) {
            document.getElementById(`${j}`).innerHTML = '';
        }
        document.getElementById('winner').innerHTML = '';
        Model.playerX = [];
        Model.playerO = [];
        Model.victory = false;
    }
}

//Controller: handles user input; click handlers
var Controller = {
    boardClick: () => {
        for (var i = 1; i <= 9; i++) {
            document.getElementById(`${i}`).addEventListener('click', (event) => {View.click(event)})
        }
    },
    nameSelect: () => {
        document.getElementById('submit1').addEventListener('click', () => {View.nameSelect(1)})
        document.getElementById('submit2').addEventListener('click', () => {View.nameSelect(2)})
    },
    reset: () => {
        document.getElementById('reset').addEventListener('click', () => {View.reset()});
    }
}

View.initialize();
Controller.boardClick();
Controller.nameSelect();
Controller.reset();

