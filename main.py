from flask import Flask, render_template, url_for, request
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





# -----------------------------------------------------------------------------------------------------
#ACTION GENRES + MODAL + FETCH
@app.route('/action-shows')
def action_show():
    return render_template('action_genres.html')

@app.route('/api/action/shows')
def get_action_show():
        return queries.get_action_titles()



# -----------------------------------------------------------------------------------------------------
#PINGWINY + MODAL + FETCH
@app.route('/pingwiny')
def pingwiny():
    return render_template('pingwiny-modal.html')

@app.route('/api/pingwiny/')
def api_pingwiny():
    season1_args = request.args.get('name') #argsem wyciągam query parameter z jsa o kluczu name
    if season1_args == 'FirstSeason':
        return queries.get_episodes_season(7823, 'Season 1')
    elif season1_args == 'SecondSeason':
        return queries.get_episodes_season(7823, 'Season 2')
    elif season1_args == 'ThirdSeason':
        return queries.get_episodes_season(7823, 'Season 3')

# -----------------------------------------------------------------------------------------------------
#HOUSE-MODAL + FETCH
@app.route('/house')
def characters_from_house():
    characters = queries.show_character_from_house(1399)
    return render_template('house.html', characters= characters)

@app.route('/api/house-show/<int:actor_id>')
def show_actors_from_house(actor_id):
    return queries.show_actors_from_house(actor_id)

# -----------------------------------------------------------------------------------------------------
#INPUT FROM TO + MODAL + FETCH
@app.route('/input/modal', methods=['GET'])
def get_input_modal():
    if request.method == 'GET':
        return render_template('task_with_input_modal.html')

@app.route('/api/from-to/')
def api_data():
    start = request.args.get('from') #argsem wyciągam query parameter z jsa o kluczu from
    end = request.args.get('to')
    return queries.get_shows_from_to(start,end)

# -----------------------------------------------------------------------------------------------------
#INPUT BEZ FETCHA
@app.route('/input', methods=['GET','POST'])
def input():
    if request.method == 'GET':
        return render_template('Task with input.html')
    if request.method == 'POST':
        date_from = request.form.get('date_from')
        date_to = request.form.get('date_to')
        shows_from_to = queries.get_shows_from_to(date_from,date_to)
        return render_template('Task with input.html', shows_from_to=shows_from_to)

# -----------------------------------------------------------------------------------------------------
#PINGWINY BEZ FETCHA
@app.route('/seasons', methods=['GET'])
def get_seasons():
    return render_template('Task with Seasons.html')

@app.route('/seasons', methods=['POST'])
def get_seasons_episodes():
    if request.form.get('Season') == 'Season1':
        season1 = queries.get_episodes_season(7823, 'Season 1')
        return render_template('Task with Season part 2.html', seasons=season1)
    elif request.form['Season'] == 'Season2':
        season2 = queries.get_episodes_season(7823, 'Season 2')
        return render_template('Task with Season part 2.html', seasons=season2)
    elif request.form['Season'] == 'Season3':
        season3 = queries.get_episodes_season(7823, 'Season 3')
        return render_template('Task with Season part 2.html', seasons=season3)

# -----------------------------------------------------------------------------------------------------

# @app.route('/seasons', methods=['GET'])
# def get_seasons():
#     return render_template('Task with Seasons.html')
# @app.route('/seasons/season1', methods=['POST'])
# def get_seasons_1():
#     print('season 1')
#     season1 = queries.get_episodes_season(7823, 'Season 1')
#     return render_template('Task with Season part 2.html', seasons=season1)
#
# @app.route('/seasons/season2', methods=['POST'])
# def get_seasons_2():
#     print('season 2')
#     season2 = queries.get_episodes_season(7823, 'Season 2')
#     return render_template('Task with Season part 2.html', seasons=season2)
#
# @app.route('/seasons/season3', methods=['POST'])
# def get_seasons_3():
#     print('season 3')
#     season3 = queries.get_episodes_season(7823, 'Season 3')
#     return render_template('Task with Season part 2.html', seasons=season3)
def main():
    app.run(debug=True)


if __name__ == '__main__':
    main()
