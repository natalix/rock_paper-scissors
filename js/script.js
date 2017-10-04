//Get modal element
var userNameModal = document.getElementById('js-userNameModal');
//Get modal button
var modalShow = document.getElementById('js-modalShow');
//Get close button
var modalCloseBtn = document.getElementById('js-modalCloseBtn');
//Get form to close modal
var formClose = document.getElementById('js-formClose');
//Get elements to hide
var hideHeader = document.getElementById('js-hideHeader');
//Get User name
var playerName = document.getElementById('js-playerName');
//Get user pick
var rockPick = document.getElementById('js-rockPick');
var paperPick = document.getElementById('js-paperPick');
var scissorsPick = document.getElementById('js-scissorsPick');
//Get elements to show or hide
var pickElements = document.getElementById('js-pickElements');
var gameData = document.getElementById('js-gameData');
var rockPlayerIcon = document.getElementById('js-rockPlayerIcon');
var paperPlayerIcon = document.getElementById('js-paperPlayerIcon');
var scissorsPlayerIcon = document.getElementById('js-scissorsPlayerIcon');
var rockPComputerIcon = document.getElementById('js-rockPComputerIcon');
var paperComputerIcon = document.getElementById('js-paperComputerIcon');
var scissorsComputerIcon = document.getElementById('js-scissorsComputerIcon');
//Get next rund button
var nextRund = document.getElementById('js-nextRund');
//Get scores to add to website
var playerScore = document.getElementById('js-playerScore');
var computerScore = document.getElementById('js-computerScore');
//Game initial values
var gameState = 'notStarted'; //notStarted //ended //started
var player = {
    name: '',
    score: '0'
};
var computer = {
    score: '0'
};

//Listen for open click
modalShow.addEventListener('click', openModal);

//Listen for close click & start game
modalCloseBtn.addEventListener('click', startGame);
formClose.addEventListener('submit', startGame);

//Listen for rock, paper, scissors
rockPick.addEventListener('click', function() { playerPick('rock') });
paperPick.addEventListener('click', function() { playerPick('paper') });
scissorsPick.addEventListener('click', function() { playerPick('scissors') });

//Listen for next rund click
nextRund.addEventListener('click', nextRundSets);

//Function to open modal
function openModal() {
    hideHeader.style.display = 'none'; 
    userNameModal.style.display = 'block';
}

//Function to close modal  and start game
function startGame(event) {
    player.name = document.getElementById('js-userName').value;
    if (player.name) {
        player.score = computer.score = 0;
        gameState = 'started';
        setGameElements();
        setGamePoints();
        
        playerName.innerHTML = player.name;
        userNameModal.style.display = 'none';
        event.preventDefault();
        hideHeader.style.display = 'block';
    }
}

//Function to display elements during each stage of game
function setGameElements() {
    switch(gameState) {
        case 'started':
            modalShow.style.display = 'none';
            pickElements.style.display = 'block';
            gameData.style.display = 'block';
        break;
        case 'ended':
            modalShow.style.display = 'block';
            pickElements.style.display = 'none';
            gameData.style.display = 'none';
            modalShow.innerText = 'Play again!';
            nextRund.innerHTML = 'Next Rund';
        case 'notStarted':
        default:
            modalShow.style.display = 'block';
            pickElements.style.display = 'none';
            gameData.style.display = 'none';
    }
}

//Function to display elements for next rund 'click'
function nextRundSets() {
    rockPick.style.display = 'inline';
    rockPlayerIcon.style.display = 'none';
    paperPlayerIcon.style.display = 'none';
    scissorsPlayerIcon.style.display = 'none';
    paperPick.style.display = 'inline';
    paperPick.style.opacity = '1';
    nextRund.style.display = 'none';
    scissorsPick.style.display = 'inline';
    rockPComputerIcon.style.display = 'none';
    paperComputerIcon.style.display = 'none';
    scissorsComputerIcon.style.display = 'none';
    rockPlayerIcon.style.animationPlayState = 'paused';
    paperPlayerIcon.style.animationPlayState = 'paused';
    scissorsPlayerIcon.style.animationPlayState = 'paused';
    rockPComputerIcon.style.animationPlayState = 'paused';
    paperComputerIcon.style.animationPlayState = 'paused';
    scissorsComputerIcon.style.animationPlayState = 'paused';
}

