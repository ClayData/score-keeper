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
	"url": "https://api-basketball.p.rapidapi.com/games?league=12&season=2019-2020&date=" + y + "-"+ m + "-" + d + "&timezone=America/Menominee",
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "api-basketball.p.rapidapi.com",
		"x-rapidapi-key": "caaa1aa51cmsh34aeffc6045e01dp1cb5e9jsnff5f9d0222cc"
	}
}

$.ajax(settings).then(function (response) {
    $("#scores").empty();
	var results = response.response;
	console.log(results)
	for(var i = 0; i < results.length; i++){
		//Home scores and teams
		var homeBox = $("<ul>").attr("class", "list-group");
		var homeTeam = $("<li>").attr("class", "list-group-item");
		//get home team name and remove quotes from string
		var homeText = JSON.stringify(results[i].teams.home.name);
		var cleanHomeText = homeText.replace(/['"]/g, '')
		homeTeam.text(cleanHomeText);

		var homeScore = $("<li>").attr("class", "list-group-item");
		var homeScoreText = JSON.stringify(results[i].scores.home.total)
		if(homeScoreText != "null"){
			homeScore.text(homeScoreText)
		}
		else{
			homeScore.text("0")
		}
		//Away scores and teams
		var awayBox = $("<ul>").attr("class", "list-group");

		var awayTeam = $("<li>").attr("class", "list-group-item");
		var awayText = JSON.stringify(results[i].teams.away.name);
		var cleanAwayText = awayText.replace(/['"]/g, '')
		awayTeam.text(cleanAwayText);


		var awayScore = $("<li>").attr("class", "list-group-item");
		var awayScoreText = JSON.stringify(results[i].scores.away.total)
		if(awayScoreText != "null"){
			awayScore.text(awayScoreText);
		}
		else{
			awayScore.text("0");
		}
		awayBox.append(awayTeam, awayScore);
		homeBox.append(homeTeam, homeScore, awayBox);
		$("#scores").append(homeBox);
	}
});

	scoreUpdater(y, m, d);
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


