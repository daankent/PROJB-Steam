# Dit bestand bevat de funcite die een speelmoment aan kan maken
import psycopg2
from fastapi import HTTPException
from DBURL import DB_URL
def create(creator, private, datum, starttijd, eindtijd, game_name, game_id, creator_name):
    """
        Functie om een speelmoment aan te maken
        Args:
            creator: steamid van de gebruiker die het speelmoment aanmaakt
            private: Boolean die aangeeft of het speelmoment prive is of niet
            datum: Datum waarop het speelmoment gepland is
            starttijd: de tijd dat het speelmoment start
            eindtijd: de tijd dat het speelmoment eindigd
            game_name: de naam van de game die tijdens het speelmoment gespeeld gaat worden
            game_id: de appid van de game zoals die op steam gevonden kan worden
            creator_name: de naam van de gebruiker die het speelmoment aanmaakt
        Returns:
                id: de id van het speelmoment
    """
    try:
        # verbinding maken met de database
        connection = psycopg2.connect(
            dbname="steamhub",
            user="postgres",
            password="Ditishetdatabasewachtwoord1!",
            host=DB_URL,
            port=5432
        )
        
        # een cursor creëren die opdrachten uit kan voeren in de database
        cursor = connection.cursor()
        # Insert statement uitvoeren op het speelmoment toe te voegen aan de tabel in de database
        cursor.execute('INSERT INTO speelmoment (creator, private, datum, starttijd, eindtijd, game_name, game_id, creator_name) values (%s, %s, %s, %s, %s, %s, %s, %s) returning id', (creator, private, datum, starttijd, eindtijd, game_name, game_id, creator_name))
        id = cursor.fetchone()[0]
        # Insert statement uitvoeren op de uitnodiging voor de creator automatisch aan te maken en accepteren.
        cursor.execute('INSERT INTO uitnodiging (speelmoment, answered, accepted, player, player_name) values (%s, %s, %s, %s, %s) returning id', (id, True, True, creator, creator_name))
        # Wijzigingen in de database opslaan
        connection.commit()
        connection.close()
        return id
    except:
        # als er een error is dit aangeven met een bericht
        print("Error")
        raise HTTPException(status_code=500, detail="Er ging iets fout bij het creëren van het speelmoment")
    
    
