import requests
import constants
from fastapi import HTTPException


def getPlayerLastPlayedGames(steamId):
    """
        Functie om de laatst gespeelde games van een speler op te halen op basis van zijn/haar id
        Args:
            steamId:   steamId van de gebruiker waarvan je de laatst gespeelde games van wil ophalen
        Returns:
                list - lijst met de laatste gespeelde games gesorteerd op basis van meeste naar minste aantal gespeelde minuten
    """
    try:
        # laatst gespeelde game opvragen bij steam
        playerLastPlayedGamesData = requests.get(
            f"https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key={constants.STEAM_API_KEY}&steamid={steamId}&format=json").json()
        # als er geen game teruggegeven wordt de game "onbekend" aanmaken
        if not "games" in playerLastPlayedGamesData["response"]:
            return [{"appid": 0, "name": "onbekend"}]
        playerLastPlayedGames = playerLastPlayedGamesData["response"]["games"]
        return playerLastPlayedGames
    except:
        raise HTTPException(status_code=500, detail="Er ging iets fout bij het ophalen van de playerLastPlayedGames")
