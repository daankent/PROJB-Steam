# Dit bestand bevat de functie op een uitnodiging te maken voor een speelmoment en een functie op een uitnodiging te beantwoorden
import psycopg2
from fastapi import HTTPException
from DBURL import DB_URL

def create(speelmoment, player, name):
    """
        Functie om een uitnodiging aan te maken
        Args:
            speelmoment: het id van het speelmoment
            player: steamid van de gebruiker die uitgenodigd wordt
            name: naam van de speler die uitgenodigd wordt
        Returns:
                id: de id van de uitnodiging
    """
    try:
        # Verbinding maken met de database
        connection = psycopg2.connect(
            dbname="steamhub",
            user="postgres",
            password="Ditishetdatabasewachtwoord1!",
            host=DB_URL,
            port=5432
        )
        # een cursor creëren die opdrachten uit kan voeren in de database
        cursor = connection.cursor()
        
        # Insert statement uitvoeren om de uitnodiging aan de database toe te voegen
        cursor.execute('INSERT INTO uitnodiging (speelmoment, player, player_name) values (%s, %s,%s) returning id', (speelmoment, player, name))
        id = cursor.fetchone()[0]
        connection.commit()
        connection.close()
        return id
    except:
        # Error bericht weergeven
        print("Error")
        raise HTTPException(status_code=500, detail="Er ging iets fout bij het creëren van de uitnodiging")

def answer(uitnodiging, answer):
        """
        Functie om een uitnodiging te beantwoorden
        Args:
            uitnodging: het id van de uitnodiging
            answer: het antwoord dat gegeven wordt
    """
    # try:
    # Verbinding maken met de database
        connection = psycopg2.connect(
            dbname="steamhub",
            user="postgres",
            password="Ditishetdatabasewachtwoord1!",
            host=DB_URL,
            port=5432
        )
        cursor = connection.cursor()
        if answer == "true":
            a = True
        else: 
            a = False
        # Update statement om de uitnodiging in de database aan te passen met het juiste antwoord
        cursor.execute('UPDATE uitnodiging set answered=%s, accepted=%s where id=%s', (True, a, uitnodiging))
        connection.commit()
        connection.close()
        return 1
    # except:
    #     print("Error")
    #     raise HTTPException(status_code=500, detail="Er ging iets fout bij het beantwoorden van de uitnodiging")
    
