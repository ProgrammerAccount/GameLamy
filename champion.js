
/* global IMG_HEIGHT, IMG_WIDTH, RIGHT, STATUS, LEFT, COUNT_SLIDE */

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
        
	this.textureWalk = new Image(IMG_WIDTH,IMG_HEIGHT);
        this.textureWalk.src = FolderWithIMG + "/Walking.png";
        this.championDirection=RIGHT;
        
        this.textureAttack=new Image(IMG_WIDTH,IMG_HEIGHT);
        this.textureAttack.src=FolderWithIMG + "/Attack.png";
        this.attackStatus=0;
        this.attackColdown=800;
        this.attackIsPossible=true;
        
        
        this.textureIdle = new Image(IMG_WIDTH,IMG_HEIGHT);
        this.textureIdle.src = FolderWithIMG + "/Idle.png";
        this.idleStatus=0;
        
        this.textureJump=new Image(IMG_WIDTH,IMG_HEIGHT);
        this.textureJump.src=FolderWithIMG+"/Jump.png";
        this.jumpStatus=0;
        
        this.textureHurt=new Image(IMG_WIDTH,IMG_HEIGHT);
        this.textureHurt.src=FolderWithIMG+"/Hurt.png";
        this.hurtStatus=0;
        
        this.status=STATUS.IDLE;
        
        this.fury=0;
        setInterval(function(self){
            if(self.fury-2>0)self.fury-=2;
        },1000,this);
        
    }
    GetDamage(damage,KnockDirection)
    {
        this.hp=this.hp-damage;
        this.status=STATUS.HURT;
        if(KnockDirection===RIGHT)
        this.x-=this.movmentSpeed*3;
        else this.x+=this.movmentSpeed*3;
        this.fury+=5;
        if(this.fury>100)this.fury=100;
    }
	move(direction)
	{
        if(this.status===STATUS.IDLE)
        {
            switch (direction)
            {
                case "left":
                {
                    if(this.x>0)
                    this.x-=this.movmentSpeed;
                    this.championDirection=LEFT;
                    this.status=STATUS.WALK;
                    break;
                }
                case "right":
                {
                    this.x+=this.movmentSpeed;
                    this.championDirection=RIGHT;
                    this.status=STATUS.WALK;
                    break;
                }
                case "top":
                {
                    this.status=STATUS.JUMP;
                    if(this.championDirection===RIGHT)
                    this.x+=this.movmentSpeed;
                    else this.x-=this.movmentSpeed;
                    break;
                }
            this.status=STATUS.WALK;    

            }
            
           if(this.walkStatus+1  < COUNT_SLIDE)
            {
                this.walkStatus++;
            }
            else this.walkStatus=0;
        }


    }
    
	attack(EnemyX)
	{
        //console.log(this.x+"  "+EnemyX);
        if(this.attackIsPossible)
        {
        this.attackIsPossible=false;
        let fun=function(self)
            {
                self.attackIsPossible=true;
            };
        setTimeout(fun,this.attackColdown,this);
        this.status=STATUS.ATTACK;
        if(this.attackRange>Math.abs((this.x+IMG_WIDTH)-EnemyX) || this.attackRange>Math.abs(this.x-(EnemyX+IMG_WIDTH)))
		{
            return true;
        }
            return false;
        }
        return false;
	}
    draw(ctx)
    {
       
       switch(this.status)
        {
            case STATUS.WALK:
            {
                let startWidth=IMG_WIDTH*this.walkStatus+this.championDirection*COUNT_SLIDE*IMG_WIDTH;
                ctx.drawImage(this.textureWalk,startWidth,0,IMG_WIDTH,IMG_HEIGHT,this.x,this.y,IMG_WIDTH,IMG_HEIGHT);
                this.status=STATUS.IDLE;
                break;
            }
            case STATUS.ATTACK:
            {
                 let imgWidth=this.textureAttack.naturalWidth/(COUNT_SLIDE*2);
                 let startWidth=imgWidth*this.attackStatus+this.championDirection*COUNT_SLIDE*imgWidth;
                if(imgWidth>150 && this.championDirection===LEFT)
                 ctx.drawImage(this.textureAttack,startWidth,0,imgWidth,IMG_HEIGHT,this.x-IMG_WIDTH,this.y,imgWidth,IMG_HEIGHT);
                
                else ctx.drawImage(this.textureAttack,startWidth,0,imgWidth,IMG_HEIGHT,this.x,this.y,imgWidth,IMG_HEIGHT);
                
                 if(this.attackStatus+1  < COUNT_SLIDE)
                 {
                    this.attackStatus++;
                 }
                 else
                 {
                    this.attackStatus=0;
                    this.status=STATUS.IDLE;
                    this.walkStatus=0;
                 }   
                break;
            }
            case STATUS.IDLE:
            {
                 let startWidth=IMG_WIDTH*this.attackStatus+this.championDirection*COUNT_SLIDE*IMG_WIDTH;
                 ctx.drawImage(this.textureIdle,startWidth,0,IMG_WIDTH,IMG_HEIGHT,this.x,this.y,IMG_WIDTH,IMG_HEIGHT);
                
                 if(this.idleStatus+1  < COUNT_SLIDE)
                 {
                    this.idleStatus++;
                 } else this.idleStatus=0;
                break;
            } 
            case STATUS.JUMP:
            {
                 let startWidth=IMG_WIDTH*this.jumpStatus+this.championDirection*COUNT_SLIDE*IMG_WIDTH;
                 ctx.drawImage(this.textureJump,startWidth,0,IMG_WIDTH,IMG_HEIGHT,this.x,this.y,IMG_WIDTH,IMG_HEIGHT);
                
                 if(this.jumpStatus+1  < COUNT_SLIDE)
                 {
                    this.jumpStatus++;
                 }
                 else
                 {
                    this.jumpStatus=0;
                    this.status=STATUS.IDLE;
                 }
                break;
            } 
            case STATUS.HURT:
            {
                 let startWidth=IMG_WIDTH*this.hurtStatus+this.championDirection*COUNT_SLIDE*IMG_WIDTH;
                 ctx.drawImage(this.textureHurt,startWidth,0,IMG_WIDTH,IMG_HEIGHT,this.x,this.y,IMG_WIDTH,IMG_HEIGHT);
                
                 if(this.hurtStatus+1  < COUNT_SLIDE)
                 {
                    this.hurtStatus++;
                 }
                 else
                 {
                    this.hurtStatus=0;
                    this.status=STATUS.IDLE;
                 }
                break;
            }    
        }
        ctx.fillStyle="#FF0000";
        ctx.fillRect(this.x,this.y,this.fury,5);
    }
    



}
