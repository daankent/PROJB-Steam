import requests
import constants
from fastapi import HTTPException
import getPlayerInfo


def getPlayerFriendList(steamId):
    """
        Functie om alle vrienden van een steamgebruiker op te halen
        Args:
            steamId:   steamId van de gebruiker waarvan je de vrienden wil opvragen
        Returns:
                lijst - lijst met vrienden van de gebruiker
    """
    try:
        # vrienden ids opvragen
        playerFriendList = requests.get(
            f"https://api.steampowered.com/ISteamUser/GetFriendList/v0001/?key={constants.STEAM_API_KEY}&steamid={steamId}&relationship=friend").json()

        # ids van vrienden uit de dictionaries halen
        friendIds = [friend["steamid"] for friend in playerFriendList["friendslist"]["friends"]]
        # de gebruiker heeft geen vrienden
        if len(friendIds) <= 0:
            return []
        # de info van de vrienden ophalen
        friends = getPlayerInfo.getPlayerInfo(friendIds)

        # lijst met alle vrienden en hun info teruggeven
        return friends
    except:

        raise HTTPException(status_code=500, detail="Er ging iets fout bij het ophalen van de vriendenlijst")
