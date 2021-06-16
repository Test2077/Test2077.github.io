
var TYPES = [
	"BARRIER",
	"COIN",
	"OPEN",
	"BONUS",
	"GHOST",
	"PACMAN"
];

var GHOST_SPEED = 0.15; 
var GHOST_SPEED2 = 0.15;
var DIMENSIONS = 20;	
var PACMAN_SPEED = 0.2;

var canvasW = 500;
var canvasH = 535;
var SIZE = 25;	
var HALF_SIZE = SIZE / 2;
var THIRD_SIZE = SIZE / 3;
var QUARTER_SIZE = SIZE / 4;
var bag = 0;


var leftarrow = 37;  
var rightarrow = 39;  
var uparrow = 38;  
var downarrow = 40; 

var bonus = new Audio();
var coin = new Audio();
var death = new Audio();

bonus.src = "bonus.wav";
coin.src = "coin.wav";
death.src = "death.wav"

if (localStorage.x == 25){
  SIZE = 25;
  canvasW = 500;
  canvasH = 535;
  HALF_SIZE = SIZE / 2;
  THIRD_SIZE = SIZE / 3;
  QUARTER_SIZE = SIZE / 4;
}

if (localStorage.x == 30){
  SIZE = 30;
  canvasW = 600;
  canvasH = 635;
  HALF_SIZE = SIZE / 2;
  THIRD_SIZE = SIZE / 3;
  QUARTER_SIZE = SIZE / 4;
}

if (localStorage.x == 40){
  SIZE = 40;
  canvasW = 800;
  canvasH = 835;
  HALF_SIZE = SIZE / 2;
  THIRD_SIZE = SIZE / 3;
  QUARTER_SIZE = SIZE / 4;
}



function Tile(x, y, type, behavior) {

  this.x = x;
  this.y = y;
  this.type = type;

	this.destination = (-1, -1);
  this.moving = false;

  this.intact = true;

  this.speed = 0.15;
  // pacMan = this.type == "PACMAN";
 

  this.behavior = behavior; // GHOSTs only;	0 = agressive, 1 = nonchalant
}

/**
 *	handles movement, eating, and AI
 */
Tile.prototype.update = function() {

  if (!this.intact) // no need to update
    return;

  /* movement */
  if (this.moving) {

		console.log(this.x, this.y, "before lerp");
		console.log(this.destination.x, this.destination.y);

    this.x = lerp(this.x, this.destination.x, this.speed);
    this.y = lerp(this.y, this.destination.y, this.speed);

		console.log(this.x, this.y, "after lerp");

		var distanceX = Math.abs(this.x - this.destination.x);
		var distanceY = Math.abs(this.y - this.destination.y);

    if (distanceX < 0.1 && distanceY < 0.1) { // округлить до ближайшей позиции

      this.x = this.destination.x;
      this.y = this.destination.y;

      this.moving = false; // закончить движения
    }
  }

  /* eating */
  if (this.type == "PACMAN") { // only PACMAN may eat!

       this.speed = PACMAN_SPEED;
		// Tile to which Pac-man is moving
    var destinationTile = getTile(Math.floor(this.x), Math.floor(this.y));

    if (destinationTile.intact) {

      switch (destinationTile.type) {

        case "COIN":
          score++;
          sumScore++;	// worth 1 point
          destinationTile.intact = false;
          coin.play();
          break;

        case "BONUS":
          score += 10;
          sumScore +=10;	// worth 10 points
          destinationTile.intact = false;
          
             
          let timerId = setInterval(() => GHOST_SPEED = 0.05, 0);

          // остановить вывод через 3 секунд
          setTimeout(() => { clearInterval(timerId); GHOST_SPEED = GHOST_SPEED2; }, 3000);   
          break;
      }
    }
        endScore / 2;
      if (score == endScore) // check if Pac-man has won
        endGame(true);
        
     

  } else if (this.type == "GHOST") {
    /* GHOST AI */
     this.speed = GHOST_SPEED; 
		var distance = dist(pacman.x, pacman.y, this.x, this.y);

    if (distance < 0.3){
        life--;
        endGame(false);

        death.play();
    }
    
     

		/* movement */
    if (this.moving) 
      return;

		/* relative possible movements */
    var possibleMoves = [

      getTile(this.x - 1, this.y),	// left
      getTile(this.x + 1, this.y),	// right
      getTile(this.x, this.y - 1),	// top
      getTile(this.x, this.y + 1),	// bottom
    ];

    /* sort by distance from Pac-man */
    possibleMoves.sort(function (a, b) {

      var aD = dist(a.x, a.y, pacman.x, pacman.y);
      var bD = dist(b.x, b.y, pacman.x, pacman.y);

      return aD - bD;
    });

    if (this.behavior === 0) {	// if they're agressive

      for (var i = 0; i < possibleMoves.length; i++) {

        if (this.move(possibleMoves[i].x, possibleMoves[i].y, false)) { // attempt to move
           break;
         }
      }
    } else {
			// move nonchalantly
      var index = Math.floor(random(4));
      this.move(possibleMoves[index].x, possibleMoves[index].y, false);
    }

  }
};

