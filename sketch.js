var PLAY=1
var END=0

var gameState=PLAY
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var ground
var survivingTime=0

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
createCanvas(600,400)
monkey=createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running)
  monkey.scale=0.1
  ground=createSprite(300,360,600,10)
  obstacleGroup=createGroup();
  foodGroup=createGroup();
   
}


function draw() {
 background("lightBlue")
  stroke("white")
  textSize(20)
  fill("white")
  text("Surviving Time:"+survivingTime,400,50)
  
  stroke  ("black")
  textSize(20)
  fill("black")
  
  
  if (gameState==PLAY) {
    survivingTime=Math.ceil(frameCount/frameRate())
    obstacles();
  Banana();
  monkey.collide(ground)
 
  ground.velocityX=-3
  
  if(keyDown("space") && monkey.y>200) {
    monkey.velocityY=-30
  }
   monkey.velocityY=monkey.velocityY+3
  
  if(ground.x<300) {
    ground.x=ground.width/2
  }
  if(obstacleGroup.isTouching(monkey)){
    gameState=END
  }
  }
  else if(gameState==END){
    ground.velocityX=0
    monkey.velocityY=0
    
    obstacleGroup.setLifetimeEach(-1)
    foodGroup.setLifetimeEach(-1)
    obstacleGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0);
  }
  
  
  
  drawSprites();
}
function obstacles() {
  if(frameCount % 300==0){
  obstacle=createSprite(590,330,20,20)
    
    obstacle.addImage("obstacleImage",obstacleImage)
    obstacle.velocityX=-5
    obstacle.scale=0.15
    obstacle.lifetime=300;
    obstacleGroup.add(obstacle)
  }
}
  function Banana() {
    if(frameCount%80==0){
      banana=createSprite(590,180,20,20);
      banana.addImage("bananaImage",bananaImage)
      banana.velocityX=-5
      banana.scale=0.1
      banana.lifetime=300;
      foodGroup.add(banana)
    }
  }





