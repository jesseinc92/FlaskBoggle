// GET initial game stats from server

async function getGameStats() {

    // GET request for the stored game data
    response = await axios({
        method: 'get',
        url: '/game-stats',
    });

    return response;
}

async function begin() {
    
    response = await getGameStats();

    $('#high-score').text(response.data.high_score)
    $('#game-count').text(response.data.game_count)
}

// POST method for checking/updating high score

async function postGameStats(score) {

    // POST request to update game data
    response = await axios({
        method: 'post',
        url: '/game-stats',
        data: {
            high_score: score
        }
    });

    return response;
}

async function end() {

    // update game statistics
    response = await postGameStats(score);

    $('#high-score').text(response.data.high_score)
    $('#game-count').text(response.data.game_count)
}

begin();


// set and maintain a timer for the game
// that counts down from 60 to 0

time = 60;
$('#timer').text(time);

function countdown() {

    // decrement the time variable and update the DOM
    time--;
    $('#timer').text(time);

    if (time == 0) {

        // stop the countdown and remove submit ability
        clearInterval(timerFunction);
        $('#guess-form button').attr('disabled', true);

        // update stats in server
        end();
    }
}

timerFunction = setInterval(countdown, 1000);


// set the session storage for score

score = 0
$('#score').text(score)

// take the form value and check
// for word validity

async function boggleGuess(word) {
    response = await axios({
        method: 'post',
        url: '/check-guess',
        data: {
            guess: word
        }
    });

    return response.data.result
}


// return the length of the guess for score incrementing

function setScore(word) {
    scoreAdd = word.length
    return scoreAdd
}


$('#guess-form').on('submit', async function (e) {
    e.preventDefault()

    // send the guess to check word
    guess = $('#guess-input').val();
    res = await boggleGuess(guess)

    // clear the input field for a new guess
    $('#guess-input').val('')

    // if the response is 'ok' add the score
    if (res == 'ok') {
        score += setScore(guess)
    }

    // display the message for each guess
    $('#guess-message').text(res)
    $('#score').text(score)
});
