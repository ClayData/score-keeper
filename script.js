
m = moment().format('YYYY-MM-DD')

function displayNbaScores(){

var settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://api-basketball.p.rapidapi.com/games?league=12&season=2019-2020&date=" + m + "&timezone=America/Menominee",
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "api-basketball.p.rapidapi.com",
		"x-rapidapi-key": "caaa1aa51cmsh34aeffc6045e01dp1cb5e9jsnff5f9d0222cc"
	}
}




$.ajax(settings).then(function (response) {
    console.log(response);
    console.log(response.response[1])
    var homeScore = $("<div>").text(JSON.stringify(response.response[1].scores.home.total))
    $("body").append(homeScore);
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


displayNbaScores();

