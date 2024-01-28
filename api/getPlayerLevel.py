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
        # level opvragen bij steam
        playerLevelData = requests.get(
            f"https://api.steampowered.com/IPlayerService/GetSteamLevel/v1/?key={constants.STEAM_API_KEY}&steamid={steamId}&format=json").json()
        playerLevel = playerLevelData["response"]["player_level"]
        # level teruggeven
        return playerLevel
    except:
        # als er geen level is "x" returnen
        return "x"
