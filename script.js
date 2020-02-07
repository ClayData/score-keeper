$(document).ready(function(){

$("#submit").on("click", function (){
	event.preventDefault()
	var yearInput = $("#year-input").val();
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
    console.log(response);
	var results = response.response;
	
	for(var i = 0; i < results.length; i++){
		//Home scores and teams
		var homeBox = $("<ul>").attr("class", "list-group");
		var homeTeam = $("<li>").attr("class", "list-group-item");
		//get home team name and remove quotes from string
		var homeText = JSON.stringify(results[i].teams.home.name);
		var cleanHomeText = homeText.replace(/['"]/g, '')
		homeTeam.text(cleanHomeText);

		var homeScore = $("<li>").attr("class", "list-group-item");
		homeScore.text(JSON.stringify(results[i].scores.home.total));
		//Away scores and teams
		var awayBox = $("<ul>").attr("class", "list-group");

		var awayTeam = $("<li>").attr("class", "list-group-item");
		var awayText = JSON.stringify(results[i].teams.away.name);
		var cleanAwayText = awayText.replace(/['"]/g, '')
		awayTeam.text(cleanAwayText);


		var awayScore = $("<li>").attr("class", "list-group-item");
		awayScore.text(JSON.stringify(results[i].scores.away.total));

		awayBox.append(awayTeam, awayScore);
		homeBox.append(homeTeam, homeScore, awayBox);
		$("#scores").append(homeBox);
	}
});
}







function scoreUpdater() {
	var secondsLeft = 20;
	var timeInterval = setInterval(function() {
		secondsLeft--;

		if(secondsLeft === 0){
			displayNbaScores();
			clearInterval(timeInterval)
		}

	}) 
}

})


