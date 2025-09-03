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

    const getBoard = function() {
        return board;
    }

    return {
        placeMark,
        displayBoard,
        getBoard
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
        const mark = currentPlayer.getMark();
        const name = currentPlayer.getName();

        if (gameBoard.placeMark(mark, row, column)) {
            console.log(`${name} placed ${mark} at (${row}, ${column})`);
            gameBoard.displayBoard();
            
            // return true if win, false if not
            if (checkWin(mark, row, column)) {
                console.log(`${name} wins!`);
            }

            currentPlayerIndex = (currentPlayerIndex + 1) % 2;
        } else {
            console.log("Spot taken, try again.");
        }

    };

    const checkWin = function(mark, row, col) {
        const board = gameBoard.getBoard();
        const size = board.length;
        let win = true;

        // check row for win
        if (board[row].every(item => item === mark)) {
            console.log(`${mark} won by row`);
            return true;
        } 
        
        // check column for win
        if (board.every(r => r[col] === mark)) {
            console.log(`${mark} won by column`);
            return true;
        } 
        
        // check top left to bottom right diagonal
        if (row === col) {
            for (let i = 0; i < size; i++) {
                if (board[i][i] !== mark) {
                    win = false;
                }
            }

            if (win) {
                console.log(`${mark} won by diagonal`);
                return true;
            }
        } 
        
        // check bottom left to top right diagonal
        if (row + col === size - 1) {
            for (let i = 0; i < size; i++) {
                if (board[i][size - 1 - i] !== mark) {
                    win = false;
                }
            }

            if (win) {
                console.log(`${mark} won by diagonal`);
                return true;
            }
        }
    }

    return {
        playRound,
        checkWin
    };
})();

// Example manual test after DOM loads
document.addEventListener("DOMContentLoaded", () => {
    Game.playRound(0, 2);
    Game.playRound(0, 1);
    Game.playRound(1, 1);
    Game.playRound(1, 0);
    Game.playRound(2, 0);
});
