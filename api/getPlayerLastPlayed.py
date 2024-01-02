import requests
import constants
from fastapi import HTTPException
import json


def getPlayerLastPlayedGames(steamId):
    """
        Functie om de laatst gespeelde games van een speler op te halen op basis van zijn/haar id
        Args:
            steamId:   steamId van de gebruiker waarvan je de laatst gespeelde games van wil ophalen
        Returns:
                list - lijst met de laatste gespeelde games gesorteerd op basis van meeste naar minste aantal gespeelde minuten
    """
    try:
        playerLastPlayedGamesData = requests.get(
            f"https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key={constants.STEAM_API_KEY}&steamid={steamId}&format=json").json()
        if not "games" in playerLastPlayedGamesData["response"]:
            return [{"appid": 0, "name": "onbekend"}]
        playerLastPlayedGames = playerLastPlayedGamesData["response"]["games"]
        print(playerLastPlayedGames)
        return playerLastPlayedGames
    except:
        print("Error")
        raise HTTPException(status_code=500, detail="Er ging iets fout bij het ophalen van de playerLastPlayedGames")
