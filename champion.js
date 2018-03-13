
/* global IMG_HEIGHT, IMG_WIDTH, RIGHT, STATUS, LEFT, COUNT_SLIDE */
class Status
    {
        constructor(pathToImg)
        {
            this.texture = new Image(IMG_WIDTH,IMG_HEIGHT);
            this.texture.src = pathToImg;
            this.width = this.texture.naturalWidth/(COUNT_SLIDE*2);
            this.height = this.texture.naturalHeight;
            this.status=0;
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
        this.attackRange=20;
        this.pathToImage=FolderWithIMG;
        this.championDirection=RIGHT;
        this.attackColdown=800;
        this.attackIsPossible=true;

        this.status= new Status(FolderWithIMG + "/Idle.png");
        
        this.fury=0;
        setInterval(function(self){
            if(self.fury-2>0)self.fury-=2;
        },1000,this);
        
        
        
    }
    GetDamage(damage,KnockDirection)
    {
        this.hp=this.hp-damage;
        this.status=new Status(this.pathToImage+"/Hurt.png")
        if(KnockDirection===RIGHT)
            
        this.x-=this.movmentSpeed*3;
        else this.x+=this.movmentSpeed*3;
        
        this.fury+=5;
        if(this.fury>100)this.fury=100;
    }
	move(direction)
	{
        if(this.status.texture.src.match("/Idle.png") || this.status.texture.src.match("/Walking.png"))
        {
            if(this.status.texture.src===this.pathToImage+"/Idle.png")  this.status=new Status(this.pathToImage+"/Walking.png");
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
                    this.x+=this.movmentSpeed;
                    this.championDirection=RIGHT;
                    break;
                }
                case "top":
                {
                    this.status=new Status(this.pathToImage+"/Jump.png");
                    if(this.championDirection===RIGHT)
                    this.x+=this.movmentSpeed;
                    else this.x-=this.movmentSpeed;
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
        this.status=new Status(this.pathToImage+"/Attack.png")
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
            this.status.status=0;
            this.status= new Status(this.pathToImage + "/Idle.png");
        }
        this.furryBar(ctx);
    }
    



}
