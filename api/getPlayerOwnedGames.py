import requests
import constants
from fastapi import HTTPException
import json


# TODO: ook de naam van de game teruggeven en niet alleen de id
# Eerst in de json file kijken en als de game daar niet in staat deze ophalen via de api
def getPlayerOwnedGames(steamId):
    """
        Functie om alle games die een speler bezit op te halen
        Args:
            steamId:   steamId van de gebruiker waarvan je de bezitte games wil opvragen
        Returns:
                object - object met daarin game_count en de lijst games
    """
    try:
        playerOwnedGamesData = requests.get(
            f"https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key={constants.STEAM_API_KEY}&steamid={steamId}&include_appinfo=true&include_played_free_games=true")
        
        playerOwnedGames = playerOwnedGamesData.json()
        if "games" not in playerOwnedGames["response"]:
            return {"response": {"game_count": 0, "games": []}}
        return playerOwnedGames
    except:
        print("Error")
        raise HTTPException(status_code=500, detail="Er ging iets fout bij het ophalen van de playerOwnedGames")
