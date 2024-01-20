import psycopg2
from fastapi import HTTPException
from DBURL import DB_URL
def create(creator, private, datum, starttijd, eindtijd, game_name, game_id, creator_name):
    try:
        connection = psycopg2.connect(
            dbname="steamhub",
            user="postgres",
            password="Ditishetdatabasewachtwoord1!",
            host=DB_URL,
            port=5432
        )
        
        cursor = connection.cursor()
        print(creator, private, datum, starttijd, eindtijd, game_name, game_id)
        cursor.execute('INSERT INTO speelmoment (creator, private, datum, starttijd, eindtijd, game_name, game_id, creator_name) values (%s, %s, %s, %s, %s, %s, %s, %s) returning id', (creator, private, datum, starttijd, eindtijd, game_name, game_id, creator_name))
        id = cursor.fetchone()[0]
        
        cursor.execute('INSERT INTO uitnodiging (speelmoment, answered, accepted, player, player_name) values (%s, %s, %s, %s, %s) returning id', (id, True, True, creator, creator_name))
        print(id)
        connection.commit()
        connection.close()
        return id
    except:
        print("Error")
        raise HTTPException(status_code=500, detail="Er ging iets fout bij het creëren van het speelmoment")
    
    
