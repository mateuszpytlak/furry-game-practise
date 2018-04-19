function init() {

    //Constructor Furry
    function Furry() {
        this.x = 0;
        this.y = 0;
        this.direction = 'right';
    }

    //Constructor Coin
    function Coin() {
        this.x = Math.floor(Math.random() * 10);
        this.y = Math.floor(Math.random() * 10);
    }

    //Constructor Game
    function Game() {
        this.board = document.querySelectorAll('section#board div');
        this.furry = new Furry();
        this.coin = new Coin();
        var self = this;
        this.score = 0;
        this.index = function (x, y) {
            return x + (y * 10);
        };
        this.showFurry = function () {
            this.hideVisibleFurry();
            if (this.board[this.index(this.furry.x, this.furry.y)] === undefined) {
                this.gameOver();
            } else {
                this.board[this.index(this.furry.x, this.furry.y)].classList.add('furry');
            }
        };
        this.showCoin = function () {
            this.board[this.index(this.coin.x, this.coin.y)].classList.add('coin');
        };
        this.startGame = function () {
            this.idSetInterval = setInterval(function () {
                self.moveFurry();
            }, 500);
        };
        this.moveFurry = function () {
            if (this.furry.direction === 'right') {
                this.furry.x = this.furry.x + 1;
            } else if (this.furry.direction === 'left') {
                this.furry.x = this.furry.x - 1;
            } else if (this.furry.direction === 'down') {
                this.furry.y = this.furry.y + 1;
            } else if (this.furry.direction === 'up') {
                this.furry.y = this.furry.y - 1;
            }
            this.showFurry();
            this.gameOver();
            // console.log(this.furry.y);
            this.checkCoinCollision();
        };
        this.hideVisibleFurry = function () {
            var furryDiv = document.querySelector('div.furry');
            if (furryDiv !== null) {
                furryDiv.classList.remove('furry');
            }
        };
        this.turnFurry = function (event) {
            // console.log(event.which);
            switch (event.which) {
                // U mnie sa inne kody strzalek z jakiegos powodu
                case 37:
                    this.furry.direction = 'left';
                    break;
                case 38:
                    this.furry.direction = 'up';
                    break;
                case 39:
                    this.furry.direction = 'right';
                    break;
                case 40:
                    this.furry.direction = 'down';
                    break
            }
        };
        this.checkCoinCollision = function () {
            if (this.furry.x === this.coin.x && this.furry.y === this.coin.y) {
                var scoreHTML = document.querySelector('#score div strong');

                self.board[this.index(this.coin.x, this.coin.y)].classList.remove('coin');
                this.score++;
                scoreHTML.textContent = this.score;

                this.coin = new Coin();
                this.showCoin();
            }
        };
        this.gameOver = function () {
            // if (this.board[this.index(this.furry.x, this.furry.y)] === undefined) {
            //     console.log('ups');
            if (this.furry.x < 0 || this.furry.x > 9 || this.furry.y < 0 || this.furry.y > 9) {
                console.log('Game OVER!!!');
                clearInterval(this.idSetInterval);
                this.hideVisibleFurry();
                var boardGame = document.querySelector('#board');
                boardGame.classList.add('invisible');
            }
        }
    }

    var game = new Game();
    game.showFurry();
    game.showCoin();

    game.startGame();

    document.addEventListener('keydown', function (event) {
        game.turnFurry(event);
    });

}

window.addEventListener('DOMContentLoaded', init);