function createBoard() {
    
    const num = 3;

    let gameArray = [];

    // Create board
    for(let i = 0; i < num; i++) {
        gameArray.push([]);
        for(let j = 0; j < num; j++){
            gameArray[i].push('$');
        }
    }

    return { gameArray };
}

function player(name, symbol) {
    return { name, symbol};
}


function gameController() {
    
    let board = createBoard();
    let p1 = player('Player 1', "X");
    let p2 = player('Player 2', "O");

    let players = [p1, p2];

    let activePlayer = players[Math.floor(Math.random() * 2)];

    function switchPlayers() {
        activePlayer = activePlayer === p1 ? p2 : p1;
    }

    console.log(board.gameArray);

    function playTurn(player, x, y) {
        board.gameArray[x][y] = player.symbol;
    }

    //playTurn(p1, 0, 0);

    console.log(board.gameArray);


    function initGame() {
        
    }

}

let test = gameController();


