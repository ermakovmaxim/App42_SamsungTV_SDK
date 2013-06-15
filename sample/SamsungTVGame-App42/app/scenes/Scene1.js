alert('SceneScene1.js loaded');
function SceneScene1() {

};

var gameLoad = true;
var gameStart = false;
function showPopup(){
	if(!gameLoad){
	$('#svecPopup_5i7pfjojxn3bd').sfPopup({
		text:'Save Score </br> Your Score '+game.score+'',
		buttons:['OK','EXIT'],
		timeout:1000000,
		callback:function(id){
			if(id==0){
				var userName = $('#userName').sfTextInput('getText');
				saveScore(userName,game.score);
			}
		}
}).sfPopup('show');
		
	}
}

var canvas;
var context;
var game, snake, food, inverseDirection;
SceneScene1.prototype.initialize = function() {
	alert("SceneScene1.initialize()");
	// scene HTML and CSS will be loaded before this function is called
	startNewGame();
	$('#userName').sfTextInput({
		text:'',
		maxlength:10
	});
	$('#userName').sfTextInput('focus');
	$('#svecLabel_5i7pg0sgygqks').sfLabel({
		text:'Your Name:'
	});
	
	$('#viewScore').sfButton({
		text:'Refresh'
	});
	
	$('#xLable').sfLabel({
		text:'Name'
	});
	$('#sLable').sfLabel({
		text:'Score'
	});
	getAllTopScore();
};

function startNewGame(){
	canvas = document.createElement('canvas');

	canvas.id = "the-game";
	canvas.width = 600;
	canvas.height = 480;
	canvas.style.marginLeft = '100px';
	canvas.style.marginTop= '45px';
	canvas.style.position = "absolute";
	canvas.style.border = "1px solid #ffffff";
	var body = document.getElementsByTagName("body")[0];
	body.appendChild(canvas);
	context = canvas.getContext("2d");
	game = {

			score : 0,
			fps : 8,
			over : false,
			message : null,

			start : function() {
				gameStart = true;
				game.over = false;
				game.message = null;
				game.score = 0;
				game.fps = 8;
				snake.init();
				food.set();
			},

			stop : function() {
				gameStart = false;
				game.over = true;
				game.message = 'GAME OVER - PRESS ENTER';
				showPopup();
				gameLoad = false;
			},

			drawBox : function(x, y, size, color) {
				context.fillStyle = color;
				context.beginPath();
				context.moveTo(x - (size / 2), y - (size / 2));
				context.lineTo(x + (size / 2), y - (size / 2));
				context.lineTo(x + (size / 2), y + (size / 2));
				context.lineTo(x - (size / 2), y + (size / 2));
				context.closePath();
				context.fill();
			},

			drawScore : function() {
				context.fillStyle = '#999';
				context.font = (canvas.height) + 'px Impact, sans-serif';
				context.textAlign = 'center';
				context.fillText(game.score, canvas.width / 2, canvas.height * 0.9);
			},

			drawMessage : function() {
				if (game.message !== null) {
					context.fillStyle = '#00F';
					context.strokeStyle = '#FFF';
					context.font = (canvas.height / 10) + 'px Impact';
					context.textAlign = 'center';
					context.fillText(game.message, canvas.width / 2, canvas.height / 2);
					context.strokeText(game.message, canvas.width / 2,
							canvas.height / 2);
				}
			},

			resetCanvas : function() {
				context.clearRect(0, 0, canvas.width, canvas.height);
			}

		};

		snake = {

			size : canvas.width / 40,
			x : null,
			y : null,
			color : '#0F0',
			direction : 'left',
			sections : [],

			init : function() {
				snake.sections = [];
				snake.direction = 'left';
				snake.x = canvas.width / 2 + snake.size / 2;
				snake.y = canvas.height / 2 + snake.size / 2;
				for ( var i = snake.x + (5 * snake.size); i >= snake.x; i -= snake.size) {
					snake.sections.push(i + ',' + snake.y);
				}
			},

			move : function() {
				switch (snake.direction) {
				case 'up':
					snake.y -= snake.size;
					break;
				case 'down':
					snake.y += snake.size;
					break;
				case 'left':
					snake.x -= snake.size;
					break;
				case 'right':
					snake.x += snake.size;
					break;
				}
				snake.checkCollision();
				snake.checkGrowth();
				snake.sections.push(snake.x + ',' + snake.y);
			},

			draw : function() {
				for ( var i = 0; i < snake.sections.length; i++) {
					snake.drawSection(snake.sections[i].split(','));
				}
			},

			drawSection : function(section) {
				game.drawBox(parseInt(section[0]), parseInt(section[1]), snake.size,
						snake.color);
			},

			checkCollision : function() {
				if (snake.isCollision(snake.x, snake.y) === true) {
					game.stop();
				}
			},

			isCollision : function(x, y) {
				if (x < snake.size / 2 || x > canvas.width || y < snake.size / 2
						|| y > canvas.height
						|| snake.sections.indexOf(x + ',' + y) >= 0) {
					return true;
				}
			},

			checkGrowth : function() {
				if (snake.x == food.x && snake.y == food.y) {
					game.score++;
					if (game.score % 5 == 0 && game.fps < 60) {
						game.fps++;
					}
					food.set();
				} else {
					snake.sections.shift();
				}
			}

		};

		food = {

			size : null,
			x : null,
			y : null,
			color : '#0FF',

			set : function() {
				food.size = snake.size;
				food.x = (Math.ceil(Math.random() * 10) * snake.size * 4) - snake.size
						/ 2;
				food.y = (Math.ceil(Math.random() * 10) * snake.size * 3) - snake.size
						/ 2;
			},

			draw : function() {
				game.drawBox(food.x, food.y, food.size, food.color);
			}

		};

		 
	
	
	loop();
	
	function loop() {
		if (game.over == false) {
			game.resetCanvas();
			game.drawScore();
			snake.move();
			food.draw();
			snake.draw();
			game.drawMessage();
		}
		setTimeout(function() {
			loop();
		}, 1000 / game.fps);
	}
}

