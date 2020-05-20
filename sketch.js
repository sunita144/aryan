var player, bulletGroup, enemyGroup;
var bgImage;
var playerAngle, p1,p2,p3,p4;
var bulletImg;
var score, enemyKillCount,money,moneyImg;
var grenade, gameOver, gameover;
var hw;
var virus;
var spike1,spike3,spike4,tyre;
var timer,x;
var randomiser;
var gameState ="play";
var lives = 3;
var bgMusic,boomSound,deathSound;
var restartImg, restart;
var greenHue;
function preload(){
bgImage = loadImage("backG.jpg");

bulletImg = loadImage("Grenade1.png");

spike1 = loadImage("Spike1.png");
spike3 = loadImage("poop.png");
spike4 = loadImage("Icon.png");

p1 = loadImage("p1.png")
p2 = loadImage("p2.png")
p3 = loadImage("p3.png")
p4 = loadImage("p4.png")

gameOver = loadImage("gameover.png");
grenade1 = loadImage("Grenade1.png");

virus = loadImage("virus.png");
hw = loadImage("hw.webp");
boom = loadImage("boom.png");
tyre = loadImage("tyre.png");

moneyImg = loadImage("money.png");
restartImg = loadImage("restart.png");


bgMusic = loadSound("bgMusic.mp3");
boomSound = loadSound("boom.mp3");
deathSound = loadSound("death.mp3");
}

function setup(){
createCanvas(1500,700);

player = createSprite(width/2, height/2,20,20);
player.addImage(p1);
player.scale = 0.3

restart = createSprite(1450,50,20,20);
restart.addImage(restartImg);
restart.scale = 0.1
restart.depth = 101

gameover = createSprite(displayWidth/2,displayHeight/2,displayWidth,displayHeight);
gameover.addImage(gameOver);
gameover.scale = 1;
gameover.visible = false;
bulletGroup = new Group();
enemyGroup = new Group();

score = 0;
enemyKillCount = 0;
money = 1;
timer = 0;
x = 0;
lives =200; 
greenHue = 0.2;

}

function draw(){

background(bgImage);

//bgMusic.play();

textSize(55);
textFont("Impact");
greenHue+=1;
if(greenHue ===255){
  greenhue = 0.2;
}
fill(0,greenHue,0);

stroke("black");
strokeWeight(3);

if(gameState ==="play"){

if(frameCount % 62  === 0){
spawnEnemiesTop();
spawnEnemiesTopLeft();
spawnEnemiesLeft();
spawnEnemiesBottomLeft();
spawnEnemiesBottom();
spawnEnemiesRight();
}

if(player.x > 1494 || player.x < 6 || player.y >694 || player.y < 0){
  player.velocityY = -player.velocityY;
  player.velocityX = -player.velocityX;
}

for(var i = 0; i<enemyGroup.length; i++ ){
temp = enemyGroup.get(i);

for(var j = 0; j<bulletGroup.length; j++){
temp2 = bulletGroup.get(j);

if(temp2.collide(temp)){
temp.addImage(boom);
boomSound.play();

if(timer >= 5){
timer = 0;
timer+=1;
temp.destroy();
temp2.destroy();

temp = null;
temp2 = null;
}

score+=round(random(5,20));
enemyKillCount+=1;
money+=round(random(25,250));

break;
}
}
}

if(keyWentDown(UP_ARROW)){
  x+=1
  if(x>=2){
spawnBullets();
x = 0;
  }
}

//playerAngle = player.rotation;

 if(keyDown("w")){
 player.velocityY =-6.5;
 player.velocityX = 0;
 player.addImage(p4);
 
 }

if(keyDown("s")){
  player.velocityY = 6.5;
  player.velocityX = 0;
  player.addImage(p2);
  }
  
if(keyDown("a")){
  player.velocityX = -6.5;
  player.velocityY = 0;
  player.addImage(p3);
  }
  
if(keyDown("d")){
  player.velocityX = 6.5;
  player.velocityY = 0;
  player.addImage(p1);
  }
  if(enemyGroup.isTouching(player)){
    lives-=1;
  }
  if(mousePressedOver(restart)){
    reset();
  }
  if(keyDown("g") && money>2000){
money = money- 2000;
lives = lives + round(random(20,40));
  }
  if(lives === 0){
gameState ="end";
deathSound.play();
  }

}

  text("Score : "+score,550,50);
  text("Kills : "+enemyKillCount,1000,50);
  image(moneyImg,7,1,40,60)
  text("     Money : $"+money,7,50);
  text("Buy lives for $2000",7,100);
  text("lives:"+ lives,5,650);
  
if(gameState ==="end"){
imageMode(CENTER);

//image(gameOver,displayWidth/2,displayHeight/2,displayWidth,displayHeight)

   fill(random(0,255),random(0,255),random(0,255));
gameover.visible = true;
  text("Score : "+score,550,50);
  text("Kills : "+enemyKillCount,1000,50);
  text("      Money: "+money+"$",7,50);
  image(moneyImg,7,1,20,30);
  text("lives:"+ lives,5,650);

  if(mousePressedOver(restart)){
    reset();
  }

  }

  drawSprites();

}



