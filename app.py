from werkzeug.utils import redirect
from werkzeug.wrappers import response
from boggle import Boggle
from flask import Flask, request, session, render_template, jsonify

boggle_game = Boggle()

app = Flask(__name__)
app.config['SECRET_KEY'] = 'abcd1234'

board = boggle_game.make_board()

@app.route('/')
def init_board():
    # initialize game board data and html

    session['boggle_board'] = board

    return render_template('game-board.html')


@app.route('/check-guess', methods=['POST'])
def check_guess():
    # check that the user has guessed a valid word
    word = request.get_json().get('guess')
    response = boggle_game.check_valid_word(session['boggle_board'], word);

    return jsonify({'result': response})