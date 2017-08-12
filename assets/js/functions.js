//variables that will be used to store certain game components
var wins = 0;
var losses = 0;
var numAttempts = 10;
var randomWord;
var guessedBank = [];
var letters = "abcdefghijklmnopqrstuvwxyz";
var words = ["Humphrey Bogart","Katharine Hepburn","Cary Grant","James Stewart",
			"Marlon Brando","Ingrid Bergman","Charlie Chaplin","John Wayne","Kirk Douglas",
			"Orson Welles","Rita Hayworth","Vivien Leigh","Grace Kelly","Carole Lombard",
			"William Holden","Gene Kelly","Lee J Cobb","Paul Newman","Burt Lancaster",
			"Faye Dunaway","Jack Nicholson","Irene Dunne","Gloria Swanson","Elizabeth Taylor",
			"James Cagney"];
var gameLetters=[];
var wordLetters=[];
var layout;
var audioElement = document.createElement("audio");

//set content of page
document.getElementById("numWins").textContent = "Wins: " + wins;
document.getElementById("numLosses").textContent = "Losses: " + losses;
document.getElementById("numAttempts").textContent = "Number of Attempts Remaining: " + numAttempts;
document.getElementById("guessedBank").textContent = "Guessed Letters: No letters guessed yet!";
document.getElementById("star").setAttribute("src","assets/images/question.jpg")
//these elements only have contingent visibility
document.getElementById("gameBox").style.visibility="hidden";
document.getElementById("message").style.visibility="hidden";
document.getElementById("warning").style.visibility = "hidden";
document.getElementById("movietrailer").style.visibility="hidden";

letterLayout = function(Arr){//sets layout for puzzle. \xa0 is used for spaces
	layout="?";
	for (var i=1;i<Arr.length;i++){
		if(Arr[i]===" "){
			layout = layout + "\xa0";
		} else {
			layout = layout + "?";
		}
	}
	return layout;
}

gameOps = function(word){//runs when new game starts; wordLetters and gameLetters are set and puzzle is shown
	wordLetters = word.split('');
	gameLetters.push(wordLetters[0].toLowerCase());
	for (var i = 1; i<wordLetters.length;i++){
		if(gameLetters.indexOf(wordLetters[i].toLowerCase())===-1){
			gameLetters.push(wordLetters[i].toLowerCase());
		}
	}
	document.getElementById("gameWord").textContent = letterLayout(wordLetters);
}

//game gets reset - button disappears when clicked; numAttempts get reset to 10; guessedBank gets reset; other formatting happens
function resetGame(){
	document.getElementById("startButton").style.visibility = "hidden";
	numAttempts = 10;
	document.getElementById("numAttempts").textContent = "Number of Attempts Remaining: " + numAttempts;
	guessedBank = [];
	document.getElementById("guessedBank").textContent = "Guessed Letters: No letters guessed yet!";
	randomWord = words[Math.floor(Math.random()*words.length+1)];
	gameLetters=[];
	gameOps(randomWord);
	document.getElementById("gameBox").style.visibility="visible";
	document.getElementById("message").style.visibility="hidden";
	document.getElementById("warning").style.visibility = "hidden";
	document.getElementById("win-loss-message").style.visibility = "hidden";
	document.getElementById("star").setAttribute("src","assets/images/question.jpg")
	document.getElementById("movietrailer").style.visibility="hidden";
	changePlayAudio("startgame");
	document.getElementById("movietrailer").style.height="0px";
}

//guessed bank presentation - depending on how the bank looks now, this will add guessed letters appropriately
guessConcat = function(letter){
	var currentBank = document.getElementById("guessedBank").textContent;
	if (currentBank!=="Guessed Letters: No letters guessed yet!"){
		currentBank = currentBank + ", " + letter;
		document.getElementById("guessedBank").textContent = currentBank;
	} else{
		document.getElementById("guessedBank").textContent = "Guessed Letters: " + letter;
	}
}

changePic=function(){//sets picture to appropriate picture
	var src="assets/images/"+randomWord+".jpg";
	document.getElementById("star").setAttribute("src",src)
}

