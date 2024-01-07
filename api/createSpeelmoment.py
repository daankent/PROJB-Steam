import psycopg2
from fastapi import HTTPException
def create(creator, private, datum, tijd, game_name, game_id):
    try:
        connection = psycopg2.connect(
            dbname="steamhub",
            user="postgres",
            password="olifant29",
            host="localhost",
            port=5432
        )
        
        cursor = connection.cursor()
        
        cursor.execute('INSERT INTO speelmoment (creator, private, datum, tijd, game_name, game_id) values (%s, %s, %s, %s, %s, %s) returning id', (creator, private, datum, tijd, game_name, game_id))
        id = cursor.fetchone()[0]
        connection.commit()
        connection.close()
        return id
    except:
        print("Error")
        raise HTTPException(status_code=500, detail="Er ging iets fout bij het creëren van het speelmoment")
    
    
