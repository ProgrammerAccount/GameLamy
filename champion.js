/* global IMG_HEIGHT, IMG_WIDTH, RIGHT, STATUS, LEFT, COUNT_SLIDE */
class Status {
    constructor(imgId) {
        this.texture = document.getElementById(imgId);
        this.height = this.texture.naturalHeight;
        this.status = 0;
        this.width = this.texture.naturalWidth / (COUNT_SLIDE * 2);
        this.sizeWidth = (this.texture.naturalWidth / (COUNT_SLIDE * 2) * (window.innerWidth * 0.2)) / 100;
        this.sizeHeight = window.innerWidth * 0.2;
    }

}
class Champion {
    constructor(FolderWithIMG) {

        this.WALK = new Status(FolderWithIMG + "Walking");
        this.IDLE = new Status(FolderWithIMG + "Idle");
        this.JUMP = new Status(FolderWithIMG + "Jump");
        this.ATTACK = new Status(FolderWithIMG + "Attack");
        this.HURT = new Status(FolderWithIMG + "Hurt");

        this.status = this.IDLE;
        this.x = 10;
        this.y = window.innerHeight * 0.7 - this.status.sizeHeight;
        this.championDirection = RIGHT;
        this.movmentSpeed = window.innerWidth * 0.005;
        
        this.hp = 500;
        this.maxHP = 500;

        this.attackDamage = 10;
        this.attackRange = this.ATTACK.sizeWidth;
        this.attackSpeed = 10;      
        this.attackColdown = 800;
        this.attackIsPossible = true;
    }
    GetKnock()
    {
        if (KnockDirection === RIGHT) {
            if (this.x - this.movmentSpeed * 3 > 0)
                this.x -= this.movmentSpeed * 3;
        } else if (this.x < Canvas.width - this.status.sizeWidth)
            this.x += this.movmentSpeed * 3;
    }
    GetDamage(damage, KnockDirection) {
        if (this.status !== this.JUMP) {
            this.hp = this.hp - damage;
            this.status = this.HURT;
            this.GetKnock();


        }
    }
    move(direction) {
        if (this.status === this.IDLE || this.status === this.WALK) {
            if (this.status === this.IDLE) this.status = this.WALK;
            switch (direction) {
                case "left":
                    {
                        if (this.x > 0)
                            this.x -= this.movmentSpeed;
                        this.championDirection = LEFT;
                        break;
                    }
                case "right":
                    {
                        if (this.x < Canvas.width - this.status.sizeWidth)
                            this.x += this.movmentSpeed;
                        this.championDirection = RIGHT;
                        break;
                    }
                case "top":
                    {
                        this.status = this.JUMP;
                        break;
                    }
            }

        }


    }

    attack(Enemy) {
        if (this.attackIsPossible) {
            this.attackIsPossible = false;
            let fun = self => self.attackIsPossible = true;
            setTimeout(fun, this.attackColdown, this);
            this.status = this.ATTACK;


            if (Math.abs(Enemy.x - this.x) < this.attackRange)
                return true;
            return false;


        }
        return false;
    }
    drawHPBar(ctx) {
        ctx.fillStyle = "#FF0000";
        ctx.fillRect(this.x + (this.hp * (this.WALK.sizeWidth / this.maxHP))*0.1, this.y, (this.hp * (this.WALK.sizeWidth / this.maxHP))*0.8, 5);
    }
    draw(ctx) {
        let x = this.x;
        if (this.status.width > 150 && this.championDirection === LEFT) x -= this.status.sizeWidth / 2;

        ctx.drawImage(this.status.texture,
            this.status.status * this.status.width + this.championDirection * COUNT_SLIDE * this.status.width, 0,
            this.status.width, this.status.height,
            x, this.y,
            this.status.sizeWidth, this.status.sizeHeight);

        this.status.status++;
        if (this.status.status >= COUNT_SLIDE) {
            this.status.status = 0;
            this.status = this.IDLE;
        }
        this.drawHPBar(ctx);
    }




}