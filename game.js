class Game {
    constructor() {
        this.score = 0;
        this.highScore = 0;
        this.isRunning = false;
        this.playerScores = new Map();
        this.currentPlayer = null;
        this.leaderboard = [];
        this.maxLeaderboardEntries = 10;
        this.activePowerUps = new Map();
        this.powerUpTypes = {
            doublePoints: { duration: 10000, multiplier: 2 },
            speedBoost: { duration: 5000, speedIncrease: 1.5 },
            shield: { duration: 8000 }
        };
        this.comboCount = 0;
        this.lastPointTime = 0;
        this.comboTimeout = 2000; // 2 seconds to maintain combo
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
        if (this.currentPlayer) {
            this.updateLeaderboard(this.currentPlayer, this.score);
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
            const now = Date.now();
            if (now - this.lastPointTime < this.comboTimeout) {
                this.comboCount++;
                points *= (1 + this.comboCount * 0.1); // 10% bonus per combo level
            } else {
                this.comboCount = 0;
            }
            this.lastPointTime = now;

            let finalPoints = points;
            if (this.activePowerUps.has('doublePoints')) {
                finalPoints *= this.powerUpTypes.doublePoints.multiplier;
            }
            
            if (this.comboCount > 0) {
                console.log(`Combo x${this.comboCount + 1}! Points multiplied by ${1 + this.comboCount * 0.1}x`);
            }

            this.score += Math.round(finalPoints);
            if (this.currentPlayer) {
                const playerScore = this.playerScores.get(this.currentPlayer) + Math.round(finalPoints);
                this.playerScores.set(this.currentPlayer, playerScore);
                console.log(`${this.currentPlayer}'s score: ${playerScore}`);
            }
            console.log(`Score: ${this.score}`);
        }
    }

    activatePowerUp(type) {
        if (this.powerUpTypes[type]) {
            this.activePowerUps.set(type, Date.now());
            console.log(`${type} power-up activated!`);
            
            setTimeout(() => {
                this.activePowerUps.delete(type);
                console.log(`${type} power-up expired!`);
            }, this.powerUpTypes[type].duration);
        }
    }

    hasPowerUp(type) {
        return this.activePowerUps.has(type);
    }

    updateLeaderboard(playerName, score) {
        this.leaderboard.push({ playerName, score, date: new Date() });
        this.leaderboard.sort((a, b) => b.score - a.score);
        if (this.leaderboard.length > this.maxLeaderboardEntries) {
            this.leaderboard = this.leaderboard.slice(0, this.maxLeaderboardEntries);
        }
        console.log('\nLeaderboard:');
        this.leaderboard.forEach((entry, index) => {
            console.log(`${index + 1}. ${entry.playerName}: ${entry.score} (${entry.date.toLocaleDateString()})`);
        });
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

    getLeaderboard() {
        return [...this.leaderboard];
    }

    getComboCount() {
        return this.comboCount;
    }
}

module.exports = Game;
