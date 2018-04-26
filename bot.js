/* global LEFT, RIGHT, COUNT_SLIDE, FPS */

class Bot {
    constructor(player, opponent) {
        this.player = player;
        this.opponent = opponent;


    }
    calculateMove() {
        let farBetweenObject = this.player.x - this.opponent.x;
        if (Math.abs(farBetweenObject) > this.player.attackRange) {
            if (this.player.x > this.opponent.x)
                this.player.move("left");
            else this.player.move("right");
        }
        if (Canvas.width - (this.player.x + this.player.status.sizeWidth) < 40 &&
            Math.abs(this.opponent.x + this.opponent.attackRange - this.player.x) > 80) {
            this.player.move("left");
        } else if (this.player.x < 20 &&
            Math.abs(this.opponent.x - this.player.x) > 40) {
            this.player.move("right");

        } else if ((0.5 * this.player.attackRange) > Math.abs(farBetweenObject) &&
            Canvas.width - (this.player.x + this.player.status.sizeWidth) > 20) {
            if (this.player.x > this.opponent.x)
                this.player.move("right");
            else this.player.move("left");
        }




    }

    calculateDirection() {
        if (this.opponent.x < this.player.x)
            this.player.championDirection = LEFT;
        else this.player.championDirection = RIGHT;
    }

    calculateAttack() {

        let farBetweenPlayers = Math.abs(this.player.x - this.opponent.x);
        if (farBetweenPlayers < this.player.attackRange)

            if (this.player.attack(this.opponent))
                setTimeout((self) => {
                    if (self.player.championDirection === LEFT)
                        self.opponent.GetDamage(self.player.attackDamage, RIGHT);
                    else self.opponent.GetDamage(self.player.attackDamage, LEFT);
                }, 1000 / FPS * (COUNT_SLIDE - 1), this);
    }


    dogeAttack() {
        if (Math.random() * 10 === 5) {

            this.player.move("top");
            return true;
        }
        return false;
    }


}