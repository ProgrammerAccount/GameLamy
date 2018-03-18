/* global LEFT, FPS, COUNT_SLIDE, RIGHT */

let Ola= new Champion("Ola");
let Ala= new Champion("Ala");
Ala.MovmentSpeed=5;
Ala.x=window.innerWidth*0.8;
Ala.attackRange=window.innerWidth*0.3;
let bot= new Bot(Ala,Ola);
let Canvas= document.getElementById("canvas");
let ctx= Canvas.getContext("2d");
let control=document.getElementById("control");
let analog = document.getElementById("analog");
let attackButton = document.getElementById("attack");
const ANALOG_POSITION_X = control.offsetLeft+analog.offsetLeft;
const ANALOG_POSITION_Y = control.offsetTop+analog.offsetTop;

Canvas.width = window.innerWidth;
Canvas.height =  window.innerHeight;
document.getElementsByTagName("body")[0].width = window.innerWidth;
document.getElementsByTagName("body")[0].height = window.innerHeight;
Canvas.height =  window.innerHeight;


let KeyStatus={
		top:false,
		right:false,
		left:false,
		down:false,
		attack:false
};
const KeyCode={
        87:"top",
        83:"down",
        68:"right",
        65:"left",
        32:"attack"
    };
window.addEventListener("keyup",event => KeyStatus[KeyCode[event.keyCode]]=false);
window.addEventListener("keydown",event => KeyStatus[KeyCode[event.keyCode]]=true);

attackButton.addEventListener("touchstart",e => KeyStatus.attack=true);

attackButton.addEventListener("touchend",e => KeyStatus.attack=false);
control.addEventListener("touchmove",(e)=>{

    let touchObj= e.changedTouches[0];
    let horizontalDist =touchObj.clientX - ANALOG_POSITION_X;
    let verticalDist = touchObj.clientY - ANALOG_POSITION_Y;
    
    if(verticalDist>control.clientHeight*0.5)
        verticalDist=control.clientHeight*0.5;
    else if(Math.abs(verticalDist)>control.clientHeight*0.5)
        verticalDist=control.clientHeight*-0.5;

    if(horizontalDist>control.clientWidth*0.5)
        horizontalDist=control.clientWidth*0.5;
    else if(Math.abs(horizontalDist)>control.clientWidth*0.5)
        horizontalDist=control.clientWidth*-0.5;
            
    analog.style.left= horizontalDist+"px";
    analog.style.top= verticalDist+"px";        
    
    if(horizontalDist>25)
        KeyStatus.right=true;
    else KeyStatus.right=false;

    if(horizontalDist<-25)
        KeyStatus.left=true;
    else KeyStatus.left=false;
    
    if(verticalDist<-25)
        KeyStatus.top=true;
    else KeyStatus.top=false;
    
    
  
});
control.addEventListener("touchend",(e) => {

analog.style.top=0;
analog.style.left=0;
KeyStatus.top=false;
KeyStatus.left=false;
KeyStatus.right=false;    
});


function update()
{
if(KeyStatus.left)
    Ola.move("left");
if(KeyStatus.right)
    Ola.move("right");
if(KeyStatus.top)
    Ola.move("top");
if(KeyStatus.attack)
      if(Ola.attack(Ala.x))
     setTimeout(()=>{          
        if(Ola.championDirection===LEFT)//set knock direction
            Ala.GetDamage(Ola.attackDamage,RIGHT);
        else Ala.GetDamage(Ola.attackDamage,LEFT);
    },1000/FPS*(COUNT_SLIDE-1));


bot.calculateDirection();
bot.calculateMove();
bot.calculateAttack();    
}

function draw() {
    Ola.draw(ctx);
    Ala.draw(ctx);
}



setInterval(function () {
  ctx.clearRect(0,0,Canvas.width,Canvas.height);
  update();
  draw(ctx);
    
}, 1000/FPS);
