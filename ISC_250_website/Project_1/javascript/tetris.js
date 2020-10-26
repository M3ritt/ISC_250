//constants of pulling from tetris element, being 2d, and calculating score
const cvs = document.getElementById("tetris");
const ctx = cvs.getContext("2d");
const scoreElement = document.getElementById("score");

//Global varaibles of row, column, size and color of an empty square
const ROW = 20;
const COL = COLUMN = 10;
const SQUARE_SIZE = 20;
const VACANT = "WHITE"; 

/*
	This method draws a singular square
	
	@param:
		x : the x-coordinate
		y : the y-coordinate
		color : the color the square should be
*/
function draw_square(x,y,color){
    ctx.fillStyle = color;
    ctx.fillRect(x*SQUARE_SIZE,y*SQUARE_SIZE,SQUARE_SIZE,SQUARE_SIZE);

    ctx.strokeStyle = "BLACK";
    ctx.strokeRect(x*SQUARE_SIZE,y*SQUARE_SIZE,SQUARE_SIZE,SQUARE_SIZE);
}

/*
	This instantiates the creation of the board based on global variable size
*/
let board = [];
for( r = 0; r <ROW; r++){
    board[r] = [];
    for(c = 0; c < COL; c++){
        board[r][c] = VACANT;
    }
}

/*
	This method draws in the square that were just instantiated
*/
function draw_board(){
    for(r = 0; r < ROW; r++){
        for(c = 0; c < COL; c++){
            draw_square(c,r,board[r][c]);
        }
    }
}
draw_board();

/*
	The pieces that are created in tetrominoes.js
*/
const PIECES = [
    [Z,"red"],
    [S,"green"],
    [T,"purple"],
    [O,"yellow"],
    [L,"orange"],
    [I,"cyan"],
    [J,"blue"]
];

/*
	Picks a random piece from the amount of different pieces in tetrominoes - 6 different possibilities
*/
function generate_random_piece(){
    let r = Math.floor(Math.random() * PIECES.length)
    return new Piece(PIECES[r][0],PIECES[r][1]);
}
let p = generate_random_piece();


/*	
	spam_count : Counter of moves so user cannot spam going side to side to stall out
	is_holding : boolean to check whether a Piece is being held already
*/
let spam_count = 0;

/*
	The piece object that is being spawned at the top. Setting color and shape/rotation
	
	Aside:  Piece is an object that will have multiple on a screen at a time so the 'helper methods' are prototypes to accomadate having multiple and calling functions for them
	
	@param:
		tetromino : the piece
		color : the color of the tetromino
*/
function Piece(tetromino, color){
    this.tetromino = tetromino;
    this.color = color;
    
    this.new_tetromino = 0; 
    this.active_tetromino = this.tetromino[this.new_tetromino];
    //top middle of the board
    this.x = 3;
    this.y = -2;
}

/*
	Helper method to fill in the color of the active spaces of the Tetromino
	
	@param: 
		color : the color of the tetromino
*/
Piece.prototype.fill = function(color){
    for( r = 0; r < this.active_tetromino.length; r++){
        for(c = 0; c < this.active_tetromino.length; c++){
            if(this.active_tetromino[r][c]){
                draw_square(this.x + c,this.y + r, color);
            }
        }
    }
}

/*
	Main method to fill in the color of the Piece
*/
Piece.prototype.draw = function(){
    this.fill(this.color);
}

/*
	Method to change color to clear instead of whatever it was before
*/
Piece.prototype.undraw = function(){
    this.fill(VACANT);
}

/*
	Method to move a Piece down
	 - starts with checking if the piece is going to colide with another Piece or a wall
		- if it colides, it locks the Piece and spawns a new piece
		- if no collision, undraws current position, moves the Piece down by one square and redraws
*/
Piece.prototype.move_down = function(){
    if(!this.collision(0,1,this.active_tetromino)){
        this.undraw();
		this.y++;
        this.draw();
    } else {
        this.lock();
        p = generate_random_piece();
    }
}

/*
	Method to 'hard drop'
	- This method moves the current Piece straight down to where any squares would collide with another Piece or square
*/
Piece.prototype.hard_drop = function(){
	this.undraw();
	for(p = this.y; p < ROW; p++){
		if(!this.collision(0,1,this.active_tetromino)){
			this.y++;
		}
	}
	this.draw();
    this.lock();
    p = generate_random_piece();
} 

/*
	Method to move a Piece to the right
	 - starts with checking if the piece is going to colide with another Piece or a wall
		- if it colides, it locks the Piece and spawns a new piece
		- if no collision, undraws current position, moves the Piece down by one square and redraws
*/
Piece.prototype.move_right = function(){
    if(!this.collision(1,0,this.active_tetromino)){
        this.undraw();
        this.x++;
        this.draw();
    }
}

/*
	Method to move a Piece to the left
	 - starts with checking if the piece is going to colide with another Piece or a wall
		- if it colides, it locks the Piece and spawns a new piece
		- if no collision, undraws current position, moves the Piece down by one square and redraws
*/
Piece.prototype.move_left = function(){
    if(!this.collision(-1,0,this.active_tetromino)){
        this.undraw();
        this.x--;
        this.draw();
    }
}