//Function to get the computer result
function getComputerPick() {
    var possiblePicks = ['rock', 'paper', 'scissors'];
    return possiblePicks[Math.floor(Math.random()*3)];
}

//Get the winner of the rund
function checkRoundWinner(playerPick, computerPick) {
    var winnerIs = 'player';

    if (playerPick === computerPick) {
        winnerIs = 'nobody';
    } else if (
        (computerPick === 'rock' & playerPick === 'scissors') || 
        (computerPick == 'scissors' &&  playerPick == 'paper') ||
        (computerPick == 'paper' &&  playerPick == 'rock')) {
            winnerIs = 'computer';
    }
    
    if (winnerIs === 'nobody') {
        rockPlayerIcon.style.animationPlayState = 'running';
        paperPlayerIcon.style.animationPlayState = 'running';
        scissorsPlayerIcon.style.animationPlayState = 'running';
        rockPComputerIcon.style.animationPlayState = 'running';
        paperComputerIcon.style.animationPlayState = 'running';
        scissorsComputerIcon.style.animationPlayState = 'running';
    } else if (winnerIs === 'player') {
        rockPlayerIcon.style.animationPlayState = 'running';
        paperPlayerIcon.style.animationPlayState = 'running';
        scissorsPlayerIcon.style.animationPlayState = 'running';
        player.score++;
    } else if (winnerIs === 'computer') {
        rockPComputerIcon.style.animationPlayState = 'running';
        paperComputerIcon.style.animationPlayState = 'running';
        scissorsComputerIcon.style.animationPlayState = 'running';
        computer.score++;
    }
}

//Set points on web
function setGamePoints() {
    playerScore.innerHTML = player.score;
    computerScore.innerHTML = computer.score;
}

//When the game is finished
function endOfGame() {
    if (player.score === 10) {
        nextRund.innerHTML = player.name + ' wins!';
        gameState = 'ended';
    } else if (computer.score === 10) {
        nextRund.innerHTML = 'Computer wins.';
        gameState = 'ended';
    }
    nextRund.addEventListener('click', setGameElements);
}

// The game
function playerPick(playerPick) {
    switch(playerPick) {
        case 'rock':
            rockPick.style.display = 'none';
            paperPick.style.opacity = '0';
            scissorsPick.style.display = 'none';
            rockPlayerIcon.style.display = 'inline';
        break;
        case 'paper':
            rockPick.style.display = 'none';
            paperPlayerIcon.style.display = 'inline';
            paperPick.style.opacity = '0';
            scissorsPick.style.display = 'none';
        break;
        case 'scissors':
            rockPick.style.display = 'none';
            scissorsPlayerIcon.style.display = 'inline';
            paperPick.style.opacity = '0';
            scissorsPick.style.display = 'none';
        break; 
        default:
            rockPick.style.display = 'inline';
            scissorsPick.style.display = 'inline';
            paperPick.style.display = 'inline';
    }
    
    var computerPick = getComputerPick();

    switch(computerPick) {
        case 'rock':
            rockPComputerIcon.style.display = 'inline';
        break;
        case 'paper':
            paperComputerIcon.style.display = 'inline';
        break;
        case 'scissors':
            scissorsComputerIcon.style.display = 'inline';
        break;    
    }
   
    if (computerPick === 'rock' || computerPick === 'paper' || computerPick === 'scissors') {
        paperPick.style.display = 'none';
        nextRund.style.display = 'inline';
    }

    checkRoundWinner(playerPick, computerPick);
    setGamePoints();
    endOfGame();
}
