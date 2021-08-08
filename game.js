class Game{
  constructor(){
  }
    
  getState(){
      var gameStateRef = database.ref("gameState");
     gameStateRef.on ("value" , function(data){
     gameState = data.val();
     })
    }
      
  update(state){
     database.ref('/').update({
     gameState: state
     });
  } 
    
    async start(){
      if(gameState === 0){
        player = new Player();
        var playerCountRef = await database.ref('playerCount').once("value");
        if(playerCountRef.exists()){
          playerCount = playerCountRef.val();
          player.getCount();
        }
        form = new Form()
        form.display();
      }
      runner1 = createSprite(100,200);
      runner1.addAnimation("runner1",player1Stand);
      runner2 = createSprite(300,200);
      //runner2.addAnimation("car2",car2_img);
      runner3 = createSprite(500,200);
      //runner3.addAnimation("car3",car3_img);
      runner4 = createSprite(700,200);
      //runner4.addAnimation("car4",car4_img);
      runners = [runner1, runner2, runner3, runner4];
    }

    play(){
      form.hide();
      
      Player.getPlayerInfo();
      
      if(allPlayers !== undefined){
        background(rgb(198,135,103));
        //image(bgImage, 0,-displayHeight*4,displayWidth*5, displayHeight);
        
        //var display_position = 100;
        
        //index of the array
        var index = 0;
  
        //x and y position of the cars
        var x = 175 ;
        var y;
  
        for(var plr in allPlayers){
          //add 1 to the index for every loop
          index = index + 1 ;
  
          //position the cars a little away from each other in x direction
          y = y + 200;
          //use data form the database to display the cars in y direction
          x = displaywidth - allPlayers[plr].distance;
          runners[index-1].x = x;
          runners[index-1].y = y;
         // console.log(index, player.index)
  
         
          if (index === player.index){
            stroke(10);
            fill("red");
            ellipse(x,y,60,60);
            runners[index - 1].shapeColor = "red";
            camera.position.x = displayWidth/2;
            camera.position.y = runners[index-1].y;
          }
         
          //textSize(15);
          //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
        }
  
      }
  
      if(keyIsDown("D") && player.index !== null){
        player.distance +=10
        player.update();
      }
  
      if(player.distance > 3860){
        gameState = 2;
      }
     
      drawSprites();
    }
  
    end(){
      console.log("Game Ended");
    }
  
}