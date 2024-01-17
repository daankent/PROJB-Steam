import psycopg2
from fastapi import HTTPException
def create(speelmoment, player, name):
    try:
        connection = psycopg2.connect(
            dbname="steamhub",
            user="postgres",
            password="olifant29",
            host="20.49.199.2",
            port=5432
        )
        
        cursor = connection.cursor()
        
        cursor.execute('INSERT INTO uitnodiging (speelmoment, player, player_name) values (%s, %s,%s) returning id', (speelmoment, player, name))
        id = cursor.fetchone()[0]
        connection.commit()
        connection.close()
        return id
    except:
        print("Error")
        raise HTTPException(status_code=500, detail="Er ging iets fout bij het creëren van de uitnodiging")

def answer(uitnodiging, answer):
    # try:
        connection = psycopg2.connect(
            dbname="steamhub",
            user="postgres",
            password="olifant29",
            host="20.49.199.2",
            port=5432
        )
        cursor = connection.cursor()
        if answer == "true":
            a = True
        else: 
            a = False
        print(a, uitnodiging)
        cursor.execute('UPDATE uitnodiging set answered=%s, accepted=%s where id=%s', (True, a, uitnodiging))
        connection.commit()
        connection.close()
        return 1
    # except:
    #     print("Error")
    #     raise HTTPException(status_code=500, detail="Er ging iets fout bij het beantwoorden van de uitnodiging")
    
