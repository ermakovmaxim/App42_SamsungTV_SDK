
/** Login/Register with AppHQ Management Console from https://apphq.shephertz.com/register/app42Login
 * 	Go to Business Service Manager from left tab, click on Game Service and select Game.
 * 	Create game with App42 by clicking on Add Game button from right tab in AppHQ.
 * 
 * */

// Put your game name here. Created from AppHQ Console.
var gameName = "SampleGame";

// Save user score when game stop.
function saveScore(userName, score) {
	new App42ScoreBoard().saveUserScore(gameName, userName, score, {
		success : function(object) {

		},
		error : function(error) {
			alert("Plase Create Atleast One Game With AppHQ Management Console.from ' https://apphq.shephertz.com/register/app42Login '");
			alert(error);
		}
	});
}

// Get top 10 scorer of game.
function getAllTopScore() {
	var userList = [];
	var scoreList = [];
	new App42ScoreBoard().getTopNRankings(gameName, 10, {
		success : function(object) {
			var gameObj = JSON.parse(object);
			alert(gameObj.app42.response.games.game.scores.score[0].userName);
			var xList = gameObj.app42.response.games.game.scores.score;
			for ( var i = 0; i < xList.length; i++) {
				userList.push(xList[i].userName);
				scoreList.push(xList[i].value);
			}
			$('#xList').sfList({
				data : userList
			});
			$('#sList').sfList({
				data : scoreList
			});
			$('#xList').sfList('focus');
			$('#xList').addClass('active');
		},
		error : function(error) {
			alert("Plase Create Atleast One Game With AppHQ Management Console.from ' https://apphq.shephertz.com/register/app42Login '");
			alert(error);
		}
	});

}