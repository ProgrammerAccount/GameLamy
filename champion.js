
/* global IMG_HEIGHT, IMG_WIDTH, RIGHT, STATUS, LEFT, COUNT_SLIDE */
class Status
    {
        constructor(imgId)
        {
            this.texture = document.getElementById(imgId);
            this.height=this.texture.naturalHeight;    
            //this.texture.src = pathToImg;
            this.status=0;
            this.width = this.texture.naturalWidth/(COUNT_SLIDE*2);
        }
    
    }
class Champion
{
	constructor(FolderWithIMG )
	{
        this.x=10;
        this.y=10;
        this.attackDamage=10;
        this.hp=10;
        this.movmentSpeed=8;
        this.attackSpeed=10;
        this.walkStatus=0;
        this.attackRange=10;
        this.pathToImage=FolderWithIMG;
        this.championDirection=RIGHT;
        this.attackColdown=800;
        this.attackIsPossible=true;
        
        this.WALK = new Status(FolderWithIMG + "Walking");
        this.IDLE = new Status(FolderWithIMG + "Idle");
        this.JUMP = new Status(FolderWithIMG + "Jump");
        this.ATTACK = new Status(FolderWithIMG + "Attack");
        this.HURT = new Status(FolderWithIMG + "Hurt");
        
        this.status = this.IDLE;
        this.fury=0;
        setInterval(function(self){
            if(self.fury-2>0)self.fury-=2;
        },1000,this);
        
        
        
        
    }
    GetDamage(damage,KnockDirection)
    {
        if(this.status!== this.JUMP){
            this.hp=this.hp-damage;
            this.status=this.HURT;
            if(KnockDirection===RIGHT)
                {
                    if(this.x-this.movmentSpeed*3>0)
                        this.x-=this.movmentSpeed*3;
                }
                else if(this.x+this.movmentSpeed*3>Canvas.width-this.status.width)
                    this.x+=this.movmentSpeed*3;
            this.fury+=5;
            if(this.fury>100)this.fury=100;
        }   
    }
	move(direction)
	{
        if(this.status === this.IDLE || this.status === this.WALK )
        {
            if(this.status === this.IDLE)  this.status = this.WALK;
            switch (direction)
            {
                case "left":
                {
                    if(this.x>0)
                    this.x-=this.movmentSpeed;
                    this.championDirection=LEFT;
 
                    break;
                }
                case "right":
                {
                    if(this.x<Canvas.width-this.status.width)
                    this.x+=this.movmentSpeed;
                    this.championDirection=RIGHT;
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
    
	attack(EnemyX)
	{
        if(this.attackIsPossible)
        {
            this.attackIsPossible=false;
            let fun=self => self.attackIsPossible=true;
        setTimeout(fun,this.attackColdown,this);
        this.status = this.ATTACK;
        if(this.attackRange>Math.abs((this.x+IMG_WIDTH)-EnemyX) || this.attackRange>Math.abs(this.x-(EnemyX+IMG_WIDTH)))
		{
            return true;
        }
            return false;
        }
        return false;
	}
    furryBar(ctx)
    {
        ctx.fillStyle="#FF0000";
        ctx.fillRect(this.x,this.y,this.fury,5);
    }
    draw(ctx)
    {
        let x= this.x;
        if(this.status.width>150 && this.championDirection===LEFT) x-= IMG_WIDTH;
        
        ctx.drawImage(this.status.texture,
                      this.status.status*this.status.width+this.championDirection*COUNT_SLIDE*this.status.width,0,
                      this.status.width, this.status.height,
                      x, this.y,
                      this.status.width, this.status.height);
        
        this.status.status++;
        if(this.status.status>=COUNT_SLIDE) 
        {
            this.status.status = 0;
            this.status = this.IDLE;
        }
        this.furryBar(ctx);
    }
    



}