changeVideo=function(){//sets appropriate trailer video for youtube iframe
	var src;
	switch (randomWord){
		case "Humphrey Bogart"://if randomWord is Humphrey Bogart change to Bogart trailer
			src = "https://www.youtube.com/embed/n-K49CUaeto";
			break;//stop checking cases
		case "Katharine Hepburn":
			src = "https://www.youtube.com/embed/F25nzu6hh0Q";
			break;
		case "Cary Grant":
			src = "https://www.youtube.com/embed/Fx0QuZJVTFE";
			break;
		case "James Stewart":
			src = "https://www.youtube.com/embed/Z5jvQwwHQNY";
			break;
		case "Marlon Brando":
			src = "https://www.youtube.com/embed/GOOI2Cnhgdk";
			break;
		case "Ingrid Bergman":
			src = "https://www.youtube.com/embed/BkL9l7qovsE";
			break;
		case "Charlie Chaplin":
			src = "https://www.youtube.com/embed/gZlzGd-4LCw";
			break;
		case "John Wayne":
			src = "https://www.youtube.com/embed/ii_7QnXPQxA";
			break;
		case "Kirk Douglas":
			src = "https://www.youtube.com/embed/hc0sJmASoa4";
			break;
		case "Orson Welles":
			src = "https://www.youtube.com/embed/8dxh3lwdOFw";
			break;
		case "Rita Hayworth":
			src = "https://www.youtube.com/embed/a4l2o1MEUyY";
			break;
		case "Vivien Leigh":
			src = "https://www.youtube.com/embed/0X94oZgJis4";
			break;
		case "Grace Kelly":
			src = "https://www.youtube.com/embed/m01YktiEZCw";
			break;
		case "Carole Lombard":
			src = "https://www.youtube.com/embed/ewAYnbPBYxo";
			break;
		case "William Holden":
			src = "https://www.youtube.com/embed/Gh2eEmgF2W0";
			break;
		case "Gene Kelly":
			src = "https://www.youtube.com/embed/5_EVHeNEIJY";
			break;
		case "Lee J Cobb":
			src = "https://www.youtube.com/embed/0jxVnlRdelU";
			break;
		case "Paul Newman":
			src = "https://www.youtube.com/embed/ofxtDrRVQY4";
			break;
		case "Burt Lancaster":
			src = "https://www.youtube.com/embed/6kSmxzvKKgA";
			break;
		case "Faye Dunaway":
			src = "https://www.youtube.com/embed/hZpm1zj9510";
			break;
		case "Jack Nicholson":
			src = "https://www.youtube.com/embed/OXrcDonY-B8";
			break;
		case "Irene Dunne":
			src = "https://www.youtube.com/embed/B0-euBr_vRU";
			break;
		case "Gloria Swanson":
			src = "https://www.youtube.com/embed/USv1hJTlbhg";
			break;
		case "Elizabeth Taylor":
			src = "https://www.youtube.com/embed/AzogcorjLOI";
			break;
		case "James Cagney":
			src = "https://www.youtube.com/embed/3bMtOABixrQ";
			break;
	}
	document.getElementById("movietrailer").style.visibility="visible";
	document.getElementById("movietrailer").setAttribute("src",src)
}

changePlayAudio=function(event){//plays different sound depending on event
	switch (event){
		case "win":
			audioElement.setAttribute("src", "assets/sounds/Win Fanfare.mp3");
			break;
		case "lose":
			audioElement.setAttribute("src", "assets/sounds/Loss.mp3");
			break;
		case "startgame":
			audioElement.setAttribute("src", "assets/sounds/Puzzle.mp3");
			break;
	}
	audioElement.play();
}

updateLayout = function(letter){//updates layout based on correctly guessed letter 
	var layout_temp=layout.split('');//takes in current layout and splits it to have each character in a different array

	for (var i = 0;i<wordLetters.length;i++){//checks guessed letter against letters in word and updates layout_temp to display the letter in the appropriate location
		if (letter.toUpperCase()===wordLetters[i]){
			layout_temp[i] = letter.toUpperCase();
		} else if (letter.toLowerCase()===wordLetters[i]){
			layout_temp[i] = letter.toLowerCase();
		}
	}
	layout=layout_temp.join('');//puts updated layout_temp back together and overwrites layout with it
	document.getElementById("gameWord").textContent	= layout;//updates gameWord element to show updated layout
	document.getElementById("message").style.visibility="hidden";//hides message box
	if(layout.indexOf("?")===-1){//if there are no more question marks, user has won game. the conditional will return TRUE
		//and this code block will run
		wins++;//increments wins
		document.getElementById("numWins").textContent = "Wins: " + wins;//updates display of wins
		document.getElementById("startButton").style.visibility = "visible";//shows button to start new game
		document.getElementById("message").style.visibility="visible";//message box will show and message stating that user has won will display
		document.getElementById("win-loss-message").style.visibility = "visible";
		document.getElementById("win-loss-message").textContent = "Congratulations! You win the game! Now watch the trailer below!";
		changePic();//will change to appropriate picture and will display
		changeVideo();//will change to appropriate trailer and will display
		changePlayAudio("win");//will play winning song
		document.getElementById("movietrailer").style.height="400px";//will set trailer screen to display mode
	}
}

