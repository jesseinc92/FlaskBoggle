from itertools import count
from boggle import Boggle
from flask import Flask, request, session, render_template, jsonify

boggle_game = Boggle()

app = Flask(__name__)
app.config['SECRET_KEY'] = 'abcd1234'

board = boggle_game.make_board()

@app.route('/')
def init_board():
    """initialize game board data and html"""

    session['boggle_board'] = board

    return render_template('game-board.html')


@app.route('/check-guess', methods=['POST'])
def check_guess():
    """check that the user has guessed a valid word
        send back whether the word is valid, not on the board, or ok"""

    word = request.get_json().get('guess')
    response = boggle_game.check_valid_word(session['boggle_board'], word);

    return jsonify({'result': response})


@app.route('/game-stats', methods=['GET', 'POST'])
def get_statistics():
    """provides stored game statistics on GET and updates values on POST"""

    if request.method == 'POST':
        if session['high_score'] < request.get_json().get('high_score'):
            session['high_score'] = request.get_json().get('high_score')

        session['game_count'] = session.get('game_count', 0) + 1
        
        return jsonify({ 'high_score': session['high_score'], 'game_count': session['game_count'] })


    if request.method == 'GET':
        res1 = session.get('high_score', 0)
        res2 = session.get('game_count', 0)
        
        return jsonify({ 'high_score': res1, 'game_count': res2 })