SceneScene1.prototype.handleShow = function(data) {
	alert("SceneScene1.handleShow()");
	// this function will be called when the scene manager show this scene
};

SceneScene1.prototype.handleHide = function() {
	alert("SceneScene1.handleHide()");
	// this function will be called when the scene manager hide this scene
};

SceneScene1.prototype.handleFocus = function(id) {
	// this function will be called when the scene manager focus this scene
};

SceneScene1.prototype.handleBlur = function() {
	alert("SceneScene1.handleBlur()");
	// this function will be called when the scene manager move focus to another
	// scene from this scene
};



inverseDirection = {
		'up' : 'down',
		'left' : 'right',
		'right' : 'left',
		'down' : 'up'
	};

	var keys = {
		up : [ sf.key.UP ],
		down : [ sf.key.DOWN ],
		left : [ sf.key.LEFT ],
		right : [ sf.key.RIGHT ],
		start_game : [ sf.key.ENTER ]
	};

	function getKey(value) {
		for ( var key in keys) {
			if (keys[key] instanceof Array && keys[key].indexOf(value) >= 0) {
				return key;
			}
		}
		return null;
	}

SceneScene1.prototype.handleKeyDown = function(keyCode) {
	alert("SceneScene1.handleKeyDown(" + keyCode + ")");
	var lastKey = getKey(keyCode);
	if ([ 'up', 'down', 'left', 'right' ].indexOf(lastKey) >= 0
			&& lastKey != inverseDirection[snake.direction]) {
		snake.direction = lastKey;
	} else if ([ 'start_game' ].indexOf(lastKey) >= 0 && game.over) {
		if($('#userName').sfTextInput('getText')==""){
			$('#svecPopup_5i7pfkslt8wce').sfPopup({
				text:'Please enter your name.',
				buttons:['OK'],
				callback:function(rlt){
				}
			}).sfPopup('show');
		}else if ($('#viewScore').hasClass('active')){
			getAllTopScore();
		}else{
			game.start();
		}
		
	}

	switch (keyCode) {
	case sf.key.LEFT:
		$('#viewScore').sfButton('blur');
		$('#viewScore').removeClass('active');
		$('#xList').removeClass('active');
		$('#xList').sfList('blur');
		break;
	case sf.key.RIGHT:
		$('#xList').removeClass('active');
		$('#xList').sfList('blur');
		break;
	case sf.key.UP:
		if(!gameStart && !$('#xList').hasClass('active')){
			$('#userName').sfTextInput('focus');
			$('#viewScore').sfButton('blur');
			$('#viewScore').removeClass('active');
		}else{
			$('#xList').sfList('prev');
		}
		break;
	case sf.key.DOWN:
		if(!gameStart && !$('#xList').hasClass('active')){
		$('#userName').sfTextInput('blur');
		$('#viewScore').sfButton('focus');
		$('#viewScore').addClass('active');
		}else{
			$('#xList').sfList('next');
		}
		break;
	case sf.key.ENTER:
		break;
	default:
		break;
	}
};