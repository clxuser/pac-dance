class Game {
    constructor() {
        this.score = 0;
        this.highScore = 0;
        this.isRunning = false;
        this.playerScores = new Map();
        this.currentPlayer = null;
    }

    start() {
        this.isRunning = true;
        this.score = 0;
        console.log('Game started!');
    }

    stop() {
        this.isRunning = false;
        if (this.score > this.highScore) {
            this.highScore = this.score;
            console.log(`New high score: ${this.highScore}!`);
        }
        console.log(`Game over! Final score: ${this.score}`);
    }

    setCurrentPlayer(playerName) {
        this.currentPlayer = playerName;
        if (!this.playerScores.has(playerName)) {
            this.playerScores.set(playerName, 0);
        }
    }

    addPoints(points) {
        if (this.isRunning) {
            this.score += points;
            if (this.currentPlayer) {
                const playerScore = this.playerScores.get(this.currentPlayer) + points;
                this.playerScores.set(this.currentPlayer, playerScore);
                console.log(`${this.currentPlayer}'s score: ${playerScore}`);
            }
            console.log(`Score: ${this.score}`);
        }
    }

    getPlayerScore(playerName) {
        return this.playerScores.get(playerName) || 0;
    }

    getAllPlayerScores() {
        return Object.fromEntries(this.playerScores);
    }

    getHighScore() {
        return this.highScore;
    }
}

module.exports = Game;
