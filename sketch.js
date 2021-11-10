var PLAY = 1;
var END = 0;
var gameState = PLAY;

var skybg, waterbg, shipimg, helicopterimg, bombimg;
var water, ship, helicopter, bomb;
var helicopterGroup, bombGroup;
var score = 0;
var gameOverImg;


function preload(){
  skybg = loadImage("skybg.jpg");
  waterbg = loadImage("waterbg.png");
  shipimg = loadImage("ship.png");
  helicopterimg = loadImage("helicopter.png");
  bombimg = loadImage("bomb.png");
  gameOverImg = loadImage("gameOver.png");
}

function setup() {
  createCanvas(800, 450);
  
  //creating water ground
  water = createSprite(400,325,800,300);
  water.addImage("water",waterbg);
  water.velocityX= -3;
    
  //creating ship
  ship = createSprite(400,300,30,100);
  ship.addImage("ship",shipimg);
  ship.scale = 0.4;
  
  //creating helicopter group
  helicopterGroup = new Group();

  //creating bomb group
  bombGroup = new Group();
    

  //ship.debug = "true";

}

function draw() {
  background(skybg);
  fill("yellow")
  textSize(15);
  text("SURVIVAL TIME: "+ score, 600,30);
  
    
  //gameState play
  if(gameState === PLAY){
    //increase score
    score = score + Math.round(frameCount/300);

    ship.x = mouseX;

    //Call user defined function
    spawnHelicopter();
    spawnBomb();
    
    if(bombGroup.isTouching(ship)){
        gameState = END;
    }
    
  }
  
  //gameState end
  else if(gameState === END){
    ship.addImage("ship",gameOverImg);
    ship.x = 400;
    ship.y = 225;
   //water velocity becomes zero
    water.setVelocity(0,0);
   //destroy Helicopter group
   helicopterGroup.destroyEach();
   //destroy bomb group
   bombGroup.destroyEach();
  
    
  }
  
 
 //for infinite background 
 if(water.x < 300){
    water.x = 400;
    }
    
  
  drawSprites();
}


function spawnHelicopter(){
  if(frameCount%200 === 0){
    helicopter = createSprite(800,80,200,50);
    helicopter.addImage("helicopter",helicopterimg);
    helicopter.setVelocity(-5,0);
    helicopter.scale = 0.5;
    helicopter.lifetime = 170;
    helicopterGroup.add(helicopter);
  }
}

function spawnBomb(){
 // create bombs at random position
 //use Math.random
  if(frameCount%200 === 0){
    bomb = createSprite(400,80,200,50);
    bomb.addImage("bomb",bombimg);
    bomb.setVelocity(0,4);
    bomb.x = Math.round(random(50,750));
    bomb.scale = 0.10;
    bomb.lifetime = 160;
    bombGroup.add(bomb);
  }
}




