// set the session storage for score

score = 0
$('#score').text(`${score}`)

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
    $('#guess-message').text(`${res}`)
    $('#score').text(`${score}`)
});


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
    }
}

timerFunction = setInterval(countdown, 1000);
