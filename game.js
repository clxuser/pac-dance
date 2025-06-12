class Game {
    constructor() {
        this.score = 0;
        this.highScore = 0;
        this.isRunning = false;
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

    addPoints(points) {
        if (this.isRunning) {
            this.score += points;
            console.log(`Score: ${this.score}`);
        }
    }

    getHighScore() {
        return this.highScore;
    }
}

module.exports = Game;
