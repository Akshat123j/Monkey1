var monkey , monkey_running,ground,invisibleGround;
var banana ,bananaImage, obstacle, obstacleImage
var bananaGroup, obstacleGroup
var score,food;
var live=3;
var PLAY=0;
var END=1;
var gameState=PLAY;

function preload(){
 monkey_running =  loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
}

function setup() {
  createCanvas(600,310);
  monkey=createSprite(150,230,200,200);
  monkey.addAnimation("running",monkey_running);
  monkey.scale=0.2;

  ground=createSprite(300,300,600,20);
  
  bananaGroup=createGroup();
  obstacleGroup=createGroup();
  
  food=0;
  score=0;
}

function draw() {
background(220);
  if(gameState===PLAY){
  if(keyDown("space")&&monkey.y>=200){
    monkey.velocityY=-15;
  }
  //giving gravity
  monkey.velocityY=monkey.velocityY+0.8;
  monkey.collide(ground);
   
  textSize(20)
  text("Food:"+food,20,20);
  text("score:"+score,500,20);
    text("lives:"+live,300,20);
  score=score+Math.round(frameCount/60)
  if(monkey.isTouching(bananaGroup)){
    bananaGroup.destroyEach();
    food++;
  }
  //displaying banana and obstacles
  spawningBanana();
  spawningObstacles();    
   drawSprites() ;
  }
 else if(gameState===END){
   textSize(30);
   text("gameover!",200,100);
   text("press space to start",200,150);
   score=0;
   food=0;
   live=3;
   obstacleGroup.destroyEach();
   bananaGroup.destroyEach();
 }
  if(keyDown("space")&&gameState===END){
    gameState=PLAY;
  }
   if(monkey.isTouching(obstacleGroup)){
    obstacleGroup.setVelocityEach(0);
    bananaGroup.setVelocityEach(0);
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    monkey.velocityY=0;
     obstacleGroup.destroyEach();
     bananaGroup.destroyEach();
    live--;
  }
  if(live<=0){
    gameState=END;
  }
}

function spawningBanana(){
  if(frameCount%200===0){
   var banana=createSprite(600,100,100,100);
    banana.addImage(bananaImage);
    banana.scale=0.1;
    banana.velocityX=-7;
    if(score%100===0){
      banana.velocityX++;
    }
    banana.lifetlime=200;
    bananaGroup.add(banana)
    banana.x=Math.round(random(300,600));
  }
}

function spawningObstacles(){
  if(frameCount%300===0){
  var obstacle=createSprite(600,280,20,20);
  obstacle.addImage(obstacleImage);
  obstacle.scale=0.1;
    obstacle.velocityX=-7;
    if(score%100===0){
      obstacle.velocityX--;
    }
    obstacleGroup.add(obstacle);
  }
}