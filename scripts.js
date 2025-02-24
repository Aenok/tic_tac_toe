function createBoard() {
    
    const num = 3;

    let header = document.getElementById("header_text");
    let newBtn = document.getElementById("new_game");
    let exit = document.getElementById("exit");
    let bye = document.getElementById("bye");
    const boardEle = document.getElementById("game_board");
    let gameArray;

    // Create board
    gameArray = []
    for(let i = 0; i < num; i++) {
        gameArray.push([]);
        for(let j = 0; j < num; j++){
            gameArray[i].push('$');
        }
    }

    for(let i = 0; i < boardEle.children.length; i++) {
        for(let j = 0; j < boardEle.children[i].children.length; j++) {
            boardEle.children[i].children[j].innerHTML = "";
        }
    }


    return { header, newBtn, exit, boardEle, gameArray, bye };
}

function player(name, symbol) {
    return { name, symbol};
}


function gameController() {
    
    const board = createBoard();
    let img;
    let imgSrc1 = "./images/o.png";
    let imgSrc2 = "./images/close.png";

    const p1 = player('Player 1', "O");
    const p2 = player('Player 2', "X");

    let winner;

    let players = [p1, p2];

    // Randomly selects the player that goes first.
    let activePlayer = players[Math.floor(Math.random() * 2)];

    header.textContent = `${activePlayer.name}'s Turn!`;
    
    // Handles the event listeners for each square
    for(let i = 0; i < board.boardEle.children.length; i++) {
        for(let j = 0; j < board.boardEle.children.length; j++) {
            board.boardEle.children[i].children[j].addEventListener('click', function() {
                img = new Image(150, 150);
                img.src = activePlayer === p1 ? imgSrc1 : imgSrc2;
                if(playTurn(activePlayer, i, j)) {
                    board.boardEle.children[i].children[j].appendChild(img);
                    checkForWinner()
                    switchPlayers();
                }
                if(winner) {
                    header.textContent = `${activePlayer.name} Won!`;           
                    //newGame();
                }
           })
        }
    }

    board.newBtn.addEventListener('click', newGame)
    board.exit.addEventListener('click', goodBye)

    function newGame() {
        location.reload();
    }

    function goodBye() {
        header.textContent = "Thank you for playing!";
        board.boardEle.style.display = "none";
        board.bye.style.display = "block";
        board.newBtn.style.display = "none";
        board.exit.style.display = "none";

    }


    // switches the active player
    function switchPlayers() {
        activePlayer = activePlayer === p1 ? p2 : p1;
        header.textContent = `${activePlayer.name}'s Turn!`;
    }

    // updates the game board based on the players symbol and the coordinates given
    function playTurn(player, x, y) {
        if(!winner && board.gameArray[x][y] === '$') {
            board.gameArray[x][y] = player.symbol;
            return true;
        } else {
            return false;
        }

    }

    
    // sub function used after every turn to see if a winner can be found given the updated board
    function checkForWinner() {

        // helper function to check if an array contains all the same element
        function isEqual(array, index) {
            const check = (ele) => ele === array[index];
            return array.every(check);
        }

        // helper function to determine the winner 
        // function is only ever called when the "isEqual" function returns true, indicating a winner has been found
        // finds the winning player based on the symbol passed to it
        function findPlayer(char) {
            return char === p1.symbol ? p1 : p2;
        }
      

        // Checking for 3 in a row
        for(let i = 0; i < board.gameArray.length; i++) {
            if (isEqual(board.gameArray[i], 0) && board.gameArray[i][0] !== '$') {
                winner = findPlayer(board.gameArray[i][0]).name;
            }
        }

        // Checking for 3 in a column
        let tempArray = [];
        for(let i = 0; i < board.gameArray.length; i++) {
            for(let j = 0; j < board.gameArray.length; j++) {
                tempArray.push(board.gameArray[j][i]);
            }
            if (isEqual(tempArray, 0) && tempArray[0] !== '$') {
                winner = findPlayer(tempArray[0]).name;
            }
            tempArray = [];
        }

        // Checking for 3 diagonally
        for(let i = 0; i < board.gameArray.length; i++) {
            tempArray.push(board.gameArray[i][i]);
        }
        if (isEqual(tempArray, 0) && tempArray[0] !== '$') {
            winner = findPlayer(tempArray[0]).name;        
        }
        
        tempArray = [];
        tempArray.push(board.gameArray[0][2]);
        tempArray.push(board.gameArray[1][1]);
        tempArray.push(board.gameArray[2][0]);
        if (isEqual(tempArray, 0) && tempArray[0] !== '$') {
            winner = findPlayer(tempArray[0]).name;
        }
    }
}

gameController();