/*
	Method to rotate a Piece
	 - temporarily makes the next type of position of the Piece - shown in tetrominoes.js
	 - checks if the next position will collide with a wall or another piece
	 - if no collision:
		- undraws current position 
		- gets next position and activates those squares
*/
Piece.prototype.rotate = function(){
    let next_pattern = this.tetromino[(this.new_tetromino + 1)%this.tetromino.length];
    let kick = 0;
    
    if(this.collision(0,0,next_pattern)){
		//Right wall, move to the left
        if(this.x > COL/2){
            kick = -1; 
        }else{
            //Left wall, move to the right 
            kick = 1;
        }
    }
    
    if(!this.collision(kick,0,next_pattern)){
        this.undraw();
        this.x += kick;
        this.new_tetromino = (this.new_tetromino + 1)%this.tetromino.length;
        this.active_tetromino = this.tetromino[this.new_tetromino];
        this.draw();
    }
}

/*
	Method to hold a piece. No piece is being held at the start so starts off being VACANT. 
		- current Piece is stored and undrawn from the screen since it is gone. 
		- Either two options are possible; ehere is not a Piece being held or there is:
			- holding_piece is VACANT: generate a new Piece 
			- holding_piece is not VACANT: switch current Piece to what is being held 
		- Spawn new Piece at top of board
*/
let holding_piece = VACANT;
Piece.prototype.hold_piece = function(){
	let temp = holding_piece;
	holding_piece = p;
	p.undraw();
	if(temp == VACANT){
		p = generate_random_piece();
	} else {
		p = temp;
	}
	p.x = 3;
	p.y = -2;
	draw_board();
}

//global variables for score and fall speed
let score = 0;
let fall_speed = 500;

/*
	Method to lock a Piece
	 - checks the rows and columns of the current Piece 
		- if the current position is out of bounds, then game over
	- goes through the current row to see if every square is not vacant 
	- if row is full:
		- count is increased and row above is moved down
		- calculations for score is done, more points for tetris
		- fall_speed is increased the more points a user has
*/
Piece.prototype.lock = function(){
    for( r = 0; r < this.active_tetromino.length; r++){
        for(c = 0; c < this.active_tetromino.length; c++){
            if(!this.active_tetromino[r][c]){
                continue;
            }
            if(this.y + r < 0){
                alert("Game Over");
                is_game_over = true;
                break;
            }
            board[this.y+r][this.x+c] = this.color;
        }
    }
	count  = 0;
    for(r = 0; r < ROW; r++){	
        let is_row_full = true;
        for(c = 0; c < COL; c++){
            is_row_full = is_row_full && (board[r][c] != VACANT);
        }
        if(is_row_full){
			count++;
            for( y = r; y > 1; y--){
                for( c = 0; c < COL; c++){
                    board[y][c] = board[y-1][c];
                }
            }
            for( c = 0; c < COL; c++){
                board[0][c] = VACANT;
            }
			if(count == 4)
				score += 800;
			else 
				score += 100;
			if((score % 1000) == 0)
				fall_speed = fall_speed - 50;
        }
    }
	spam_count = 0;
    draw_board();
    
    scoreElement.innerHTML = score;
}

/*
	Method to check if there will be a collision 

	@param:
		x : the x coordinate
		y : the y coordinate
		piece : the current Piece
		
	@return:
		boolean : true if the Piece hits another Piece, false otherwise
*/
Piece.prototype.collision = function(x,y,piece){
    for( r = 0; r < piece.length; r++){
        for(c = 0; c < piece.length; c++){
            if(!piece[r][c]){
                continue;
            }
            let new_x = this.x + c + x;
            let new_y = this.y + r + y;
            
            if(new_x < 0 || new_x >= COL || new_y >= ROW){
                return true;
            }
            if(new_y < 0){
                continue;
            }
            if( board[new_y][new_x] != VACANT){
                return true;
            }
        }
    }
    return false;
}

/*
	EventListener : checks when key is pressed
	
	Method to read key pressed and make method call based on it
	
	keyCode 65 : 'A'
	keyCode 13 : 'Enter'
	keyCode 68 : 'D'
	keyCode 83 : 'S'
	keyCode 87 : 'W'
	keyCode 32 : 'Space'
*/
document.addEventListener("keydown",CONTROL);
function CONTROL(event){
	if(event.keyCode == 65 && spam_count < 15){
		spam_count++;
		p.move_left();
        drop_start_time = Date.now();
    }else if(event.keyCode == 13){
		p.rotate();
        drop_start_time = Date.now();
    }else if(event.keyCode == 68 && spam_count < 15){
		spam_count++;
		p.move_right();
        drop_start_time = Date.now();
    }else if(event.keyCode == 83){
        p.move_down();
	} else if(event.keyCode == 87){
		p.hard_drop();
    } else if (event.keyCode == 32){
		p.hold_piece();
	} 
}

/*
	Method to drop the Piece and checks if the game is over
*/
let drop_start_time = Date.now();
let is_game_over = false;
function drop(){
    let now = Date.now();
    let delta = now - drop_start_time;
    if(delta > fall_speed){
        p.move_down();
        drop_start_time = Date.now();
    }
    if( !is_game_over){
        requestAnimationFrame(drop);
    }
}

drop();
