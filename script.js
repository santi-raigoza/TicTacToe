const gameBoard = (function() {
    let board = [];
    let size = 3;
    
    const initBoard = function() {
        board = [];
        for (let i = 0; i < size; i++) {
            board[i] = [];
            for (let j = 0; j < size; j++) {
                board[i][j] = "";
            }
        }
    };

    initBoard();

    const placeMark = function(mark, row, col) {
        if (board[row] && board[row][col] === "") {
            board[row][col] = mark;
            return true;
        }
        return false;
    };

    const displayBoard = function() {
        console.log(board);
    };

    const getBoard = function() {
        return board;
    };

    const resetBoard = function() {
        initBoard();
    };

    return {
        placeMark,
        displayBoard,
        getBoard,
        resetBoard
    };
})();

function Player(name, mark) {
    return {
        getName: () => name,
        getMark: () => mark
    };
}

const Game = (function() {
    let player1, player2;
    let players = [];
    let currentPlayerIndex = 0;
    let gameEnded = false;

    const initPlayers = function(name1, name2) {
        player1 = Player(name1, "X");
        player2 = Player(name2, "O");
        players = [player1, player2];
        currentPlayerIndex = 0;
        gameEnded = false;
        updateCurrentPlayerDisplay();
    };

    const playRound = function(row, column) {
        if (gameEnded) return;

        const currentPlayer = players[currentPlayerIndex];
        const mark = currentPlayer.getMark();
        const name = currentPlayer.getName();

        if (gameBoard.placeMark(mark, row, column)) {
            updateCellDisplay(row, column, mark);
            gameBoard.displayBoard();
            
            if (checkWin(mark, row, column)) {
                console.log(`${name} wins!`);
                endGame(`${name} wins!`, 'win');
            } else if (checkDraw()) {
                console.log("The game is a draw!");
                endGame("It's a draw!", 'draw');
            } else {
                currentPlayerIndex = (currentPlayerIndex + 1) % 2;
                updateCurrentPlayerDisplay();
            }
        } else {
            console.log("Spot taken, try again.");
        }
    };

    const checkWin = function(mark, row, col) {
        const board = gameBoard.getBoard();
        const size = board.length;

        // check row for win
        if (board[row].every(cell => cell === mark)) {
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
            let win = true;
            for (let i = 0; i < size; i++) {
                if (board[i][i] !== mark) {
                    win = false;
                    break;
                }
            }
            if (win) {
                console.log(`${mark} won by diagonal`);
                return true;
            }
        } 
        
        // check bottom left to top right diagonal
        if (row + col === size - 1) {
            let win = true;
            for (let i = 0; i < size; i++) {
                if (board[i][size - 1 - i] !== mark) {
                    win = false;
                    break;
                }
            }
            if (win) {
                console.log(`${mark} won by diagonal`);
                return true;
            }
        }

        return false;
    };

    const checkDraw = function() {
        const board = gameBoard.getBoard();
        return board.flat().every(cell => cell !== "");
    };

    const updateCurrentPlayerDisplay = function() {
        const currentPlayer = players[currentPlayerIndex];
        const currentPlayerElement = document.getElementById('currentPlayer');
        currentPlayerElement.textContent = `${currentPlayer.getName()} (${currentPlayer.getMark()})`;
    };

    const updateCellDisplay = function(row, col, mark) {
        const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
        cell.textContent = mark;
        cell.classList.add(mark.toLowerCase());
    };

    const endGame = function(message, type) {
        gameEnded = true;
        const cells = document.querySelectorAll('.cell');
        cells.forEach(cell => cell.classList.add('disabled'));
        
        setTimeout(() => {
            showGameOverModal(message, type);
        }, 500);
    };

    const resetGame = function() {
        gameBoard.resetBoard();
        currentPlayerIndex = 0;
        gameEnded = false;
        
        const cells = document.querySelectorAll('.cell');
        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('x', 'o', 'disabled');
        });
        
        updateCurrentPlayerDisplay();
    };

    const getCurrentPlayer = function() {
        return players[currentPlayerIndex];
    };

    return {
        playRound,
        checkWin,
        checkDraw,
        initPlayers,
        resetGame,
        getCurrentPlayer
    };
})();

// DOM elements
const playersModal = document.getElementById('playersModal');
const playersForm = document.getElementById('playersForm');
const gameOverModal = document.getElementById('gameOverModal');
const cells = document.querySelectorAll('.cell');

// Modal functions
function showGameOverModal(message, type) {
    const title = document.getElementById('gameOverTitle');
    const messageEl = document.getElementById('gameOverMessage');
    
    if (type === 'win') {
        title.textContent = 'Congratulations!';
    } else {
        title.textContent = 'Game Over!';
    }
    
    messageEl.textContent = message;
    gameOverModal.showModal();
}

// Event listeners
playersForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const player1Name = document.getElementById('firstPlayerName').value.trim() || 'Player 1';
    const player2Name = document.getElementById('secondPlayerName').value.trim() || 'Player 2';
    
    Game.initPlayers(player1Name, player2Name);
    playersModal.close();
});

cells.forEach(cell => {
    cell.addEventListener('click', (e) => {
        const row = parseInt(e.target.dataset.row);
        const col = parseInt(e.target.dataset.col);
        Game.playRound(row, col);
    });
});

document.getElementById('playAgainBtn').addEventListener('click', () => {
    Game.resetGame();
    gameOverModal.close();
});

document.getElementById('newPlayersBtn').addEventListener('click', () => {
    Game.resetGame();
    gameOverModal.close();
    document.getElementById('firstPlayerName').value = '';
    document.getElementById('secondPlayerName').value = '';
    playersModal.showModal();
});