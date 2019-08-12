//game state on load
var player = true;
var playerX = [];
var playerO = [];
var name1 = '';
var name2 = '';
var player1Score = 0;
var player2Score = 0;
document.getElementById('player1').innerHTML = `${name1} X: ${player1Score}`;
document.getElementById('player2').innerHTML = `${name2} O: ${player2Score}`;

//verify win
var verify = (arr, coord) => {
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
}

// game functionality
var click = (event) => {
    if (event.target.innerHTML) {
        return;
    }
    var bank = [[0,0], [0,1], [0,2], [1,0], [1,1], [1,2], [2,0], [2,1], [2,2]];
    var coord = bank[parseInt(event.target.id) - 1];
    var piece;
    if (player) {
        piece = 'x';
    } else {
        piece = 'o';
    }
    event.target.append(document.createTextNode(`${piece}`));
    if (player) {
        if (verify(playerX, coord)) {
            if (name1 === '') {
                document.getElementById('winner').innerHTML = `X Wins!`;
            } else {
                document.getElementById('winner').innerHTML = `${name1} Wins!`;
            }
            player1Score++;
            document.getElementById('player1').innerHTML = `${name1} X: ${player1Score}`;
            player = true;
            return;
        }
        playerX.push(coord);
    } else {
        if (verify(playerO, coord)) {
            if (name2 === '') {
                document.getElementById('winner').innerHTML = `O Wins!`;
            } else {
                document.getElementById('winner').innerHTML = `${name2} Wins!`;
            }
            player2Score++;
            document.getElementById('player2').innerHTML = `${name2} O: ${player2Score}`;
            player = false;
            return;
        }
        playerO.push(coord);
    }
    player = !player;
}

//game board click handlers
for (var i = 1; i <= 9; i++) {
    document.getElementById(`${i}`).addEventListener('click', (event) => {click(event)})
}

//name selection click handlers
document.getElementById('submit1').addEventListener('click', () => {
    if (document.querySelector('#name1').value === '') {
        return;
    }
    name1 = document.querySelector('#name1').value;
    document.getElementById('player1').innerHTML = `${name1} X: ${player1Score}`;
    document.querySelector('#name1').value = '';
})
document.getElementById('submit2').addEventListener('click', () => {
    if (document.querySelector('#name2').value === '') {
        return;
    }
    name2 = document.querySelector('#name2').value;
    document.getElementById('player2').innerHTML = `${name2} O: ${player2Score}`;
    document.querySelector('#name2').value = '';
})

//reset click handler
document.getElementById('reset').addEventListener('click', () => {
    for (var j = 1; j <= 9; j++) {
        document.getElementById(`${j}`).innerHTML = '';
    }
    document.getElementById('winner').innerHTML = '';
    playerX = [];
    playerO = [];
})
