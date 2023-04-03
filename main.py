from flask import Flask, render_template,request
from data import queries
import math, utils
from dotenv import load_dotenv
from urllib import parse

load_dotenv()
app = Flask('codecool_series')

SHOWS_PER_PAGE = 15
EMPTY_PAGES = 2
@app.route('/')
def index():
    shows = queries.get_shows()
    return render_template('index.html', shows=shows)
@app.route('/shows')
@app.route('/shows/<int:page>')
@app.route('/shows/most-rated')
@app.route('/shows/most-rated/<int:page>')
def most_rated(page=1):
    number_of_shows = queries.get_show_count()[0]['show_count']
    page_count = math.ceil((number_of_shows / SHOWS_PER_PAGE)-EMPTY_PAGES)
    shown_pages = utils.check_pages(page, page_count)
    most_rated_shows = queries.get_most_rated(page)
    return render_template('most_rated.html', most_rated_shows=most_rated_shows, shown_pages=shown_pages,
                           page_count=page_count, page=page, url=request.url)
@app.route('/show/<int:id>')
def show_page(id):
    shows = queries.get_show(id)
    characters = queries.get_actors(id)
    three_character = utils.list_of_three_characters(characters)
    seasons = queries.get_season(id)
    trailer = shows[0]['trailer']
    if trailer == None:
        video_id = ''
    else:
        url_elem = parse.urlparse(trailer).query
        video_id = parse.parse_qs(url_elem).get('v')[0]
    return render_template('tv-shows.html', shows=shows, characters=three_character, seasons=seasons, video_id=video_id)
#optional
@app.route('/actors')
def one_handred_actors():
    get_100_actors = queries.get_100_actors()
    return render_template('actors.html', actors= get_100_actors)
@app.route('/api/actor-shows/<int:actor_id>')
def get_shows_by_actor_id(actor_id):
    return queries.get_show_id_by_actor(actor_id)
@app.route('/ratings')
def ratings():
    rating_shows = queries.rating_of_10_shows()
    return render_template('ratings.html', rating_shows=rating_shows)
@app.route('/ordered-shows')
def most_rated_shows_by_episode():
    sort = request.args.get('sort', default='desc', type=str)
    ordered_shows = queries.ordered_shows(sort)
    return render_template('ordered-shows.html', ordered_shows=ordered_shows, sort=sort)
@app.route('/design')
def design():
    return render_template('design.html')




def main():
    app.run(debug=True)


if __name__ == '__main__':
    main()
