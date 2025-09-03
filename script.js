const gameBoard = (function() {
    let board = [];
    let size = 3;
    for (let i = 0; i < size; i++) {
        board[i] = [];
        for (let j = 0; j < size; j++) {
            board[i][j] = "";
        }
    }

    // place mark if spot open
    const placeMark = function(mark, row, col) {
        if (board[row][col] === "") {
            board[row][col] = mark;
            return true;
        }
        return false; // spot already taken
    };

    const displayBoard = function() {
        console.log(board);
    };

    return {
        placeMark,
        displayBoard
    };
})();

function Player(name, mark) {
    return {
        getName: () => name,
        getMark: () => mark
    };
}

const Game = (function() {
    const player1 = Player(prompt("Enter Player 1 name:"), "X");
    const player2 = Player(prompt("Enter Player 2 name:"), "O");

    const players = [player1, player2];
    let currentPlayerIndex = 0;

    const playRound = function(row, column) {
        const currentPlayer = players[currentPlayerIndex];

        if (gameBoard.placeMark(currentPlayer.getMark(), row, column)) {
            console.log(`${currentPlayer.getName()} placed ${currentPlayer.getMark()} at (${row}, ${column})`);
            gameBoard.displayBoard();
            currentPlayerIndex = (currentPlayerIndex + 1) % 2;
        } else {
            console.log("Spot taken, try again.");
        }
    };

    return {
        playRound
    };
})();

// Example manual test after DOM loads
document.addEventListener("DOMContentLoaded", () => {
    Game.playRound(0, 0);
    Game.playRound(0, 0);
    Game.playRound(1, 1);
    Game.playRound(1, 0);
    Game.playRound(0, 1);
    Game.playRound(2, 0);
    Game.playRound(2, 2);
});
