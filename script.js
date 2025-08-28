const gameBoard = (function() {
    let board = [];
    let size = 3;
    for (let i = 0; i < size; i++) {
        board[i] = [];
        for (let j = 0; j < size; j++) {
            board[i][j] = "";
        }
    }

    const placeMark = function(mark, row, col) {
        board[row][col] = mark;
    }

    const displayBoard = function() {
        console.log(board);
    }

    return {
        placeMark,
        displayBoard
    };
})();

function Player(playerNumber) {

    let playerName = "";
    let playerMark = "";

    if (playerNumber === 1) {
        playerMark = "X";
    } else if (playerNumber === 2) {
        playerMark = "O";
    }

    return {
        playerName,
        playerMark
    }
}

// player1Name = prompt("Player 1:"); 
player1Name = "Santi";
player1 = Player(1);
player1.playerName = player1Name;

// player2Name = prompt("Player 2:");
player2Name = "Mia";
player2 = Player(2);
player2.playerName = player2Name;

gameBoard.placeMark(player1.playerMark, 1, 1);
gameBoard.placeMark(player2.playerMark, 1, 2);
gameBoard.placeMark(player1.playerMark, 0, 2);
gameBoard.displayBoard();
