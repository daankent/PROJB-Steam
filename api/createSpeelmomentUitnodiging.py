import psycopg2
from fastapi import HTTPException
def create(speelmoment, player):
    try:
        connection = psycopg2.connect(
            dbname="steamhub",
            user="postgres",
            password="olifant29",
            host="localhost",
            port=5432
        )
        
        cursor = connection.cursor()
        
        cursor.execute('INSERT INTO uitnodiging (speelmoment, player) values (%s, %s) returning id', (speelmoment, player))
        id = cursor.fetchone()[0]
        connection.commit()
        connection.close()
        return id
    except:
        print("Error")
        raise HTTPException(status_code=500, detail="Er ging iets fout bij het creëren van de uitnodiging")

def answer(uitnodiging, answer):
    try:
        connection = psycopg2.connect(
            dbname="steamhub",
            user="postgres",
            password="olifant29",
            host="localhost",
            port=5432
        )
        cursor = connection.cursor()
        
        cursor.execute('UPDATE uitnodiging set answered=True, accepted=%s where id=%s returning id', (answer, uitnodiging))
        id = cursor.fetchone()[0]
        
        connection.commit()
        connection.close()
        return id
    except:
        print("Error")
        raise HTTPException(status_code=500, detail="Er ging iets fout bij het beantwoorden van de uitnodiging")
    
