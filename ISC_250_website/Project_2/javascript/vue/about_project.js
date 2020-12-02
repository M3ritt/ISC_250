new Vue({
	el: '#controls',
	data: {
		object: {
			A: 'left',
			D: 'right',
			W: 'hard drop',
			Enter: 'rotate',
			Space: 'hold'
		}
	}
})

new Vue({
	el: '#game_process',
	data: {
		object: {
			Zero: "Load webpage.",
			First: "A 10 x 20 board is created along with the different types of Tetrominoes (Pieces).",
			Second: "A random piece is then generated to spawn at the top middle of the board and slowly fall.",
			Third: "If the Piece hits a wall or another Piece that has already fallen: That Piece is then locked into place and three scenarios can happen:",
			Fourth: "Step 3 is repeated until game over."
		}
	}
})

new Vue({
	el: '#improvements',
	data: {
		loop_data: [
			{text: " For the Piece that is being held, it could be shown in some sort of way. Currently relies on the player to remember what Piece is being held."},
			{text: " Upcoming Pieces could also be shown instead of being generated when needed."},
			{text: " Better system to either prevent spamming moves; one can currently just go left and right forever and not move down if I removed keys pressed counter."}
		],
	},
});

new Vue({
	el: '#random_spawn',
	data: {
		loop_data: [
			{text: "Each Piece can be moved to the right, left, down or rotated."},
			{text: "As each piece is moved in any of the previously stated directions, it is undrawn from the previous and then redrawn after the move."}
		],
	},
});

new Vue({
	el: '#falling_piece',
	data: {
		loop_data: [
			{text: "The Piece could go past the top row and result in game over."},
			{text: "The Piece can fill up a row and the row must be cleared and all above rows must be moved downward. In this case, the score must be changed."},
			{text: "The Piece can be locked into position without clearing a line."}
		],
	},
});