function Furry() {
    this.x = 0;
    this.y = 0;
    this.direction = "right";
}

function Coin() {
    this.x = Math.floor(Math.random() * 10);
    this.y = Math.floor(Math.random() * 10);
}

function Game() {
    this.board = document.querySelectorAll('#board div');
    this.furry = new Furry();
    this.coin = new Coin();
    this.score = 0;

    this.index = function(x,y) {
        return x + (y * 10);
    };

    this.showFurry = function () {
        this.hideVisibleFurry();
        this.board[ this.index(this.furry.x,this.furry.y) ].classList.add('furry');
    };

    this.hideVisibleFurry = function () {
        const visible = document.querySelector(".furry");
        if (visible !== null) {
            visible.classList.remove("furry");
        }
    };

    this.showCoin = function () {
        this.board[ this.index(this.coin.x,this.coin.y) ].classList.add('coin');
    };

    const self = this;
    this.moveFurry = function () {
        if (self.furry.direction === "right") {
            self.furry.x = self.furry.x + 1;
        } else if (self.furry.direction === "left") {
            self.furry.x = self.furry.x - 1;
        } else if (self.furry.direction === "up") {
            self.furry.y = self.furry.y + 1;
        } else if (self.furry.direction === "down") {
            self.furry.y = self.furry.y - 1;
        }

        if (this.gameOver() === false) {
            this.showFurry();
            this.checkCoinCollision();
        }
    };

    this.turnFurry = (key) => {
        switch (key) {
            case 37:
                this.furry.direction = 'left';
                break;
            case 38:
                this.furry.direction = 'down';
                break;
            case 39:
                this.furry.direction = 'right';
                break;
            case 40:
                this.furry.direction = 'up';
                break;
        }
    };

    this.checkCoinCollision = () => {
        if (document.querySelector(".furry") === document.querySelector(".coin")) {
            this.score++;
            document.querySelector(".coin").classList.remove("coin");
            document.querySelector("#score strong").innerHTML = this.score;
            this.coin = new Coin();
            this.showCoin();
        }
    };

    this.gameOver = () => {
        if (this.furry.x < 0 || this.furry.x > 9 || this.furry.y < 0 || this.furry.y > 9) {
            clearInterval(this.idSetInterval);
            this.hideVisibleFurry();
            document.querySelector('.invisible').style.display = 'flex';
            document.querySelector('.invisible').style.justifyContent = 'center';
            document.querySelector('.score span').innerHTML = this.score;
            return true;
        }
        return false;
    };

    this.startGame = function () {
        this.idSetInterval = setInterval(() => {
            this.moveFurry()
        }, 250);

        document.addEventListener('keydown', (event) => {
            this.turnFurry(event.which);
        })
    };
}


const game = new Game();
game.showFurry();
game.showCoin();
game.startGame();
game.hideVisibleFurry();

const reload = document.querySelector('.secondary-text span');
reload.addEventListener('click', function () {
    location.reload();
});
