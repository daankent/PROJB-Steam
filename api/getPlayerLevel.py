import requests
import constants
from fastapi import HTTPException
import json


def getPlayerLevel(steamId):
    """
        Functie om het level van een speler op te halen
        Args:
            steamId:   steamId van de gebruiker waarvan je het level wil ophalen
        Returns:
                level - level van de speler
    """
    try:
        playerLevelData = requests.get(
            f"https://api.steampowered.com/IPlayerService/GetSteamLevel/v1/?key={constants.STEAM_API_KEY}&steamid={steamId}&format=json").json()
        playerLevel = playerLevelData["response"]["player_level"]
        print(playerLevel)
        return playerLevel
    except:
        return "x"
        # raise HTTPException(status_code=500, detail="Er ging iets fout bij het ophalen van het playerLevel")
