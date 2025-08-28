
const gameBoard = (function() {
    let board = [];
    let size = 3;
    for (let i = 0; i < size; i++) {
        board[i] = [];
        for (let j = 0; j < size; j++) {
            board[i][j] = "";
        }
    }

    const placeMark = function(player, row, col) {
        if (player === 1) {
            board[row][col] = "X";
        } else if (player === 2) {
            board[row][col] = "O";
        } else {
            console.log("Improper player information");
        }
    }

    const displayBoard = function() {
        return board;
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

player1Name = prompt("Player 1:");
player1 = Player(1);
player1.playerName = player1Name;

player2Name = prompt("Player 2:");
player2 = Player(2);
player2.playerName = player2Name;

console.log(player1);
console.log(player2);

gameBoard.placeMark(1, 1, 2);
console.log(gameBoard.displayBoard());
