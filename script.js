$(document).ready(function(){

$("#submit").on("click", function (){
	event.preventDefault()
	var yearInput = $("#exampleFormControlSelect1").val();
	var monthInput = $("#month-input").val();
	var dayInput = $("#day-input").val(); 
	console.log(yearInput)
	displayNbaScores(yearInput, monthInput, dayInput);
})


function displayNbaScores(y, m, d){

	

	var settings = {
		"async": true,
		"crossDomain": true,
		"url": "https://api-nba-v1.p.rapidapi.com/games/date/" + y + "-" + m + "-" + d ,
		"method": "GET",
		"headers": {
			"x-rapidapi-host": "api-nba-v1.p.rapidapi.com",
			"x-rapidapi-key": "caaa1aa51cmsh34aeffc6045e01dp1cb5e9jsnff5f9d0222cc"
		}
	}
	
	$.ajax(settings).done(function (response) {
		console.log(response);
		var results = response.api.games;
		var gameIdArr = []; 
	$("#line-1").empty();
	$("#line-2").empty();
	
	console.log(results)
	
	for(var i = 0; i < results.length; i++){
		//create gameid array
		gameIdArr.push(results[i].gameId);
		//Home scores and teams
		var homeBox = $("<div>").attr("class", "list-group box-score");
		var homeTeam = $("<button>").attr({"class": "list-group-item list-group-item-action",
										   "type": "button",
										   "data-toggle": "modal",
										   "data-target": "#myModal"});
		
		//get home team name and remove quotes from string
		var homeText = JSON.stringify(results[i].hTeam.fullName);
		var cleanHomeText = homeText.replace(/['"]/g, '')
		homeTeam.text(cleanHomeText);

		var homeScore = $("<button>").attr("class", "list-group-item");
		var homeScoreText = JSON.stringify(results[i].hTeam.score.points)
		var cleanHomeScore = homeScoreText.replace(/['"]/g, '');
		if(cleanHomeScore === ""){
			homeScore.text("0")
		}
		else{
			homeScore.text(cleanHomeScore);
		}
		//Away scores and teams
		var awayBox = $("<div>").attr("class", "list-group");
		awayBox.css({ "margin-bottom": "20px"});

		var awayTeam = $("<button>").attr({"class": "list-group-item list-group-item-action",
		"type": "button",
		"data-toggle": "modal",
		"data-target": "#myModal"});
		
		var awayText = JSON.stringify(results[i].vTeam.fullName);
		var cleanAwayText = awayText.replace(/['"]/g, '')
		awayTeam.text(cleanAwayText);


		var awayScore = $("<button>").attr("class", "list-group-item");
		var awayScoreText = JSON.stringify(results[i].vTeam.score.points)
		var cleanAwayScore = awayScoreText.replace(/['"]/g, '');
		
		if(cleanAwayScore ===  ""){
			awayScore.text("0");
		}
		else{
			awayScore.text(cleanAwayScore);
		}
		awayBox.append(awayTeam, awayScore);
		homeBox.append(homeTeam, homeScore, awayBox);

		if (i % 2 === 0){
			$("#line-1").append(homeBox);
		}
		else{
			$("#line-2").append(homeBox);
		}

		
		
	}
	console.log(gameIdArr);
});

	// scoreUpdater(y, m, d);
}

function teamStatsCall(){

}




function scoreUpdater(y, m, d) {
	var secondsLeft = 20;
	var timeInterval = setInterval(function() {
		secondsLeft--;

		if(secondsLeft === 0){
			displayNbaScores(y, m, d);
			clearInterval(timeInterval)
		}

	}, 1000) 
}

})


