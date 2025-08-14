class TicTacToe {
    constructor() {
        this.board = Array(9).fill('');
        this.currentPlayer = 'X';
        this.gameActive = true;
        this.scores = { X: 0, O: 0 };
        this.winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
            [0, 4, 8], [2, 4, 6]             // diagonals
        ];
        
        this.initializeGame();
    }
    
    initializeGame() {
        this.board = Array(9).fill('');
        this.gameActive = true;
        this.updateCurrentPlayerDisplay();
        this.updateGameStatus('');
        
        // Clear the board UI
        const cells = document.querySelectorAll('.cell');
        cells.forEach(cell => {
            cell.classList.remove('x', 'o', 'win');
            cell.textContent = '';
        });
    }
    
    handleCellClick(index) {
        // Check if cell is already taken or game is inactive
        if (this.board[index] !== '' || !this.gameActive) return;
        
        // Update board state
        this.board[index] = this.currentPlayer;
        
        // Update UI
        const cell = document.querySelector(`.cell[data-index="${index}"]`);
        cell.classList.add(this.currentPlayer.toLowerCase());
        
        // Check for win or draw
        if (this.checkWin()) {
            this.handleWin();
        } else if (this.checkDraw()) {
            this.handleDraw();
        } else {
            // Switch player
            this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
            this.updateCurrentPlayerDisplay();
        }
    }
    
    checkWin() {
        return this.winPatterns.some(pattern => {
            const [a, b, c] = pattern;
            return (
                this.board[a] !== '' &&
                this.board[a] === this.board[b] &&
                this.board[a] === this.board[c]
            );
        });
    }
    
    checkDraw() {
        return this.board.every(cell => cell !== '');
    }
    
    handleWin() {
        this.gameActive = false;
        this.scores[this.currentPlayer]++;
        this.updateScores();
        
        // Highlight winning cells
        const winPattern = this.winPatterns.find(pattern => {
            const [a, b, c] = pattern;
            return (
                this.board[a] !== '' &&
                this.board[a] === this.board[b] &&
                this.board[a] === this.board[c]
            );
        });
        
        winPattern.forEach(index => {
            const cell = document.querySelector(`.cell[data-index="${index}"]`);
            cell.classList.add('win');
        });
        
        this.updateGameStatus(`Player ${this.currentPlayer} wins!`);
    }
    
    handleDraw() {
        this.gameActive = false;
        this.updateGameStatus("It's a draw!");
        document.getElementById('game-status').classList.add('draw');
    }
    
    updateCurrentPlayerDisplay() {
        document.getElementById('current-player').textContent = this.currentPlayer;
        document.getElementById('current-player').className = this.currentPlayer.toLowerCase();
    }
    
    updateScores() {
        document.getElementById('score-x').textContent = this.scores.X;
        document.getElementById('score-o').textContent = this.scores.O;
    }
    
    updateGameStatus(message) {
        const statusElement = document.getElementById('game-status');
        statusElement.textContent = message;
        statusElement.className = message.includes('wins') ? 'game-status win' : 'game-status';
    }
    
    resetGame() {
        this.initializeGame();
        document.getElementById('game-status').classList.remove('draw');
    }
    
    resetScores() {
        this.scores = { X: 0, O: 0 };
        this.updateScores();
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const game = new TicTacToe();
    
    // Add event listeners to cells
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.addEventListener('click', () => {
            const index = parseInt(cell.getAttribute('data-index'));
            game.handleCellClick(index);
        });
    });
    
    // Add event listener to reset button
    document.getElementById('reset-btn').addEventListener('click', () => {
        game.resetGame();
    });
});