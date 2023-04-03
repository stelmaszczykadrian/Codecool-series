from psycopg2 import sql

from data import data_manager


def get_shows():
    return data_manager.execute_select('SELECT id, title FROM shows;')


def get_most_rated(page):
    return data_manager.execute_select('''
        SELECT
        shows.id,
        title,
        overview,
        runtime,
        trailer,
        homepage,
        year,
        STRING_AGG(genres.name,', ') as "genres",
        ROUND(rating,1) as "rating"
        FROM shows
        INNER JOIN show_genres ON show_genres.show_id = shows.id
        INNER JOIN genres ON show_genres.genre_id = genres.id
        GROUP BY shows.id
        ORDER BY rating DESC
        LIMIT 15
        OFFSET (%(page)s-1)*15;
        ''', {'page': page})


def get_show(id):
    return data_manager.execute_select('''
    SELECT
    title,
    runtime,
    trailer,
    ROUND(rating,1) as "rating",
    STRING_AGG(genres.name,', ') as "genres",
    overview
    FROM shows
    INNER JOIN show_genres ON show_genres.show_id = shows.id
    INNER JOIN genres ON show_genres.genre_id = genres.id
    WHERE shows.id = %(id)s
    GROUP BY shows.id;
    ''', {'id': id})


def get_actors(id, limit=3):
    return data_manager.execute_select('''
    SELECT
    name
    FROM actors
    JOIN show_characters ON actors.id = show_characters.actor_id
    WHERE show_id = %(id)s
    LIMIT %(limit)s;
    ''', {'id': id, "limit":limit})

def get_season(id):
    return data_manager.execute_select('''
    SELECT
    seasons.season_number,
    seasons.title,
    seasons.overview
    FROM shows
    JOIN seasons ON seasons.show_id = shows.id
	WHERE shows.id = %(id)s
	ORDER BY seasons.season_number
    ''', {'id': id})
    

def get_100_actors(limit=100):
    return data_manager.execute_select('''
    SELECT
    id,
    name
    FROM actors
    ORDER BY birthday
    LIMIT %(limit)s;
    ''',{'limit':limit})


def get_show_id_by_actor(actor_id):
    return data_manager.execute_select(
        """
        SELECT show_id, s.title
        FROM show_characters
        JOIN shows s on show_characters.show_id = s.id
        WHERE %(actor_id)s = actor_id;
        """, {'actor_id':actor_id})


def get_show_count():
    return data_manager.execute_select(
        """
        SELECT COUNT(*) AS show_count 
        FROM shows;
        """
    )

def rating_of_10_shows():
    return data_manager.execute_select(
        '''
            SELECT
            shows.title,
            COUNT (actors.id) as count_actors,
            shows.rating - (SELECT AVG(rating) from shows) as substract
            from actors
            join show_characters ON show_characters.actor_id = actors.id
            join shows on shows.id = show_characters.show_id
            GROUP BY shows.title,shows.rating
            ORDER BY count_actors desc
            LIMIT 10;
        '''
    )



def ordered_shows(sort):
    sqlQuery = sql.SQL('''
            select 
            shows.title,
            ROUND(shows.rating) as rounded_rating,
            COUNT(episodes.episode_number) as counted_shows
            from shows
            join seasons on seasons.show_id = shows.id
            join episodes on episodes.season_id = seasons.id
            GROUP BY shows.title,rating
            ORDER BY counted_shows {}
            limit 10;
        '''.format((sort)))
    return data_manager.execute_select(sqlQuery)