Tile.prototype.draw = function() {

  switch (this.type) {

    case "BARRIER":

      strokeWeight(5);
      stroke(0);
      fill("#0000FF");
      rect(this.x * SIZE, this.y * SIZE, SIZE, SIZE);
      break;

    case "COIN":

      ellipseMode(CORNER); //меняет место проресовки
      noStroke();
      fill("#FFFF33");
      ellipse(this.x * SIZE + THIRD_SIZE, this.y * SIZE + THIRD_SIZE, THIRD_SIZE);
      break;

    case "BONUS":

      ellipseMode(CORNER);
      stroke(253);
      strokeWeight(2);
      fill("#FF2222");
      ellipse(this.x * SIZE + QUARTER_SIZE, this.y * SIZE + QUARTER_SIZE, HALF_SIZE);
      break;

    case "GHOST":

      fill("#FF00EE");
      stroke(0);
      strokeWeight(1);

			/* draw a triangle */
      beginShape();
      vertex(this.x * SIZE + HALF_SIZE, this.y * SIZE + QUARTER_SIZE);
      vertex(this.x * SIZE + QUARTER_SIZE, this.y * SIZE + (QUARTER_SIZE * 3));
      vertex(this.x * SIZE + (QUARTER_SIZE * 3), this.y * SIZE + (QUARTER_SIZE * 3));
      endShape(CLOSE);
      break;

    case "PACMAN":

      ellipseMode(CORNER);
      stroke("#fff");
      strokeWeight(5);
      fill("#fff");
      ellipse(this.x * SIZE + QUARTER_SIZE, this.y * SIZE + QUARTER_SIZE, HALF_SIZE);
      break;

  }

};


Tile.prototype.move = function(x, y, relative) {

  var destinationX, destinationY;

  if (relative) { // relative to the tile

    destinationX = this.x + x;
    destinationY = this.y + y;
  } else {

    destinationX = x;
    destinationY = y;
  }

  if (this.moving) // no need to recalculate everything
    return false;

  var destinationTile = getTile(destinationX, destinationY);

  var type = destinationTile.type;

  if ((type == "BARRIER" && this.type != "BARRIER") || 	// only certain tiles may
      (type == "GHOST" && this.type == "GHOST")) 				// move to other certain tiles
    return false;

  this.moving = true; // begin movement next update
	this.destination = createVector(destinationX, destinationY);

  return true;
};

/**
 * возвращает плитку с координатами
 */
function getTile(x, y) {

  return field[y * DIMENSIONS + x];
}


$('.first').click(function() {
  function storeColor(aBtn) {
    var originalColor = $(aBtn).data("originalcolor");
    if (!originalColor) {
      originalColor = window.getComputedStyle(aBtn).backgroundColor;
      $(aBtn).data("originalcolor", originalColor);
    }
    return originalColor;
  }
  function resetColor(aBtn) {
    var originalColor = storeColor(aBtn);
    $(aBtn).css('background-color', originalColor);
  }
  function setColor(aBtn) {
    storeColor(aBtn);
    var newColor = $(aBtn).data("backcolor");
    $(aBtn).css('background-color', newColor);
  }

  $(".first button").each(function(){
    resetColor(this);
  });
  setColor($(this).find("button")[0]);
});
