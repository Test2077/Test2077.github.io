
  var FIELD = [
  "0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0",
  "0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0",
  "0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,3,0,0,0",
  "0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0",
  "0,1,1,3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0",
  "0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0",
  "0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0",
  "0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0",
  "0,0,0,0,0,0,1,1,0,0,1,0,0,1,1,0,0,0,0,0",
  "0,1,1,1,1,1,1,1,1,4,1,4,1,1,1,1,1,1,1,0",
  "0,1,1,1,1,3,1,1,0,4,1,4,0,1,1,1,1,1,1,0",
  "0,0,0,0,0,0,1,1,0,1,0,0,0,1,1,0,0,0,0,0",
  "0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0",
  "0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0",
  "0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0",
  "0,1,1,1,1,1,1,1,1,1,5,1,1,1,1,1,1,1,1,0",
  "0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0",
  "0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0",
  "0,1,1,1,1,3,1,1,1,1,1,1,1,1,1,1,1,3,1,0",
  "0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0",
];


var field = [];
var ghosts = [];
SIZE = localStorage.x;
var pacman;
var score;
var sumScore = 0;
var endScore = 0;
var mod = 4;

function setup() {

  createCanvas(canvasW, canvasH); // создание фона
  
  score = 0;
  field = generateField(FIELD);
}


function setup1(x) {
  // noLoop();
  var ghosts = [];
  score = 0;
  field = generateField(x);
}

function keyPressed() {
        if (keyCode === 32) {
          document.getElementById('active23').classList.remove('_qactive');
          loop();
        } 
      }


function draw() {

  background("#333");

	drawHUD(); 

	
  for (var j = 0; j < ghosts.length; j++) {

    ghosts[j].update();
    ghosts[j].draw();
  }

	
	pacman.update();
	pacman.draw();

  handleInput(); 
}

//   if (localStorage.m == 2){
//   mod == 2;
// } 


function handleInput() {

  if (keyCode === uparrow) {

    pacman.move(0, -1, true);
  } else if (keyCode === downarrow) {

    pacman.move(0, 1, true);
  } else if (keyCode === leftarrow) {

    pacman.move(-1, 0, true);
  } else if (keyCode === rightarrow) {

    pacman.move(1, 0, true);
  }
}


function drawHUD() {


	for (var i = 0; i < field.length; i++) {

		if (field[i].intact) {

			if (field[i].type != "GHOST" && field[i].type != "PACMAN")
				field[i].draw();
		}
	}

	/* score */
	noStroke();
  fill(255);
  textSize(25);
  textAlign(LEFT);
  text(" ❤ x " + h1 + "               Уровень: " + live + "           Очки: " + sumScore, 10, height - 10);
}

var live = 1;