//will interpret user key entry and perform action contingent on visibility of button 
//if user key entry is correct - increments win and button reappears
//if user key entry is incorrect - decrements number of attempts remaining
//if number of attempts remaining is 1 and user key is incorrect, increments loss
document.onkeyup = function(event){
	if(document.getElementById("startButton").style.visibility === "hidden"){//all operations halt if button is showing
		var userKey = String.fromCharCode(event.keyCode).toLowerCase();//convert to lower case and deal with case later
		if (letters.indexOf(userKey)>-1){//is userKey a letter
			if((gameLetters.indexOf(userKey)>-1||gameLetters.indexOf(userKey.toUpperCase())>-1)&&guessedBank.indexOf(userKey)===-1){
				//checking the following - is it a letter that is used in the game? has it already been guessed? 
				//both of these need to be true for any of the code in this block to execute
				document.getElementById("win-loss-message").style.visibility = "hidden";//will hide warning and win/loss message boxes
				document.getElementById("win-loss-message").textContent = " ";
				updateLayout(userKey.toLowerCase());//update gameBox text to show new letter guessed by user
				//if this was the last remaining letter, updateLayout will also display win
				guessedBank.push(userKey.toLowerCase());//adds new guessed letter to guessedBank array to keep track of guessed letters
				guessConcat(userKey.toLowerCase());//adds to guessed letters
				document.getElementById("warning").style.visibility = "hidden";
				document.getElementById("warning").textContent = " ";
			} else if((gameLetters.indexOf(userKey)===-1&&gameLetters.indexOf(userKey.toUpperCase())===-1)&&numAttempts>1&&guessedBank.indexOf(userKey)===-1){
				//checking the following - is it a letter that is used in the game? is numAttempts greater than 1? has it already been guessed?
				//for this block of code to run, the letter can not be in the words being guessed and it has to not already have been guessed
				//additionally there must be more gameplay after this guess left
				numAttempts--;//numAttempts decremented
				document.getElementById("numAttempts").textContent = "Number of Attempts Remaining: " + numAttempts;//numAttempts element updated
				guessedBank.push(userKey);//new letter is pushed to guessedBank
				guessConcat(userKey);//adds to guessed letters element
				document.getElementById("message").style.visibility="hidden";//hides warning message box
				document.getElementById("warning").style.visibility = "hidden";
				document.getElementById("warning").textContent = " ";
			} else if(guessedBank.indexOf(userKey)>-1){
				//checking the following - has it already been guessed?
				//for this block of code to run, the letter must have already been guessed
				document.getElementById("message").style.visibility="visible";//displays message stating that the letter has already been guessed
				document.getElementById("warning").style.visibility = "visible";
				document.getElementById("warning").textContent = "You already guessed that letter!";
			} else if((gameLetters.indexOf(userKey)===-1&&gameLetters.indexOf(userKey.toUpperCase())===-1)&&numAttempts===1){
				//checking the following - is the letter part of the letters in the game? are the number of attempts remaining equal to 1
				//the block of code only runs if the letter is not part of the game letters and if the number of attempts equals 1
				losses++;//player lost game at this point
				document.getElementById("gameWord").textContent = randomWord;//shows the game word with remaining letters filled in
				document.getElementById("numLosses").textContent = "Losses: " + losses;//updates display of losses
				numAttempts--;//decrements numAttempts to 0
				document.getElementById("message").style.visibility="visible";//shows message box to show loss
				document.getElementById("numAttempts").textContent = "Number of Attempts Remaining: " + numAttempts;//updates display to show 0 attempts remaining
				document.getElementById("win-loss-message").style.visibility = "visible";//shows win/loss message
				document.getElementById("win-loss-message").textContent = "You lost the game! Try again!";//displays loss message
				document.getElementById("startButton").style.visibility = "visible";//shows button to allow user to start new game
				changePic();//along with name displayed, shows trailer and picture
				changeVideo();
				changePlayAudio("lose");//plays lose song
				document.getElementById("movietrailer").style.height="400px";//expands video display to show trailer
			}
		} else {
			document.getElementById("message").style.visibility="visible";//make box for warning message visible
			document.getElementById("warning").style.visibility = "visible";//shows message to state that user entry is not a letter
			document.getElementById("warning").textContent = userKey + " is not a letter!";
		}
	}	
}