function spawnEnemiesTop(){
var enemy = createSprite(random(0,1500),0,random(20,40),random(20,40));

enemy.velocityY = 10;
enemy.lifetime= 100;
enemy.rotationSpeed = random(10,30);
enemyGroup.add(enemy);
randomiser = round(random(1,6));
switch(randomiser){
  case 1:
    enemy.addImage(hw);
    enemy.scale = 0.1;
    break;
    case 2:
      enemy.addImage(spike1);
      enemy.scale = 0.3;
      break;
      case 3:
        enemy.addImage(spike3);
        enemy.scale = 0.2;
        break;
        case 4:
          enemy.addImage(spike4);
          enemy.scale = random(0.03,0.1);
          break;
          case 5:
            enemy.addImage(virus);
            enemy.scale = random(0.07,0.2);
            break;
            case 6:
             enemy.addImage(tyre);
             enemy.scale = random(0.1,0.2);
             break;
}
}
function spawnEnemiesTopLeft(){
var enemy = createSprite(random(-1,-1440),random(-1,-640),random(20,40),random(20,40));

enemy.velocityY = 10;
enemy.velocityX = 10;
enemy.lifetime= 300;
enemy.rotationSpeed = random(10,30);
enemyGroup.add(enemy);
randomiser = round(random(1,5));
switch(randomiser){
  case 1:
    enemy.addImage(hw);
    enemy.scale = 0.1;
    break;
    case 2:
      enemy.addImage(spike1);
      enemy.scale = 0.3;
      break;
      case 3:
        enemy.addImage(spike3);
        enemy.scale = 0.2;
        break;
        case 4:
          enemy.addImage(spike4);
          enemy.scale = random(0.03,0.1);
          break;
          case 5:
            enemy.addImage(virus);
            enemy.scale = random(0.07,0.2);
            break;
            case 6:
             enemy.addImage(tyre);
             enemy.scale = random(0.1,0.2);
             break;
}

}
function spawnEnemiesLeft(){
  var enemy = createSprite(0,random(0,700),random(20,40),random(20,40));

  enemy.velocityX = 10;
  enemy.lifetime= 150;
  enemy.rotationSpeed = random(10,30);
  enemyGroup.add(enemy);
  randomiser = round(random(1,6.49));
switch(randomiser){
  case 1:
    enemy.addImage(hw);
    enemy.scale = 0.1;
    break;
    case 2:
      enemy.addImage(spike1);
      enemy.scale = 0.3;
      break;
      case 3:
        enemy.addImage(spike3);
        enemy.scale = 0.2;
        break;
        case 4:
        enemy.addImage(spike4);
          enemy.scale = random(0.1,0.2);
          break;
          case 5:
            enemy.addImage(virus);
            enemy.scale = random(0.07,0.2);
            break;
            case 6:
              enemy.addImage(tyre);
              enemy.scale = random(0.1,0.2);
              break;
  }}
  function spawnEnemiesBottomLeft(){
    var enemy = createSprite(random(0,-1400),random(700,1200),random(20,40),random(20,40));
    
    enemy.velocityY = -10;
    enemy.velocityX = 10;
    enemy.lifetime= 300;
    enemy.rotationSpeed = random(10,30);
    enemyGroup.add(enemy);
    randomiser = round(random(1,6.49));
    switch(randomiser){
      case 1:
        enemy.addImage(hw);
        enemy.scale = 0.1;
        break;
        case 2:
          enemy.addImage(spike1);
          enemy.scale = 0.3;
          break;
          case 3:
            enemy.addImage(spike3);
            enemy.scale = 0.2;
            break;
            case 4:
              enemy.addImage(spike4);
              enemy.scale = random(0.03,0.1);
              break;
              case 5:
                enemy.addImage(virus);
                enemy.scale = random(0.07,0.2);
                break;
                case 6:
                 enemy.addImage(tyre);
                 enemy.scale = random(0.1,0.2);
                 break;
}
}
  function spawnEnemiesBottom(){
    var enemy = createSprite(random(0,1500),700,random(20,40),random(20,40));
    
    enemy.velocityY = -10;
    enemy.lifetime= 100;
    enemy.rotationSpeed = random(10,30);
    enemyGroup.add(enemy);
    randomiser = round(random(1,6.49));
switch(randomiser){
  case 1:
    enemy.addImage(hw);
    enemy.scale = 0.1;
    break;
    case 2:
      enemy.addImage(spike1);
      enemy.scale = 0.3;
      break;
      case 3:
        enemy.addImage(spike3);
        enemy.scale = 0.2;
        break;
        case 4:
        enemy.addImage(spike4);
          enemy.scale = random(0.03,0.1);
          break;
          case 5:
            enemy.addImage(virus);
            enemy.scale = random(0.07,0.2);
            break;
            case 6:
              enemy.addImage(tyre);
              enemy.scale = random(0.1,0.2);
              break;
    }
  }
    function spawnEnemiesRight(){
      var enemy = createSprite(1500,random(0,700),random(20,40),random(20,40));
      
      enemy.velocityX = -10;
      enemy.lifetime= 150;
      enemy.rotationSpeed = random(10,30);
      enemyGroup.add(enemy);
      randomiser = round(random(1,4));
switch(randomiser){
  case 1:
    enemy.addImage(hw);
    enemy.scale = 0.1;
    break;
    case 2:
      enemy.addImage(spike1);
      enemy.scale = 0.3;
      break;
      case 3:
        case 3:
        enemy.addImage(spike3);
        enemy.scale = 0.2;
        break;
        case 4:
        enemy.addImage(spike4);
          enemy.scale = random(0.03,0.1);
          break;
          case 5:
            enemy.addImage(virus);
            enemy.scale = random(0.07,0.2);
            break;
            case 6:
              enemy.addImage(tyre);
              enemy.scale = random(0.1,0.2);
              break;
}
      }

function spawnBullets(){

var bullet  = createSprite(player.x,player.y,10,30);

bullet.setSpeedAndDirection(15,player.getDirection());

bullet.rotationSpeed = random(-30,30);

bullet.addImage(bulletImg);
bullet.scale = 0.1;
bullet.lifetime = 120

bulletGroup.add(bullet);
} 

function reset(){
  score = 0;
  enemyKillCount = 0;
  money = 1;
  timer = 0;
  x = 0;
  lives =20; 
  player.x = 750;
  player.y = 350;
  enemyGroup.destroyEach();
  bulletGroup.destroyEach();
  gameover.visible = false;
  gameState ="play";
}
