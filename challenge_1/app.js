var player = true;
var playerX = [];
var playerO = [];

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
            document.getElementById('winner').innerHTML = 'Player X Wins!';
        }
        playerX.push(coord);
    } else {
        if (verify(playerO, coord)) {
            document.getElementById('winner').innerHTML = 'Player O Wins!';
        }
        playerO.push(coord);
    }
    player = !player;
}

for (var i = 1; i <= 9; i++) {
    document.getElementById(`${i}`).addEventListener('click', (event) => {click(event)})
}
document.getElementById('reset').addEventListener('click', () => {
    for (var j = 1; j <= 9; j++) {
        document.getElementById(`${j}`).innerHTML = '';
    }
    document.getElementById('winner').innerHTML = '';
    playerX = [];
    playerO = [];
    player = true;
})
