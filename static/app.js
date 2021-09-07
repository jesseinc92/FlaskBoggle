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


$('#guess-form').on('submit', async function (e) {
    e.preventDefault()

    // send the guess to check word
    guess = $('#guess-input').val();
    res = await boggleGuess(guess)

    // clear the input field for a new guess
    $('#guess-input').val('')

    // display the message for each guess
    $('#guess-message').text(`${res}`)
});