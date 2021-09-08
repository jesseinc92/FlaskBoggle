from unittest import TestCase
from app import app, init_board
from flask import session
from boggle import Boggle


class FlaskTests(TestCase):

    # write tests for every view function / feature!
    def test_home(self):
        with app.test_client() as client:
            resp = client.get('/')
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn('<form id="guess-form">', html)

    def test_guess_check(self):
        with app.test_client() as client:
            resp = client.post('/check-guess', data={ 'guess': 'hi' })
            resp_json = resp.get_json()

        self.assertIs(resp_json, str())

    # remaining tests based on provided solution

    def test_invalid_word(self):
        """Test if word is in the dictionary"""

        self.client.get('/')
        response = self.client.get('/check-word?word=impossible')
        self.assertEqual(response.json['result'], 'not-on-board')

    def non_english_word(self):
        """Test if word is on the board"""

        self.client.get('/')
        response = self.client.get(
            '/check-word?word=fsjdakfkldsfjdslkfjdlksf')
        self.assertEqual(response.json['result'], 'not-word')

            
