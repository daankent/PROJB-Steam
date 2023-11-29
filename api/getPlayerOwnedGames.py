import requests
import constants
from fastapi import HTTPException
import json


def getPlaterOwnedGames(steamId):
    """
        Functie om alle games die een speler bezit op te halen
        Args:
            steamId:   steamId van de gebruiker waarvan je de bezitte games wil opvragen
        Returns:
                object - object met daarin game_count en de lijst games
    """
    try:
        platerOwnedGamesData = requests.get(
            f"https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key={constants.STEAM_API_KEY}&steamid={steamId}")
        platerOwnedGames = platerOwnedGamesData.json()
        return platerOwnedGames
    except:
        print("Error")
        raise HTTPException(status_code=500, detail="Er ging iets fout bij het ophalen van de playerOwnedGames")
