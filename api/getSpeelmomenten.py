import requests
import constants
from fastapi import HTTPException
import json
import psycopg2
import psycopg2.extras
from DBURL import DB_URL


def getPlayerSpeelmomenten(steamId):
    """
        Functie om de speelmomenten van een speler op te halen
        Args:
            steamId:   steamId van de gebruiker waarvan je de speelmomenten wil ophalen
        Returns:
                speelmomenten
    """
    try:
        # verbinding maken met de databsae
        connection = psycopg2.connect(
            dbname="steamhub",
            user="postgres",
            password="Ditishetdatabasewachtwoord1!",
            host=DB_URL,
            port=5432
        )
        
        dict_cursor = connection.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
        # select statement om alle uitnodigingen van de specifieke speler op te halen uit de database
        dict_cursor.execute("Select u.id as uid,s.id as sid, s.*, u.* from speelmoment as s inner join uitnodiging as u on s.id = u.speelmoment where u.player=%s", (steamId,))
        res = dict_cursor.fetchall()
        
        # de uitnodingen sorteren op basis van of deze geaccepteerd zijn of nog niet beantwoord zijn.
        uitnodigingen = []
        deelnames = []
        for i in res:
            d = dict(i)
            print(d)
            if d["accepted"]:
                print( 'a')
                deelnames.append(d)
                
            else: 
                if d["answered"]:
                    print("skip")
                else:
                    print( 'na')
                
                    uitnodigingen.append(d)
                
        
        return {"uitnodigingen": uitnodigingen, "deelnames": deelnames}
    except:
        print("Error")
        raise HTTPException(status_code=500, detail="Er ging iets fout bij het ophalen van de speelmomenten")


def getPublicSpeelmomenten():
    """
        Functie om alle publieke speelmomenten op te halen
        Returns:
                speelmomenten
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
        
        dict_cursor = connection.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
        # alls speelmomenten ophalen uit de database
        dict_cursor.execute("Select * from speelmoment where private=%s ", (False, ))
        res = dict_cursor.fetchall()
        return res
    except:
        print("Error")
        raise HTTPException(status_code=500, detail="Er ging iets fout bij het ophalen van de speelmomenten")
    
def getSingle(id):
    """
        Functie om een speelmoment op te halen
        Args:
            steamId:   id van het speelmoment waarvan je de info wil ophalen
        Returns:
                speelmoment
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
        
        dict_cursor = connection.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
        # het speelmoment ophalen uit de database
        dict_cursor.execute("select s.* from speelmoment as s  where s.id=%s", (id,))
        res = dict_cursor.fetchall()
        
        # de uitnodigingen die bij het speelmoment horen ophalen uit de database
        dict_cursor.execute("select u.* from uitnodiging as u  where u.speelmoment=%s", (id,))
        uitnodigingen = dict_cursor.fetchall()
                
        
        return {"speelmoment": res[0], "uitnodigingen": uitnodigingen}
    except:
        # error bericht weergeven
        raise HTTPException(status_code=500, detail="Er ging iets fout bij het ophalen van de speelmomenten")
    
    