function endGame(won) {
  textSize(60);
  textAlign(CENTER);
  fill(255);
  stroke(0);
  strokeWeight(5);
  textSize(50);

  if (won) { 
      live ++;
      h1 = 3;
      GHOST_SPEED2 = 0.2;
      
    if (live == 2){
        
        GHOST_SPEED2 += 0.01;    
        setup();
        document.getElementsByClassName("name")[0].textContent = 'Вы прошли второй уровень! Перейте на следующий?';
      } else if (live == 3){
        
        GHOST_SPEED2 += 0.01;
        setup();
        document.getElementsByClassName("name")[0].textContent = 'Вы прошли второй уровень! Перейте на следующий?';
      }
        else if (live  == 4){
          GHOST_SPEED2 += 0.01;
          setup();
          document.getElementsByClassName("name")[0].textContent = 'Вы прошли третий уровень! Перейте на следующий?';
          // document.getElementsByClassName("name")[0].textContent = 'Вы победили!!! Начать занова нажмите f5';
          noLoop();
        }
        else if (live  == 5){
          GHOST_SPEED2 += 0.01;
          PACMAN_SPEED = 0.23;
          setup();
          document.getElementsByClassName("name")[0].textContent = 'Вы прошли четвертый уровень! Перейте на следующий?';
          // document.getElementsByClassName("name")[0].textContent = 'Вы победили!!! Начать занова нажмите f5';
          noLoop();
        }
        else if (live  == 6){
          GHOST_SPEED2 += 0.01;
          
          setup();
          document.getElementsByClassName("name")[0].textContent = 'Вы прошли пятый уровень! Перейте на следующий?';
          // document.getElementsByClassName("name")[0].textContent = 'Вы победили!!! Начать занова нажмите f5';
          
          noLoop();
        }
        else if (live  == 7){
          GHOST_SPEED2 += 0.01;
          PACMAN_SPEED = 0.26;
          setup();
          document.getElementsByClassName("name")[0].textContent = 'Вы прошли шестой уровень! Перейте на следующий?';
          // document.getElementsByClassName("name")[0].textContent = 'Вы победили!!! Начать занова нажмите f5';
          
          noLoop();
        }
        else if (live  == 8){
          GHOST_SPEED2 += 0.01;
          PACMAN_SPEED = 0.27;
          setup();
          document.getElementsByClassName("name")[0].textContent = 'Вы прошли седьмой уровень! Перейте на следующий?';
          // document.getElementsByClassName("name")[0].textContent = 'Вы победили!!! Начать занова нажмите f5';
          
          noLoop();
        }
        else if (live  == 9){
          GHOST_SPEED2 += 0.01;
          PACMAN_SPEED = 0.28;
          setup();
          document.getElementsByClassName("name")[0].textContent = 'Вы прошли восьмой уровень! Перейте на следующий?';
          // document.getElementsByClassName("name")[0].textContent = 'Вы победили!!! Начать занова нажмите f5';
          
          noLoop();
        }
        else if (live  == 10){
          GHOST_SPEED2 += 0.01;
          PACMAN_SPEED = 0.29;
          setup();
          document.getElementsByClassName("name")[0].textContent = 'Вы прошли 9 уровень! Перейте на следующий?';
          // document.getElementsByClassName("name")[0].textContent = 'Вы победили!!! Начать занова нажмите f5';
          
          noLoop();
        }
        else if (live  == 11){
          GHOST_SPEED2 += 0.01;
          PACMAN_SPEED = 0.3;
          setup();
          // document.getElementsByClassName("name")[0].textContent = '5Вы прошли второй уровень! Перейте на следующий?';
          document.getElementsByClassName("name")[0].textContent = 'Победа!!! Начать занова нажмите f5';
          document.getElementsByClassName("name_1")[0].textContent = "Вы набрали: " + sumScore + " очков";
          noLoop();

        }
      } 
   else {
        sumScore -= score;
      if (h1 > 0 ){
        setup();
          document.getElementsByClassName("name")[0].textContent = 'Попробывать снова?';
      } else {
         noLoop();
        document.getElementsByClassName("name")[0].textContent = "Поражения! Начать занова нажмите f5";
        document.getElementsByClassName("name_1")[0].textContent = "Вы набрали: " + sumScore + " очков";  
         
          function keyPressed() {
            if (keyCode === 32) {
            document.getElementById('active23').classList.remove('_qactive');
          noLoop();
        } 
      }

      }      
    }
    document.getElementById('active23').classList.add('_qactive');
        noLoop();
}

/**
 *	populates field and ghost arrays
 * initializes Pac-man
 * based upon FIELD constant
 */
function generateField(x) {

  var f = []; // returning array
   ghosts = [];

  var ghostId = 2; // handling behavior of ghost
  for (var i = 0; i < x.length; i++) { // loop through each string

    var row = x[i].split(",");
    for (var j = 0; j < row.length; j++) { // loop through numbers in string

      var type = TYPES[row[j]];
      var tile = new Tile(j, i, type, -1);

      switch (type) {

        case "PACMAN":
          pacman = tile;
          f.push(new Tile(j, i, "OPEN"));
          break;

            if (localStorage.m == 2){
            mod == 2;
          } 

        case "GHOST":
					var behavior = (ghostId % mod); // every other ghost will be agressive
          ghosts.push(new Tile(j, i, type, behavior));
          f.push(new Tile(j, i, "OPEN"));
          ghostId++;
          break;

        case "BARRIER":
          f.push(tile);
          break;

        case "BONUS":
          endScore += 10; // worth 10 points
          f.push(tile);
          break;

        case "COIN":
          endScore++; // worth 1 point
          f.push(tile);
          break;
      }

    }
  }

  return f;

}
