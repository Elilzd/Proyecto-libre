var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameOverImg, gameOver;
var PLAY = 1;
var END = 0;
var gameState = 1;


function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
  gameOverImg = loadImage("gameOver.png");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 5;

  ghost = createSprite(300,500,10,20);
  ghost.addImage(ghostImg);
  ghost.scale = 0.3;
  ghost.debug = true;
  ghost.setCollider("rectangle",0,0,10,20);

  doorsGroup = new Group();
  climbersGroup = new Group();
  
}

function draw() {
  background(200);
  if(gameState == PLAY){
    
  if(frameCount % 100 == 0 ){
    tower.velocityY  = tower.velocityY + 3;
  }

  

    if(tower.y > 600){
      tower.y = 0;
    }

    if(keyDown("right_arrow")){
      ghost.x = ghost.x + 6;
    }

    if(keyDown("left_arrow")){
      ghost.x = ghost.x - 6;
    }

    if(climbersGroup.isTouching(ghost)){
      ghost.velocityY = 0;
      gameState = END
    }
  } else if(gameState == END){
    gameOver = createSprite(250,300);
    gameOver.addImage("gameOver", gameOverImg);
    climbersGroup.destroyEach();
    doorsGroup.destroyEach();
    tower.velocityY = 0;
    
    if(keyDown("right_arrow")){
      ghost.x = ghost.x + 0;
    }

    if(keyDown("left_arrow")){
      ghost.x = ghost.x - 0;
    }


  
  }
 


 
    spawDoors();
  
    drawSprites();
}
 
  


function spawDoors(){
  if(frameCount % 50 == 0){
    door = createSprite(200,-50,20,50);
    door.addImage(doorImg);
    door.x = Math.round(random(140,500));
    door.velocityY = tower.velocityY;
    door.lifetime = 300;
    doorsGroup.add(door);
    door.depth = ghost.depth - 1;

    climber = createSprite(200,10,20,25);
    climber.addImage(climberImg);
    climber.x = door.x;
    climber.velocityY = tower.velocityY;
    climber.lifetime = 300;
    climbersGroup.add(climber);
    climber.depth = ghost.depth - 1;


    if(frameCount % 100 == 0){
      tower.velocityY = tower.velocityY + 3;
    }
    
  }

}



