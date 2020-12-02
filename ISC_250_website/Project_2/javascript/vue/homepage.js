/*
	Was having trouble getting a list of links to work properly:
		- It was going to new line for each link but putting a blank bullet inbetween each new line
	I did keep this in here just to show that I did attempt
*/
var app_loops = new Vue({
	el: '#app_loops',
	data: {
		todos: [
		{text: '<a href="homepage.html">Home</a> : The main homepage.',},
		{text: '<a href=" ./about_me.html">About me</a> : A page about my academics.',},
		{text: '<a href=" ./about_project.html">Description</a> :  A page describing the project.',},
		{text: '<a href=" ./Tetris.html">Tetris</a> : The working project.',},
		],
	},
});

var get_time = new Vue({
    el: '#get_time',
    data: {
        message: "Joshua Meritt's ISC 250 Website",
        timestamp: `Current time: ${new Date().toLocaleString()}`,
    },
});